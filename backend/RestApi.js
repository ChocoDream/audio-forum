const sqlite3 = require("better-sqlite3");
const path = require("path");

const userRoutes = require("./api/UserRoutes");
const loginRoutes = require("./api/LoginRoutes");
const childToParentRoutes = require("./api/ChildToParentRoutes");

module.exports = class RestApi {
  constructor(
    expressApp,
    urlPrefix = "/api/",
    pathToDb = path.join(__dirname, "./database.db")
  ) {
    this.app = expressApp;
    this.db = sqlite3(pathToDb);
    this.prefix = urlPrefix;
    let tables = this.getAllTables();
    for (let table of tables) {
      if (table === "users") {
        //SKIP users in generic tables loop
        this.createDeleteRoute(table);
        continue;
      }
      this.createGetAllRoute(table);
      this.createGetRoute(table);
      this.createPostRoute(table);
      this.createPutRoute(table);
      this.createDeleteRoute(table);
    }

    loginRoutes(this.app, this.prefix, this.db);
    userRoutes(this.app, this.prefix, this.db);
    childToParentRoutes(this.app, this.prefix, this.db, "threads", "subForum");
    childToParentRoutes(this.app, this.prefix, this.db, "posts", "thread");
  }

  getAllTables() {
    let statement = this.db.prepare(`
    SELECT name
    FROM sqlite_master
    WHERE type = $type
  `);
    return statement.all({ type: "table" }).map((x) => x.name);
  }

  createGetAllRoute(table) {
    this.app.get(this.prefix + table, (req, res) => {
      let statement = this.db.prepare(`
      SELECT * FROM ${table}
    `);
      let result;
      try {
        result = statement.all().map((x) => ({ ...x, password: undefined }));
      } catch (e) {
        result = { error: e + "" };
      }

      if (result.length > 0) {
        res.status("200").json(result);
      } else if (result.hasOwnProperty("error")) res.status("400").json(result);
      else res.status("404").json(result);
    });
  }

  createGetRoute(table, idKey = "id") {
    this.app.get(this.prefix + table + "/:id", (req, res) => {
      let statement = this.db.prepare(`
      SELECT * FROM ${table}
      WHERE ${idKey} = $id
    `);
      let result;
      try {
        result = statement.all(req.params) || null;
      } catch (e) {
        result = { error: e + "" };
      }
      if (result) {
        delete result.password;
      }
      if (!result.hasOwnProperty("error")) res.status("200").json(result);
      else if (result.hasOwnProperty("error")) res.status("400").json(result);
      else res.status("404").json(result);
    });
  }

  createPostRoute(table) {
    this.app.post(this.prefix + table, (req, res) => {
      let b = req.body;
      if (table === "posts") {
        const body = req.body;
        if (typeof body.isModeratorPost != "boolean")
          return res.status("400").json({
            error:
              "Expected Boolean for isModeratorPost, recieved: " +
              body.isModeratorPost,
          });
        if (isNaN(body.userId))
          return res.status("400").json({
            error: "Expected Number for userId, recieved: " + body.userId,
          });
        if (isNaN(body.threadId))
          return res.status("400").json({
            error: "Expected Number for threadId, recieved: " + body.threadId,
          });
        b = {
          content: body.content,
          userId: Number(body.userId),
          timestamp: new Date().toISOString().slice(0, 19).replace("T", " "),
          threadId: Number(body.threadId),
          isModeratorPost: body.isModeratorPost ? 1 : 0,
        };
      } else if (table === "threads") {
        const body = req.body;
        if (isNaN(body.subForumId)) {
          return res.status("400").json({
            error:
              "Expected Number for subForumId, recieved: " + body.subForumId,
          });
        }
        b = {
          title: body.content,
          subForumId: Number(body.subForumId),
          isLocked: 0,
          isHot: 0,
        };
      }
      let statement = this.db.prepare(`
      INSERT INTO ${table} (${Object.keys(b)})
      VALUES (${Object.keys(b).map((x) => "$" + x)})
    `);
      // Run the statement
      try {
        res.status("201").json(statement.run(b));
      } catch (e) {
        res.status("400").json({ error: e + "" });
      }
    });
  }

  createPutRoute(table, idKey = "id") {
    this.app.put(this.prefix + table + "/:id", (req, res) => {
      let body = req.body;
      // Add the id to b
      if (req.body.subforum) {
        delete req.body.subforum;
      }
      body.id = req.params.id;
      let statement = this.db.prepare(`
      UPDATE ${table} 
      SET ${Object.keys(body).map((x) => x + " = $" + x)}
      WHERE ${idKey} = $id
    `);
      // Run the statement
      try {
        res.status("200").json(statement.run(body));
      } catch (e) {
        res.status("400").json({ error: e + "" });
      }
    });
  }

  createDeleteRoute(table, idKey = "id") {
    this.app.delete(this.prefix + table + "/:id", (req, res) => {
      let statement = this.db.prepare(`
        DELETE FROM ${table} WHERE ${idKey} = $id
      `);
      try {
        res.status("204").json(statement.run(req.params));
      } catch (e) {
        res.json({ error: e + "" });
      }
    });
  }
};

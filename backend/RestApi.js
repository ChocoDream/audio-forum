const sqlite3 = require("better-sqlite3");
const Encrypt = require("./logic/Encrypt");
const path = require("path");

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
        //SPECIFIES WHAT GENERIC ROUTES I WILL ALLOW

        continue;
      }
      this.createGetAllRoute(table);
      this.createGetRoute(table);
      this.createPostRoute(table);
      this.createPutRoute(table);
      this.createDeleteRoute(table);
    }

    this.addLoginRoutes();
    this.addUserRoutes();
    this.addChildToParentRoutes("thread", "subForum", "threads");
    this.addChildToParentRoutes("post", "thread", "posts");
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
      /*let result = statement.all();
      result.forEach(x => delete x.password)
      res.json(result);*/
      try {
        res.json(statement.all().map((x) => ({ ...x, password: undefined })));
      } catch (e) {
        res.json({ error: e + "" });
      }
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
      if (result.length > 0) res.status("200").json(result);
      else if (result.hasOwnProperty("error")) res.status("400").json(result);
      else res.status("404").json(result);
    });
  }

  createPostRoute(table) {
    this.app.post(this.prefix + table, (req, res) => {
      let b = req.body;
      // If the request body has a key password
      // then encrypt the password
      if (b.password) {
        b.password = Encrypt.multiEncrypt(b.password);
      }
      if ((table = "posts")) {
        const body = req.body;
        b = {
          content: body.content,
          userId: Number(body.userId),
          timestamp: new Date().toISOString().slice(0, 19).replace("T", " "),
          threadId: Number(body.threadId),
          isModeratorPost: Number(body.isModeratorPost),
        };
      }
      // Build the statement according to the keys
      // in the request body
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
      let b = req.body;
      // If the request body has a key password
      // then encrypt the password
      if (b.password) {
        b.password = Encrypt.multiEncrypt(b.password);
      }
      // Add the id to b
      b.id = req.params.id;
      // Build the statement according to the keys
      // in the request body
      let statement = this.db.prepare(`
      UPDATE ${table} 
      SET ${Object.keys(b).map((x) => x + " = $" + x)}
      WHERE ${idKey} = $id
    `);
      // Run the statement
      try {
        res.json(statement.run(b));
      } catch (e) {
        res.json({ error: e + "" });
      }
    });
  }

  createDeleteRoute(table, idKey = "id") {
    this.app.delete(this.prefix + table + "/:id", (req, res) => {
      let statement = this.db.prepare(`
        DELETE FROM ${table} WHERE ${idKey} = $id
      `);
      try {
        res.json(statement.run(req.params));
      } catch (e) {
        res.json({ error: e + "" });
      }
    });
  }

  // Add routes for login, check if logged in
  // and log out - /note: not "pure" REST-routes
  addLoginRoutes() {
    // POST = Login
    this.app.post(this.prefix + "login", (req, res) => {
      if (req.body.password) {
        req.body.password = Encrypt.multiEncrypt(req.body.password);
      }
      let statement = this.db.prepare(`
        SELECT * FROM users
        WHERE email = $email AND password = $password
      `);
      const statementRoles = this.db.prepare(`
      SELECT 
          userroles.name,
          userroles.subForumId
      FROM users
        INNER JOIN
          userrolesXusers,
          userroles
        ON users.id = userrolesXusers.userId
        AND userroles.id = userrolesXusers.userRoleId
      WHERE users.id = $id
      `);
      let user = statement.get(req.body) || null;
      if (user) {
        delete user.password;

        const stateRoles = statementRoles.all({ id: user.id });
        user = Object.assign(user, { roles: stateRoles.map((x) => x.name) });
        if (user.roles.includes("moderator")) {
          //IF USER CONTAIN MODERATOR
          user.moderatorSubForumId = stateRoles
            .filter((x) => x.name === "moderator")
            .map((x) => x.subForumId);

          //REMOVE DUPLICATES
          const roles = new Set(user.roles);
          user.roles = [...roles];
        }
        // store the logged in user in a session
        req.session.user = user;
        res.status("200").json(user);
      } /* else {
        res.status("404").json(user);
      } */
    });

    // GET - check if logged in and return user if so
    this.app.get(this.prefix + "login", (req, res) => {
      if (req.session.user) res.status("200").json(req.session.user);
      else res.status("404").json(null);
    });

    // DELETE - logged out a logged in user
    this.app.delete(this.prefix + "login", (req, res) => {
      delete req.session.user;
      res.json({ loggedOut: true });
    });
  }

  addUserRoutes() {
    this.app.get(this.prefix + "users", (req, res) => {
      const statement = this.db.prepare(`
        SELECT 
            users.id, 
            users.username, 
            users.email
        FROM users
      `);
      const statementRoles = this.db.prepare(`
        SELECT 
            userroles.name,
            userroles.subForumId
        FROM users
          INNER JOIN
            userrolesXusers,
            userroles
          ON users.id = userrolesXusers.userId
          AND userroles.id = userrolesXusers.userRoleId
        WHERE users.id = $id
      `);
      let result;
      try {
        let users = statement.all();
        users = users.map((user) => {
          const stateRoles = statementRoles.all({ id: user.id });
          Object.assign(user, { roles: stateRoles.map((x) => x.name) }) || null;
          if (user.roles.includes("moderator")) {
            //IF USER CONTAIN MODERATOR
            user.moderatorSubForumId = stateRoles
              .filter((x) => x.name === "moderator")
              .map((x) => x.subForumId);

            //REMOVE DUPLICATES
            const roles = new Set(user.roles);
            user.roles = [...roles];
          }
          return user;
        });
        result = users;
      } catch (e) {
        result = { error: e + "" };
      }
      if (result.length > 0) res.status("200").json(result);
      else if (result.hasOwnProperty("error")) res.status("400").json(result);
      else res.status("404").json(result);
    });

    this.app.get(this.prefix + "users/:id", (req, res) => {
      const statement = this.db.prepare(`
      SELECT 
          users.id, 
          users.username, 
          users.email
      FROM users
      WHERE users.id = $id
    `);
      const statementRoles = this.db.prepare(`
      SELECT 
          userroles.name,
          userroles.subForumId
      FROM users
        INNER JOIN
          userrolesXusers,
          userroles
        ON users.id = userrolesXusers.userId
        AND userroles.id = userrolesXusers.userRoleId
      WHERE users.id = $id
    `);
      let result;
      try {
        let stateRoles = statementRoles.all(req.params);
        result =
          Object.assign(statement.get(req.params), {
            roles: stateRoles.map((x) => x.name),
          }) || null;
        if (result.roles.includes("moderator")) {
          //IF USER CONTAIN MODERATOR
          result.moderatorSubForumId = stateRoles
            .filter((x) => x.name === "moderator")
            .map((x) => x.subForumId);

          //REMOVE DUPLICATES
          const roles = new Set(result.roles);
          result.roles = [...roles];
        }
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

    this.app.post(this.prefix + "users", (req, res) => {
      const body = req.body;
      if (body.password) {
        body.password = Encrypt.multiEncrypt(body.password);
      }
      let statement = this.db.prepare(`
      INSERT INTO users (${Object.keys(body)})
      VALUES (${Object.keys(body).map((x) => "$" + x)})
      `);
      let addRole = this.db.prepare(`
      INSERT INTO userrolesXusers (userRoleId, userId)
      VALUES (5, $userId)`);
      try {
        const state = statement.run(body);
        addRole.run({ userId: state.lastInsertRowid });
        res.status("201").json(state);
      } catch (e) {
        res.status("400").json({ error: e + "" });
      }
    });

    this.app.put(this.prefix + "users", (req, res) => {
      //UPDATE USER
    });
  }

  addChildToParentRoutes(
    child = "thread",
    parent = "subForum",
    table = "threads"
  ) {
    this.app.get(
      this.prefix + `${child}${parent.toLowerCase()}/:id`,
      (req, res) => {
        let statement = this.db.prepare(`
        SELECT * FROM ${table}
        WHERE ${parent + "Id"} = $id
      `);
        let result;
        try {
          result = statement.all(req.params) || null;
        } catch (e) {
          result = { error: e + "" };
        }
        if (result.length > 0) res.status("200").json(result);
        else if (result.hasOwnProperty("error")) res.status("400").json(result);
        else res.status("404").json(result);
      }
    );
  }
};

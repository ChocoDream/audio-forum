const Encrypt = require("../logic/Encrypt");

module.exports = function userRoutes(app, prefix, db) {
  app.get(prefix + "users", (req, res) => {
    const statement = db.prepare(`
        SELECT 
            users.id, 
            users.username, 
            users.email
        FROM users
      `);
    const statementRoles = db.prepare(`
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

  app.get(prefix + "users/:id", (req, res) => {
    const statement = db.prepare(`
      SELECT 
          users.id, 
          users.username, 
          users.email
      FROM users
      WHERE users.id = $id
    `);
    const statementRoles = db.prepare(`
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

  app.post(prefix + "users", (req, res) => {
    const body = req.body;
    //VALIDATION TODO
    const regex = new RegExp("^(?=.*d).{6,}$");

    if (regex.test(body.password) === false) {
      return res.status("400").json({
        error: "Password does not meet the requirements of a secure password",
      });
    }

    if (body.password) {
      body.password = Encrypt.multiEncrypt(body.password);
    }
    let statement = db.prepare(`
      INSERT INTO users (${Object.keys(body)})
      VALUES (${Object.keys(body).map((x) => "$" + x)})
      `);
    let addRole = db.prepare(`
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

  app.put(prefix + "users/:id", (req, res) => {
    const body = req.body;
    //UPDATE USER
    console.log(body);
  });
};

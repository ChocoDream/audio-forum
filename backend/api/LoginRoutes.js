const Encrypt = require("../logic/Encrypt");

module.exports = function loginRoutes(app, prefix, db) {
  app.post(prefix + "login", (req, res) => {
    if (req.body.password) {
      req.body.password = Encrypt.multiEncrypt(req.body.password);
    }
    let statement = db.prepare(`
        SELECT * FROM users
        WHERE email = $email AND password = $password
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
    } else {
      res.status("400").json(user);
    }
  });

  // GET - check if logged in and return user if so
  app.get(prefix + "login", (req, res) => {
    if (req.session.user) res.status("200").json(req.session.user);
    else res.status("400").json(null);
  });

  // DELETE - logged out a logged in user
  app.delete(prefix + "login", (req, res) => {
    delete req.session.user;
    res.status("204").json({ loggedOut: true });
  });
};

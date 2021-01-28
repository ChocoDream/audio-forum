const Encrypt = require("../logic/Encrypt");
const { getUsersFromArray } = require("../logic/utils");

module.exports = function loginRoutes(app, prefix, db) {
  app.post(prefix + "login", (req, res) => {
    if (req.body.password) {
      req.body.password = Encrypt.multiEncrypt(req.body.password);
    }
    let statement = db.prepare(`
        SELECT * FROM GetFullUserWithPassword
        WHERE email = $email AND password = $password
      `);
    let user = getUsersFromArray(statement.all(req.body))[0] || null;
    if (user) {
      delete user.password;

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

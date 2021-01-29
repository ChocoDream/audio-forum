const Encrypt = require("../logic/Encrypt");
const { getUsersFromArray } = require("../logic/utils");

module.exports = function userRoutes(app, prefix, db) {
  app.get(prefix + "users", (req, res) => {
    const statement = db.prepare("SELECT * FROM GetFullUser");
    let result;
    try {
      result = getUsersFromArray(statement.all());
    } catch (e) {
      result = { error: e + "" };
    }
    if (result.length > 0) res.status("200").json(result);
    else if (result.hasOwnProperty("error")) res.status("400").json(result);
    else res.status("404").json(result);
  });

  app.get(prefix + "users/:id", (req, res) => {
    const statement = db.prepare(`
      SELECT * FROM GetFullUser
      WHERE id = $id
    `);
    let result;
    try {
      result = getUsersFromArray(statement.all(req.params))[0];
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

    if (/[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/.test(body.email) === false) {
      return res.status("400").json({
        error: "Email does not meet the requirements of an email",
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
};

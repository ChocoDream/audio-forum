module.exports = function roleRoutes(app, prefix, db) {
  app.post(prefix + "roles", (req, res) => {
    const body = req.body;
    const statement = db.prepare(`
      INSERT INTO userrolesXusers (userRoleId, userId)
      VALUES ($userRoleId, $userId)
    `);
    console.log(body);

    /* try {
      res.status("200").json(statement.run(body));
    } catch (error) {
      res.status("400").json({ error: error + "" });
    } */
  });
  app.delete(prefix + "roles", (req, res) => {
    const id = req.params.id;

    const statement = db.prepare(`
      DELETE FROM userrolesXusers
      WHERE userId = $id
    `);
    console.log(id);
  });
};

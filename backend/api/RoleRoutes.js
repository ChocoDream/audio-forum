module.exports = function roleRoutes(app, prefix, db) {
  app.post(prefix + "roles/:id", (req, res) => {
    const body = req.body;

    if (Number(body.userRoleId) === 1) {
      return res
        .status("403")
        .json({ error: "Not allowed to set users as adminstrators" });
    }
    body.userId = req.params.id;
    console.log(body);
    /*    let statement = this.db.prepare(`
      INSERT INTO userrolesXusers (userRoleId, userId)
      VALUES ($userRoleId, $userId)`);
    // Run the statement
    try {
      res.status("200").json(statement.run(body));
    } catch (e) {
      res.status("400").json({ error: e + "" });
    } */
  });
};

module.exports = function roleRoutes(app, prefix, db) {
  app.post(prefix + "roles", (req, res) => {
    const body = req.body;
    const statement = db.prepare(`
      INSERT INTO userrolesXusers (userRoleId, userId, subforumId)
      VALUES (2, $userId, $subforumId)
    `);

    try {
      res.status("200").json(statement.run(body));
    } catch (error) {
      res.status("400").json({ error: error + "" });
    }
  });
  app.delete(prefix + "roles/:id", (req, res) => {
    const arguments = {
      userId: Number(req.params.id),
      subforumId: Number(req.headers["subforum-id"]),
    };

    const statement = db.prepare(`
      DELETE FROM userrolesXusers
      WHERE userId = $userId AND subforumId = $subforumId
    `);
    try {
      res.json(statement.run(arguments));
    } catch (error) {
      res.json({ error: error + "" });
    }
  });
};

module.exports = function childToParentRoutes(app, prefix, db, table, parent) {
  app.get(prefix + `${table}${parent}/:id`, (req, res) => {
    let statement = db.prepare(`
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
  });

  app.get(prefix + `count${table}/:id`, (req, res) => {
    let statement = db.prepare(`
      SELECT COUNT(*) items FROM ${table}
      WHERE ${table}.${parent + "Id"} = $id`);
    let result;
    try {
      result = statement.get(req.params) || null;
    } catch (e) {
      result = { error: e + "" };
    }

    if (!result.hasOwnProperty("error") || result.length === 0)
      res.status("200").json(result);
    else if (result.hasOwnProperty("error")) res.status("400").json(result);
    else res.status("404").json(result);
  });
};

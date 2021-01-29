module.exports = function (settings) {
  let { restPrefix } = settings;

  return function (req, res, next) {
    // Check if the url has the restPrefix
    if (req.url.indexOf(restPrefix) !== 0) {
      // The url start with the restPrefix so do nothing
      next();
      return;
    }

    // Check if we have a function in settings with the
    // same name as the table that we are querying
    let tableName = req.url.replace(restPrefix, "").split("/")[0];

    // If there isn't a method named the same as the table in our settings
    // or if there is a method and it returns false
    // then return 'Not allowed' as a response to the client
    if (
      typeof settings[tableName] !== "function" ||
      !settings[tableName](req.session.user || {}, req.method, req)
    ) {
      res.status(403);
      res.json({ error: "Not allowed" });
      return;
    }

    next();
  };
};

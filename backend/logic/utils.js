module.exports.getUsersFromArray = getUsersFromArray = (array) => {
  //thx stackoverflow
  const seen = new Map();
  return array
    .filter((entry) => {
      let previous;
      if (seen.has(entry.id)) {
        previous = seen.get(entry.id);
        previous.roles.push(entry.roles);
        if (entry.subforumId) {
          previous.subforumId.push(entry.subforumId);
        }

        return false;
      }

      if (!Array.isArray(entry.roles)) {
        entry.roles = [entry.roles];
        entry.subforumId = [];
      }

      seen.set(entry.id, entry);
      return true;
    })
    .map((user) => {
      const roles = new Set(user.roles);
      user.roles = [...roles];
      return user;
    });
};

module.exports.isModeratorOrAbove = isModeratorOrAbove = (user, req) => {
  return (
    user.roles.includes("adminstrator") ||
    (user.roles.includes("moderator") &&
      user.subforumId.includes(Number(req.body.subforum)))
  );
};

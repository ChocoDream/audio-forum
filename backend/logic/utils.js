module.exports.getUsersFromArray = getUsersFromArray = (array) => {
  //thx stackoverflow
  const seen = new Map();
  return array.filter((entry) => {
    let previous;
    if (seen.has(entry.id)) {
      previous = seen.get(entry.id);
      previous.role.push(entry.role);
      if (entry.subforumId) {
        previous.subforumId.push(entry.subforumId);
      }

      return false;
    }

    if (!Array.isArray(entry.role)) {
      entry.role = [entry.role];
      entry.subforumId = [];
    }

    seen.set(entry.id, entry);
    return true;
  });
};

module.exports.isModeratorOrAbove = isModeratorOrAbove = (user, req) => {
  return (
    user.roles.includes("adminstrator") ||
    (user.roles.includes("moderator") &&
      user.moderatorSubForumId.includes(Number(req.body.subforum)))
  );
};

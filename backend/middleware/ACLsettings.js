const isModeratorOrAbove = (user, req) => {
  return (
    user.roles.includes("adminstrator") ||
    (user.roles.includes("moderator") &&
      user.moderatorSubForumId.includes(Number(req.body.subforum)))
  );
};

module.exports = {
  /* 
    Settings for acl:
    Where does our rest api live -> restPrefix
    + 1 function per table that can return true (allowed route)
      or false (not allowed route)
  */
  restPrefix: "/api/",
  posts(user, method, req) {
    if (
      method === "POST" &&
      req.body.isModeratorPost == 0 &&
      user.roles.includes("user")
    ) {
      return true;
    } else if (
      method === "POST" &&
      req.body.isModeratorPost == 1 &&
      isModeratorOrAbove(user, req)
    ) {
      return true;
    }

    if (method === "GET") {
      return true;
    }

    if (method === "DELETE" && isModeratorOrAbove(user, req)) {
      return true;
    }
    return false;
  },
  subforums(user, method, req) {
    if (method === "GET") {
      return true;
    }

    return false;
  },
  threads(user, method, req) {
    if (method === "POST" && user.roles.includes("user")) {
      return true;
    }

    if (method === "GET") {
      return true;
    }

    if (method === "PUT" && isModeratorOrAbove(user, req)) {
      return true;
    }

    if (method === "DELETE" && isModeratorOrAbove(user, req)) {
      return true;
    }
    return false;
  },
  users(user, method, req) {
    if (method === "POST") {
      return true;
    }

    if (method === "GET") {
      return true;
    }
    // Allow admins to delete users
    if (method === "DELETE" && user.roles.includes("adminstrator")) {
      return true;
    }
    
    return false;
  },
  roles(user, method, req) {
    if (method === "POST" && user.roles.includes("adminstrator")) {
      return true;
    }

    if (method === "DELETE" && user.roles.includes("adminstrator")) {
      return true;
    }
    return false;
  },
  login() {
    // Everyone should always be allowd to try to login and to logout
    return true;
  },
  threadssubforum(user, method, req) {
    if (method === "GET") {
      return true;
    }
    return false;
  },
  poststhread(user, method, req) {
    if (method === "GET") {
      return true;
    }

    return false;
  },
};

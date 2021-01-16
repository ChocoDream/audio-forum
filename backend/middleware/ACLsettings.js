module.exports = {
  /* 
    Settings for acl:
    Where does our rest api live -> restPrefix
    + 1 function per table that can return true (allowed route)
      or false (not allowed route)
  */
  restPrefix: "/api/",
  posts() {
    // Let everyone trash the product table
    return true;
  },
  subforums() {
    return true;
  },
  threads() {
    return true;
  },
  users(user, method, req) {
    if (method === "POST") {
      return true;
    }

    if (method === "GET") {
      return true;
    }
    // Allow admins to change info about a user
    if (method === "PUT" && user.roles.includes("adminstrator")) {
      return true;
    }
    // Allow a user to change info about him/herself
    // (the split pop thing is how we get the id from the url
    // since we do not have req.params available in middleware)
    // Allow admins to delete users
    if (method === "DELETE" && user.roles.includes("adminstrator")) {
      return true;
    }
    return false; // otherwise do not allow the request
  },
  login() {
    // Everyone should always be allowd to try to login and to logout
    return true;
  },
  threadssubforum() {
    return true;
  },
  poststhread(user, method, req) {
    return true;
  },
};

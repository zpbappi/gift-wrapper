var git = require("gift"),
  util = require("./util.js"),
  repo = require("./repo.js");

var methods = [
  { name: "init", async: true, handlesError: true, transformer: repo.wrap },
  { name: "clone", async: true, handlesError: true, transformer: repo.wrap },
]

var Git = function(repoPath){
  return repo.wrap(git(repoPath));
};

util.wrap(Git, git, methods);

module.exports = Git;

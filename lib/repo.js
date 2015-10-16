var util = require("./util.js"),
  commit = require("./commit.js"),
  tree = require("./tree.js"),
  tag = require("./tag.js");

var publicProperties = ["path"],
  methods = [
    { name: 'commits', handlesError: true, transformer: function(commits){ return commits.map(commit.wrap); } },
    { name: 'current_commit', handlesError: true, transformer: commit.wrap },
    { name: 'tree', async: false, transformer: tree.wrap },
    { name: 'diff', handlesError: true, transformer: null },
    { name: 'identity', handlesError: true, transformer: null },
    { name: 'identify', handlesError: true, transformer: null },
    { name: 'remotes', handlesError: true, transformer: null },
    { name: 'remote_list', handlesError: false, transformer: null },
    { name: 'remote_add', handlesError: false, transformer: null },
    { name: 'remote_remove', handlesError: false, transformer: null },
    { name: 'remote_add_url', handlesError: false, transformer: null },
    { name: 'remote_set_url', handlesError: false, transformer: null },
    { name: 'remote_delete_url', handlesError: false, transformer: null },
    { name: 'remote_fetch', handlesError: false, transformer: null },
    { name: 'remote_push', handlesError: false, transformer: null },
    { name: 'status', handlesError: true, transformer: null },
    { name: 'config', handlesError: true, transformer: null },
    { name: 'create_branch', handlesError: false, transformer: null }, // ***
    { name: 'delete_branch', handlesError: false, transformer: null }, // ****
    { name: 'tags', handlesError: false, transformer: function(tags){ return tags.map(tag.wrap); } },
    { name: 'create_tag', handlesError: false, transformer: null },
    { name: 'delete_tag', handlesError: false, transformer: null },
    { name: 'branches', handlesError: true, transformer: null },
    { name: 'create_branch', handlesError: false, transformer: null},
    { name: 'delete_branch', handlesError: false, transformer: null},
    { name: 'branch', handlesError: true, transformer: null },
    { name: 'commit', handlesError: false, transformer: null },
    { name: 'add', handlesError: false, transformer: null },
    { name: 'remove', handlesError: false, transformer: null },
    { name: 'checkout', handlesError: false, transformer: null },
    { name: 'checkoutFile', handlesError: false, transformer: null },
    { name: 'sync', handlesError: false, transformer: null },
    { name: 'reset', handlesError: false, transformer: null },
    { name: 'ls_files', handlesError: true, transformer: null },
    { name: 'merge', handlesError: false, transformer: null },
    { name: 'clean', handlesError: false, transformer: null },
    { name: 'revert', handlesError: false, transformer: null },
    { name: 'pull', handlesError: false, transformer: null }
  ];

var Repo = function(_repo){
  this.repo = _repo;
  util.wrap(this, _repo, methods, publicProperties);
};

function wrapRepo(giftRepo){
  return new Repo(giftRepo);
};

module.exports = {
  wrap: wrapRepo
};

var util = require("./util.js"),
  commit = require("./commit.js");

var methods = [
  { name: 'message', handlesError: true },
  { name: 'tagger', handlesError: true },
  { name: 'tag_date', handlesError: true}
];

var props = ["name"];


var Tag = function(_tag){
  this.tag = _tag;
  util.wrap(this, _tag, methods, props);
  this.commit = commit.wrap(_tag.commit);
};

function wrapTag(_tag){
  return new Tag(_tag);
};

module.exports = {
  wrap: wrapTag
};

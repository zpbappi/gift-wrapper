var util = require("./util.js"),
  blob = require("./blob.js"),
  submodule = require("./submodule.js");

function decideChild(child){
  if(child == null)
    return null;
  if(typeof child.trees === "function")
    return wrapTree(child);
  if(typeof child.dataStream === "function")
    return blob.wrap(child);

  return submodule.wrap(child);
};

var methods = [
  { name: 'contents', handlesError: true, transformer: function(children){ if(children) return children.map(decideChild);} },
  { name: 'blobs', handlesError: true, transformer: function(blobs){if(blobs)return blobls.map(blob.wrap);} },
  { name: 'trees', handlesError: true, transformer: function(trees){if(trees)return trees.map(wrapTree);} },
  { name: 'find', handlesError: true, transformer: decideChild }
];

var Tree = function(_tree){
  this.tree = _tree;
  util.wrap(this, _tree, methods, ["id"]);
};

function wrapTree(_tree){
  return new Tree(_tree);
};

module.exports = {
  wrap: wrapTree
};

var Tree = function(_tree){
  this.tree = _tree;
};

function wrapTree(_tree){
  return new Tree(_tree);
};

module.exports = {
  wrap: wrapTree
};

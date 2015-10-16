var Tag = function(_tag){
  this.tag = _tag;
};

function wrapTag(_tag){
  return new Tag(_tag);
};

module.exports = {
  wrap: wrapTag
};

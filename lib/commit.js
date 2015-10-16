var Commit = function(_commit){
  this.commit = _commit;
};

function wrapCommit(_commit){
  return new Commit(_commit);
};

module.exports = {
  wrap: wrapCommit
};

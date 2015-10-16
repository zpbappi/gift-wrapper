var util = require("./util.js");

var publicProps = ["id", "mode"];
var methods = [
  { name: 'data', handlesError: true },
  { name: 'dataStream', handlesError: false }
];

var Blob = function(_blob){
  this.blob = _blob;
  util.wrap(this, _blob, methods, publicProps);
};

function wrapBlob(_blob){
  return new Blob(_blob);
}

module.exports.wrap = wrapBlob;


exports.write = function(message) {
  var d = new Date().toISOString();
  console.log(d.replace("T"," ").substring(0, d.length - 5) + " | " + message);
};
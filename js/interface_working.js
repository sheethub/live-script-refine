var _, LiveScript, stripHtml, buildConsoler, consoler, remover, editor, delay, jstext, updatePreview, outData, inData;
_ = require("prelude-ls");
LiveScript = require('LiveScript');
stripHtml = function(string){
  var tmp;
  tmp = document.createElement("DIV");
  tmp.innerHTML = string;
  return tmp.textContent || tmp.innerText || "";
};
buildConsoler = function(){
  var temp, func;
  temp = null;
  return func = function(text){
    if (temp !== text) {
      console.log(text);
      return temp = text;
    }
  };
};
consoler = buildConsoler();
remover = function(list){
  var func;
  return func = function(string){
    var r;
    if (_.isType('Array', list)) {
      r = new RegExp(_.join("|")(
      list), "g");
    } else {
      r = new RegExp(list, "g");
    }
    return string.replace(r, "");
  };
};
editor = CodeMirror.fromTextArea(document.getElementById("codeeditor", {
  "lineNumbers": true,
  "mode": "livescript"
}));
editor.setOption("theme", "monokai");
delay = null;
jstext = null;
editor.on("change", function(){
  clearTimeout(delay);
  return delay = setTimeout(updatePreview, 300);
});
updatePreview = function(){
  var e;
  try {
    jstext = LiveScript.compile(editor.getValue(), {
      header: false,
      bare: true
    });
    eval(
    jstext);
    return d3.selectAll(".alertContainer").selectAll("div").remove();
  } catch (e$) {
    e = e$;
    d3.selectAll(".alert-danger").remove();
    return d3.selectAll(".alertContainer").append("div").attr({
      "class": "alert alert-danger"
    }).text(e.message);
  }
};
outData = null;
inData = null;
d3.text("./data/新北市政府新聞稿.csv", function(err, data){
  var buildTable, inTable, outTable;
  inData = function(){
    return d3.csv.parse(
    data);
  };
  buildTable = function(place){
    var makeTable;
    return makeTable = function(data){
      var table, cols, sampledata, format;
      d3.selectAll(place + " table").remove();
      table = d3.selectAll(place).append("table").attr({
        "class": "table table-bordered table-hover"
      });
      cols = _.Obj.keys(
      data[0]);
      sampledata = _.take(5)(
      data);
      format = d3.format("0,000");
      table.append("thead").append("tr").selectAll("th").data(cols).enter().append("th").text(function(it){
        return it;
      }).attr({
        "class": "text-center"
      });
      return table.append("tbody").selectAll("tr").data(sampledata).enter().append("tr").selectAll("td").data(function(it){
        return _.Obj.values(
        it);
      }).enter().append("td").text(function(it){
        if (_.isType('Number', it)) {
          return format(it);
        } else {
          return it;
        }
      }).attr({
        "class": function(it){
          if (_.isType('Number', it)) {
            return "numberCell text-right";
          }
        }
      });
    };
  };
  inTable = buildTable(".intableholder");
  outTable = buildTable(".outtableholder");
  inTable(
  inData());
  return outData = function(it){
    return outTable(
    it);
  };
});
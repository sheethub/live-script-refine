var _, LiveScript, buildConsoler, consoler, editor, delay, jstext, updatePreview, outData, inData, buildTable, inTable, outTable, parsedSheetHub, getPageUrl, initPage;
_ = require("prelude-ls");
LiveScript = require('LiveScript');
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
editor = CodeMirror.fromTextArea(document.getElementById("codeeditor", {
  "lineNumbers": true,
  "mode": "livescript"
}));
editor.setOption("theme", "monokai");
delay = null;
jstext = null;
editor.on("change", function(){
  clearTimeout(delay);
  return delay = setTimeout(updatePreview, 500);
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
    sampledata = data;
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
outData = function(it){
  return outTable(
  it);
};
parsedSheetHub = function(data){
  var cols;
  cols = _.map(function(it){
    return it.name;
  })(
  data.sheet.columns);
  return _.map(function(row){
    return _.listsToObj(cols, row);
  })(
  data.data);
};
getPageUrl = function(){
  return _.join("?")(
  _.drop(1)(
  document.location.href.split("?"))) + "?format=json&offset=0&limit=50";
};
initPage = function(){
  return d3.json(getPageUrl(), function(err, data){
    var parsedData;
    parsedData = parsedSheetHub(
    data);
    inData = function(){
      return JSON.parse(
      JSON.stringify(
      parsedData));
    };
    console.log(
    inData);
    return inTable(
    inData());
  });
};
if (document.location.href.indexOf("?") < 0) {
  document.location.href += "?https://sheethub.com/data.gov.tw/臺南市托育機構";
}
initPage();
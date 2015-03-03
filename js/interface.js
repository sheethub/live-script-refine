var _;
_ = require("prelude-ls");
hljs.initHighlightingOnLoad();
d3.selectAll(".codeholder").text('"this is " |> _.map ( -> + 1) |> console.log ');
d3.csv("./data/sample.csv", function(err, data){
  var table, cols, sampledata;
  table = d3.selectAll(".tableholder").append("table").attr({
    "class": "table table-bordered table-striped "
  });
  cols = _.Obj.keys(
  data[0]);
  sampledata = _.take(5)(
  data);
  table.append("thead").append("tr").selectAll("th").data(cols).enter().append("th").text(function(it){
    return it;
  });
  return table.append("tbody").selectAll("tr").data(sampledata).enter().append("tr").selectAll("td").data(function(it){
    return _.Obj.values(
    it);
  }).enter().append("td").text(function(it){
    return it;
  });
});
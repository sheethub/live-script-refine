var htmlCleaner, data, id, byRow;
htmlCleaner = function(it){
  return function(it){
    return it.trim();
  }(
  remover([" ", " ", " "])(
  stripHtml(
  it)));
};
outData(
_.Obj.each(function(it){
  return it.Content = htmlCleaner(
  it.Content);
})(
inData()));
data = inData();
console.log(
_.unique(
_.map(function(it){
  return it["地區"];
})(
data)));
outData(
data);
data = inData();
console.log(
data["0"]["Content"]);
htmlCleaner = function(it){
  return function(it){
    return it.trim();
  }(
  remover([" ", " ", " "])(
  stripHtml(
  it)));
};
id = 0;
byRow = function(it){
  it["Content"] = htmlCleaner(
  it["Content"]);
  it["cb_ContactData"] = htmlCleaner(
  it["cb_ContactData"]);
  it["cb_MetaDataCategoryIndex"] = htmlCleaner(
  it["cb_MetaDataCategoryIndex"]);
  return it["cb_RefData"] = htmlCleaner(
  it["cb_RefData"]);
};
outData(
_.each(byRow)(
data));
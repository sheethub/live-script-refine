var _, editor;
_ = require("prelude-ls");
editor = CodeMirror.fromTextArea(document.getElementById("codeeditor", {
  "mode": "livescript"
}));
editor.setOption("theme", "monokai");
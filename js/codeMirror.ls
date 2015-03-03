_ = require "prelude-ls"

editor = CodeMirror.fromTextArea document.getElementById "codeeditor", {
	"mode": "livescript"
}
editor.setOption "theme", "monokai"
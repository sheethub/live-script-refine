_ = require "prelude-ls"
require! ["LiveScript"]


###TODO each time that it evalute, start from scratch

## html text
stripHtml = (string)->
	tmp = document.createElement "DIV"
	tmp.innerHTML = string
	tmp.textContent or tmp.innerText or ""

buildConsoler = ->
	temp = null
	func = (text)->
		if temp is not text 
			console.log text
			temp := text
consoler = buildConsoler!

remover = (list)->
	func = (string)->
		if (_.is-type 'Array', list)
			r = new RegExp (list |> _.join "|"), "g"
		else
			r = new RegExp (list), "g"
		string.replace(r, "")
# ## 'd-ew%fr#w' |> remover ['#', '-', '%'] |> console.log ##dewfrw
# ## 'd-ew%fr#w' |> remover '#' |> console.log ##d-ew%frw



### editor
editor = CodeMirror.fromTextArea document.getElementById "codeeditor", {
	"lineNumbers": true
	"mode": "livescript"
}
editor.setOption "theme", "monokai"



delay = null
jstext = null

editor.on "change", ->
	clearTimeout delay
	delay := setTimeout updatePreview, 300

updatePreview = ->
	try
		jstext := editor.getValue! |> LiveScript.compile _, {-header, +bare}
		jstext |> eval

		d3.selectAll ".alertContainer" 
			.selectAll "div"
			.remove!
			
	catch e
		d3.selectAll ".alert-danger"
			.remove!

		d3.selectAll ".alertContainer" 
			.append "div"
			.attr {
				"class": "alert alert-danger"
			}
			.text e.message
			
	# setTimeout updatePreview, 10000

outData = null
inData = null

getPageUrl = ->
	"https://sheethub.com/" +  (document.URL.split "?" |> _.drop 1 |> _.join "?") + "&format=json&limit=50"

err, data <- d3.json getPageUrl!

cols = data.sheet.columns |> _.map (-> it.name)
inData := ->
	data.data |> _.map ((row)-> _.lists-to-obj cols, row)

buildTable = (place)->
	makeTable = (data)->
		d3.selectAll (place + " table")
			.remove!

		table = d3.selectAll place
			.append "table"
			.attr {
				"class": "table table-bordered table-hover"
					 # table-striped
			}

		cols = data[0] |> _.Obj.keys
		sampledata = data
		### data |> _.take 50 |> console.log 
		### sampledata |> console.log

		format = d3.format("0,000")


		table
			.append "thead"
			.append "tr"
			.selectAll "th"
			.data cols
			.enter!
			.append "th"
			.text -> it
			.attr {
				"class": "text-center"
			}

		table
			.append "tbody"
			.selectAll "tr"
			.data sampledata
			.enter!
			.append "tr"
			.selectAll "td"
			.data -> it |> _.Obj.values
			.enter!
			.append "td"
			.text -> if _.is-type 'Number', it then format it else it
			.attr {
				"class": -> if _.is-type 'Number', it then "numberCell text-right"
			}

inTable = buildTable ".intableholder"
outTable = buildTable ".outtableholder"

inData! |> inTable

outData := -> it |> outTable

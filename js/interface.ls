_ = require "prelude-ls"

hljs.initHighlightingOnLoad!

d3.selectAll ".codeholder"
	.text '"this is " |> _.map ( -> + 1) |> console.log '


err, data <- d3.csv "./data/sample.csv"

table = d3.selectAll ".tableholder"
	.append "table"
	.attr {
		"class": "table table-bordered table-striped "
	}

cols = data[0] |> _.Obj.keys
sampledata = data |> _.take 5
### data |> _.take 50 |> console.log 

table
	.append "thead"
	.append "tr"
	.selectAll "th"
	.data cols
	.enter!
	.append "th"
	.text -> it

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
	.text -> it


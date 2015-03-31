

htmlCleaner = ->
	it |> stripHtml |> remover [" ", " ", " "] |> (-> it.trim!)


inData! |> _.Obj.each (-> it.Content = it.Content |> htmlCleaner ) |> outData





data = inData!
data |> _.map (-> it["地區"] ) |> _.unique |> console.log
data |> outData



data = inData! 

data["0"]["Content"]  |> console.log

htmlCleaner = ->
	it |> stripHtml |> remover [" ", " ", " "] |> (-> it.trim!)

id = 0
byRow = ->
	it["Content"] = it["Content"] |> htmlCleaner
	it["cb_ContactData"] = it["cb_ContactData"] |> htmlCleaner
	it["cb_MetaDataCategoryIndex"] = it["cb_MetaDataCategoryIndex"] |> htmlCleaner
	it["cb_RefData"] = it["cb_RefData"] |> htmlCleaner
data |> (_.each byRow) |> outData


##type in livescript to clean up data
##filter
#inData! |> _.filter (-> it["號次"] is "1") |> outData
##side-effect
#inData! |> _.each (-> it["號次"] is "1") |> outData

#By Row action
#id = 0
#byRow = ->
	#it["得票率"] = it["得票率"] |> remover '%' |> (-> +it )
	#it["總票數"] = it["得票率"] * it["得票率"]
	#it["id"] = ++id
#inData! |> (_.each byRow) |> outData
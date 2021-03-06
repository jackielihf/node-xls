

#build cols and rows
class Builder
    constructor: ()->


    getType: (value, type)->
        return type if type
        result = switch (typeof value) 
            when "number" then "number"
            when "boolean" then "bool"
            else "string"
        return result

    build: (data, opt)->
        conf = {}
        objArray = [].concat data
        return conf if objArray.length < 1
        opt = opt ? {}
        fields = opt.order ? Object.keys(objArray[0])
        fieldMap = opt.fieldMap ? {}
        
        #cols
        conf.cols = fields.map (key, i)=>
            cell = 
                caption: fieldMap[key] ? key
                type: @getType objArray[0][key]
                beforeCellWrite: (row, cellData, eOpt)=>
                    eOpt.cellType = @getType cellData
                    return cellData
            return cell
        #rows
        conf.rows = objArray.map (row)->
            return fields.map (key)->
                return row[key]

        #console.log JSON.stringify conf
        return conf


module.exports = Builder




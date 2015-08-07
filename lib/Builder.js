(function() {
  var Builder;

  Builder = (function() {
    function Builder() {}

    Builder.prototype.getType = function(value, type) {
      var result;
      if (type) {
        return type;
      }
      result = (function() {
        switch (typeof value) {
          case "number":
            return "number";
          case "boolean":
            return "bool";
          default:
            return "string";
        }
      })();
      return result;
    };

    Builder.prototype.build = function(data, opt) {
      var conf, fieldMap, fields, objArray, _ref, _ref1;
      conf = {};
      objArray = [].concat(data);
      if (objArray.length < 1) {
        return conf;
      }
      opt = opt != null ? opt : {};
      fields = (_ref = opt.order) != null ? _ref : Object.keys(objArray[0]);
      fieldMap = (_ref1 = opt.fieldMap) != null ? _ref1 : {};
      conf.cols = fields.map((function(_this) {
        return function(key, i) {
          var cell, _ref2;
          cell = {
            caption: (_ref2 = fieldMap[key]) != null ? _ref2 : key,
            type: _this.getType(objArray[0][key]),
            beforeCellWrite: function(row, cellData, eOpt) {
              eOpt.cellType = _this.getType(cellData);
              return cellData;
            }
          };
          return cell;
        };
      })(this));
      conf.rows = objArray.map(function(row) {
        return fields.map(function(key) {
          return row[key];
        });
      });
      console.log(JSON.stringify(conf));
      return conf;
    };

    return Builder;

  })();

  module.exports = Builder;

}).call(this);

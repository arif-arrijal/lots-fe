// Global method

function getTextColumn() {
    return $('<td class="element-text"></td>');
}

function getNumericColumn() {
    return $('<td class="element-balance"></td>');
}

function addSpace(){
    return $('<b> </b>');
}

function separateComma(data) {
    return data.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")
}

String.prototype.startsWith = function(prefix) {
    return this.indexOf(prefix) === 0;
}

function addHighlight(rowId){
    var row = "#row" + rowId;
    if($(row).length){
        $(row).css("background-color", default_highlight_color);
    }
    return rowId;
}

function removeHighlight(rowId){
    var row = "#row" + rowId;
    if($(row).length){
        $(row).css("background-color", default_background_color);
    }
}


// Running trade method
function getPriceColor(change_value){
    var color;
    if (change_value < 0){
        color = price_decrease_color;
    }else if (change_value === 0){
        color = price_same_color;
    }else if (change_value > 0){
        color = price_increase_color;
    }

    return color;
}

function getChangeData(color, value){
    if (color === change_plus_color){
        value = plus_sign + value;
    }else if (color === change_minus_color || color === change_same_color){
        if (!value.toString().startsWith(minus_sign)){
            value = minus_sign + value;
        }
    }
    return value;
}

function setExistingRow(){
    var tmpRow = "#row" + existingRowId;
    var row = $(tmpRow);
    var maxRowAllowed = (Math.ceil($(parent_running_trade).height() / (row.length ? row.height() : default_row_height))) - 3;
    if (existingRowId >= maxRowAllowed){
        existingRowId = 1;
    }else {
        existingRowId++;
    }
}

function getDataWithColor(color, data) {
    var fixcolor    = color !== null ? color : default_text_color;
    var fixdata     = data !== null ? data : default_data;
    var element     = $('<b>' + fixdata + '</b>');
    element.css("color", fixcolor);
    return element;
}

function getBuyerData(code, investType, buyerType){
    var codeColor, typeColor = null;
    if (investType === investor_D){
        typeColor = investor_D_type_color;
    }else if (investType === investor_F){
        typeColor = investor_F_type_color;
    }

    if (buyerType === investor_F){
        codeColor = investor_F_code_color;
    }else if (buyerType === investor_D){
        codeColor = investor_D_code_color;
    }else if (buyerType === investor_U){
        codeColor = investor_U_code_color;
    }
    return getNumericColumn().append(
        getDataWithColor(typeColor, investType),
        addSpace(),
        getDataWithColor(codeColor, code));
}

function getSellerData(code, investType, sellerType){
    var codeColor, typeColor = null;
    if (investType === investor_D){
        typeColor = investor_D_type_color;
    }else if (investType === investor_F){
        typeColor = investor_F_type_color;
    }

    if (sellerType === investor_F){
        codeColor = investor_F_code_color;
    }else if (sellerType === investor_D){
        codeColor = investor_D_code_color;
    }else if (sellerType === investor_U){
        codeColor = investor_U_code_color;
    }
    return getNumericColumn().append(
        getDataWithColor(codeColor, code),
        addSpace(),
        getDataWithColor(typeColor, investType));
}

function getMarketData(data){
    return getTextColumn().append(
        data === market_NG ? getDataWithColor(market_NG_color, data) : getDataWithColor(other_market_NG_color, data)
    )
}
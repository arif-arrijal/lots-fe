$(document).ready(function() {
    var existingRowId = 1, highlightRowId = 1;

    var wsUri = "ws://202.77.104.244:8080/lots/runningtrade";
    // var wsUri = "ws://" + location.hostname + ":8080/lots/runningtrade";
    var websocket = new ReconnectingWebSocket(wsUri, null, {debug: false, reconnectInterval:3000, binaryType: "arraybuffer"});
    websocket.onopen    = function(evt) { onOpen(evt) };
    websocket.onclose   = function(evt) { onClose(evt) };
    websocket.onmessage = function(evt) { onMessage(evt) };
    websocket.onerror   = function(evt) { onError(evt) };


    function onOpen(evt) {
        $("#incomingTableData").find("tr").remove();
    }

    function onError(evt) {}

    function onMessage(evt) {
        var message = JSON.parse(evt.data);
        if(message instanceof Array){
            var length = message.length;
            for (var i = 0; i < length ; i ++){
                if (i === (length - 1)){
                    removeHighlight(highlightRowId);
                    setDataToUi(message[i]);
                    addHighlight(existingRowId);
                    setExistingRow();
                }else {
                    setDataToUi(message[i]);
                    setExistingRow();
                }
            }
        }else {
            removeHighlight(highlightRowId);
            setDataToUi(message);
            addHighlight(existingRowId);
            setExistingRow();
        }
    }

    function onClose(evt) {}

    function setDataToUi(message) {
        var buyer_inv_type      = message.buyer_investor_type;
        var seller_inv_type     = message.seller_investor_type;
        var stock_color         = message.stock_color;
        var trade_time          = message.trade_time;
        var market_code         = message.market_code;
        var stock_code          = message.stock_code;
        var buyer_code          = message.buyer_code;
        var buyer_type          = message.buyer_type;
        var seller_code         = message.seller_code;
        var seller_type         = message.seller_type;
        var price               = message.price;
        var change_value        = message.change_value;
        var lots                = message.lots.replace(".00", "");
        var price_color         = getPriceColor(change_value);

        var row = $('<tr style="height: 0;"></tr>');
        row.attr('id', 'row' + existingRowId);

        row.append(
            getColumn().append(getDataWithColor(null, trade_time)),
            getMarketData(market_code),
            getColumn().append(getDataWithColor(stock_color, stock_code)),
            getBuyerData(buyer_code, buyer_inv_type, buyer_type),
            getSellerData(seller_code, seller_inv_type, seller_type),
            getColumn().append(getDataWithColor(price_color, separateComma(price))),
            getColumn().append(getDataWithColor(price_color, getChangeData(price_color, change_value))),
            getColumn().append(getDataWithColor(null, lots)));

        var tmpRow = "#row" + existingRowId;
        var replacedRow = $(tmpRow);

        if (replacedRow.length){
            replacedRow.replaceWith(row);
        }else {
            row.appendTo("#incomingTableData");
        }
    }

    function setExistingRow(){
        var tmpRow = "#row" + existingRowId;
        var row = $(tmpRow);
        var maxRowAllowed = (Math.ceil($("#parentRow").height() / (row.length ? row.height() : 36))) - 3;
        if (existingRowId >= maxRowAllowed){
            existingRowId = 1;
        }else {
            existingRowId++;
        }
    }


    // some needed function
    function getPriceColor(change_value){
        var color = null;
        if (change_value < 0){
            color = 'red';
        }else if (change_value === 0){
            color = 'yellow';
        }else if (change_value > 0){
            color = 'lime';
        }

        return color;
    }

    function getChangeData(color, value){
        if (color === 'lime'){
            value = '+' + value;
        }else if (color === 'red'){
            if (!value.toString().startsWith('-')){
                value = '-' + value;
            }
        }
        return value;
    }

    String.prototype.startsWith = function(prefix) {
        return this.indexOf(prefix) === 0;
    }

    function getMarketData(data){
        return getColumn().append(
            data === 'NG' ? getDataWithColor('yellow', data) : getDataWithColor('white', data)
        )
    }

    function getBuyerData(code, investType, buyerType){
        var codeColor, typeColor = null;
        if (investType === 'D'){
            typeColor = 'lime';
        }else if (investType === 'F'){
            typeColor = 'yellow';
        }

        if (buyerType === 'F'){
            codeColor = 'yellow';
        }else if (buyerType === 'D'){
            codeColor = 'red';
        }else if (buyerType === 'U'){
            codeColor = 'magenta';
        }
        return getColumn().append(
            getDataWithColor(typeColor, investType),
            addSpace(),
            getDataWithColor(codeColor, code));
    }

    function getSellerData(code, investType, sellerType){
        var codeColor, typeColor = null;
        if (investType === 'D'){
            typeColor = 'lime';
        }else if (investType === 'F'){
            typeColor = 'yellow';
        }

        if (sellerType === 'F'){
            codeColor = 'yellow';
        }else if (sellerType === 'D'){
            codeColor = 'red';
        }else if (sellerType === 'U'){
            codeColor = 'magenta';
        }
        return getColumn().append(
            getDataWithColor(codeColor, code),
            addSpace(),
            getDataWithColor(typeColor, investType));
    }

    function getSellerData2(code, type){
        var colorCode, colorType = null;
        if (type === 'D'){
            colorCode = 'green';
            colorType = 'green';
        }else if (type === 'U'){
            colorCode = 'magenta';
            colorType = 'green';
            type = 'D';
        }else if (type === 'F'){
            colorCode = 'yellow';
            colorType = 'yellow';
        }
        return getColumn().append(
            getDataWithColor(colorCode, code),
            addSpace(),
            getDataWithColor(colorType, type))
    }

    function getBuyerData2(code, type){
        var colorCode, colorType = null;
        if (type === 'D'){
            colorCode = 'green';
            colorType = 'green';
        }else if (type === 'U'){
            colorCode = 'magenta';
            colorType = 'green';
            type = 'D';
        }else if (type === 'F'){
            colorCode = 'yellow';
            colorType = 'yellow';
        }
        return getColumn().append(
            getDataWithColor(colorType, type),
            addSpace(),
            getDataWithColor(colorCode, code))
    }

    function getColumn() {
        return $('<td ></td>');
    }

    function addSpace(){
        return $('<b> </b>');
    }

    function getDataWithColor(color, data) {
        var fixcolor    = color !== null ? color : 'white';
        var fixdata     = data !== null ? data : '';
        var element     = $('<b>' + fixdata + '</b>');
        element.css("color", fixcolor);
        return element;
    }

    function separateComma(data) {
        return data.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,")
    }

    function addHighlight(rowId){
        var row = "#row" + rowId;
        if($(row).length){
            $(row).css("background-color", "rgb(78,98,138)");
        }
        highlightRowId = rowId;
    }

    function removeHighlight(rowId){
        var row = "#row" + rowId;
        if($(row).length){
            $(row).css("background-color", "black");
        }
    }
});


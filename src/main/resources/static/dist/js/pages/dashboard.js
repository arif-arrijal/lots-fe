$(document).ready(function() {

    var existingRowId = 1, highlightRowId = 1;

    // var wsUri = local_web_socket_url;
    var wsUri = global_web_socket_url;
    var websocket = new ReconnectingWebSocket(wsUri, null, {debug: false, reconnectInterval:3000, binaryType: "arraybuffer"});
    websocket.onopen    = function() { onOpen() };
    websocket.onclose   = function(evt) { onClose(evt) };
    websocket.onmessage = function(evt) { onMessage(evt) };
    websocket.onerror   = function(evt) { onError(evt) };


    function onOpen() {
        $(running_trade_table).find("tr").remove();
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
                    highlightRowId = addHighlight(existingRowId);
                    setExistingRow();
                }else {
                    setDataToUi(message[i]);
                    setExistingRow();
                }
            }
        }else {
            removeHighlight(highlightRowId);
            setDataToUi(message);
            highlightRowId = addHighlight(existingRowId);
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
            getTextColumn().append(getDataWithColor(null, trade_time)),
            getMarketData(market_code),
            getTextColumn().append(getDataWithColor(stock_color, stock_code)),
            getBuyerData(buyer_code, buyer_inv_type, buyer_type),
            getSellerData(seller_code, seller_inv_type, seller_type),
            getTextColumn().append(getDataWithColor(price_color, separateComma(price))),
            getTextColumn().append(getDataWithColor(price_color, getChangeData(price_color, change_value))),
            getTextColumn().append(getDataWithColor(null, lots)));

        var tmpRow = "#row" + existingRowId;
        var replacedRow = $(tmpRow);

        if (replacedRow.length){
            replacedRow.replaceWith(row);
        }else {
            row.appendTo(running_trade_table);
        }
    }
});


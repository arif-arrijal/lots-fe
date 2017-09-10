var default_background_color = 'black';
var default_highlight_color = 'rgb(78,98,138)';
var default_text_color = 'white';
var default_data = '';
var default_row_height = 36;

var investor_D = 'D';
var investor_F = 'F';
var investor_U = 'U';
var investor_D_type_color = 'lime';
var investor_F_type_color = 'yellow';
var investor_F_code_color = 'yellow';
var investor_D_code_color = 'red';
var investor_U_code_color = 'magenta';

var market_NG = 'NG';
var market_NG_color = 'yellow';
var other_market_NG_color = 'white';

var price_decrease_color = 'red';
var price_increase_color = 'lime';
var price_same_color = 'yellow';

var change_plus_color = 'lime';
var change_minus_color = 'red';
var change_same_color = 'red';

var plus_sign = '+';
var minus_sign = '-';

var running_trade_table = '#incomingTableData';
var parent_running_trade= '#parentRow';

var local_web_socket_url = 'ws://202.77.104.244:8080/lots/runningtrade';
var global_web_socket_url = "ws://" + location.hostname + ":8080/lots/runningtrade";


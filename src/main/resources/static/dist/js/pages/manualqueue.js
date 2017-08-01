$('#search-keyword').on('keyup', function (e) {
    if (e.keyCode == 13) {
        var keyword = $('#search-keyword').val();
        retrieveData(keyword);
    }
});
$('#btn-search').click(function () {
    var keyword = $('#search-keyword').val();
    sendData(keyword);
});

function sendData(keyword) {

    // validasi keyword
    if(keyword == ''){
        swal({
            title: "Error Notification",
            text: "Shipment number cannot be empty!",
            type: "error",
            showConfirmButton: true
        });
    }else if (isNaN(keyword)){
        swal({
            title: "Error Notification",
            text: "Shipment number must be numeric!",
            type: "error",
            showConfirmButton: true
        });
    }else {
        //start nProgress
        NProgress.configure({ showSpinner: false });
        NProgress.start();
        NProgress.inc();

        var url = '/manual-queue/send';
        url = url + '?shipmentNo=' + keyword;
        url = url.replace(/\s/g, "+");
        $("#resultsBlock").load(url, function (response, status, xhr) {
            if (status != ''){
                NProgress.done();
            }
        });
    }
}
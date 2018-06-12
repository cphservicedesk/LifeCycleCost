function TableToArray() {
    var dataTabelArray = [];

    $("#table .data-table tbody tr").each(function (index) {
        var ID = $(this).find("td:nth-child(1)").text();
        var SubSystem = $(this).find("td:nth-child(2)").text();
        var SubSystemModule = $(this).find("td:nth-child(3)").text();
        var Product = $(this).find("td:nth-child(4)").text();
        //var qty = Number($(this).find("td:nth-child(6)").text());

        dataTabelArray.push([SubSystem + '|' + SubSystemModule + '|' + Product, calcRowFunc($(this))]);
    });
    return dataTabelArray;
}
function toggleButtonFirst() {
    $("#firstChart").toggle();
    $("#firstTable").toggle();
}

function toggleButtonSecond() {
    $("#secondChart").toggle();
    $("#secondTable").toggle();
}

function toggleButtonTable(e) {
    $("#tableCalc").toggle();
    $("#table").toggle();
    $(e).find(".toggleDriver").toggleClass("selected");
}

function PDFprint(me){
  window.print();
}

function calcRowFunc(row){
  var result = 
    row.find(".Qty").text() *
    row.find(".UnitCost").text()
  return result;
}

$(".eye").on("click", function(){
  $(this).toggleClass("deselected");
  var id = $(this).attr('id');
  $(".sub_body_view." + id).fadeToggle();
});

$("#login_icon").on("click", function(){
  toastr.success('login');
});

function ExportToExcel(){
  var tx = TableExport($("#demo"), {
    headers: true,                              // (Boolean), display table headers (th or td elements) in the <thead>, (default: true)
    footers: true,                              // (Boolean), display table footers (th or td elements) in the <tfoot>, (default: false)
    formats: ['xlsx'],                          // (String[]), filetype(s) for the export, (default: ['xls', 'csv', 'txt'])
    filename: 'ExcelExport',                    // (id, String), filename for the downloaded file, (default: 'id')
    bootstrap: false,                           // (Boolean), style buttons using bootstrap, (default: true)
    exportButtons: false,                       // (Boolean), automatically generate the built-in export buttons for each of the specified formats (default: true)
    position: 'bottom',                         // (top, bottom), position of the caption element relative to table, (default: 'bottom')
    ignoreRows: -1,                             // (Number, Number[]), row indices to exclude from the exported file(s) (default: null)
    ignoreCols: null,                           // (Number, Number[]), column indices to exclude from the exported file(s) (default: null)
    trimWhitespace: true                        // (Boolean), remove all leading/trailing newlines, spaces, and tabs from cell text in the exported file(s) (default: false)
  });

  var exportdata = tx.getExportData()['demo']['xlsx'];;
  tx.export2file(exportdata.data, exportdata.mimeType, exportdata.filename, exportdata.fileExtension);
}
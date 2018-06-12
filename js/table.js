
fetchdata("SELECT * FROM full_table", "#table");
//fetchdata("SELECT * FROM calculated", "#tableCalc");

function fetchdata(query, tableid) {
  $.ajax({
    tableid: tableid,
    url: "database.php",
    dataType: "json",
    data: { query: query },
    async: true,
    success: succes,
    error: error
  });
}

function succes(data) {
  if(this.tableid=="#table"){
    $('#table').html(createTable(data));
    whentablecreated();
    addEnterKeyEvent("#demo");
    calc_column();
    //addContextMenu();
    
  }  
}

function error() {
  alert('error in query');
}

function whentablecreated(){
  tf = new TableFilter('demo', filtersConfig, 2);
  tf.init();
}

function createTable(data) {
  var table = "";

  table += "<table id='demo' class='data-table'>";
  
  table += `<thead><tr class='first_header'>
    <th colspan='6'>SAP</th>
    <th colspan='3'>Generic data information</th>
    <th colspan='11'>Corrective maintenance cost: <span class="header_holder" id=corrective_value_holder>x</span></th>
    <th colspan='10'>Preventive maintenance cost: <span class="header_holder" id=preventive_value_holder>x</span></th>
    <th colspan='11'>External failure maintenance cost: <span class="header_holder" id=external_value_holder>x</span></th>
    <th colspan='5'>Renewal cost: <span class="header_holder" id=renewal_value_holder>x</span></th>
    <th colspan='5'>Repair cost: <span class="header_holder" id=repair_value_holder>x</span></th>
    </tr><tr>
  `;

  $.each(data.headers, function (i, item) {
    table += "<th>" + item.name + "</th>";
  });
  table += "</tr></thead>";

  table += "<tbody>";
  $.each(data.query_result_rows, function (i, line) {
    table += "<tr>";
    $.each(line, function (j, item) {
      if(j == 's.ID'                 || 
      j == 's.Location'              || 
      j =='s.SubSystem'              || 
      j =='s.Module'                 || 
      j == 's.AlstomPN'              ||
      j == 'g.AlstomDescriptionName' ||
      j == 'g.NamingConvention'      ||
      j == 'g.TypeOfInstallation')
        table += "<td class='" + j + "'>" + item + "</td>";
      else
        table += "<td class='" + j + "' contenteditable='true'>" + item + "</td>";
    });
    table += "</tr>";
  });
  table += "</tbody></table>";

  return table;
}

function addEnterKeyEvent (element){
  $(element + ' td').blur(function(e) {
    calc_column();
    console.log("blur");
    
  });

  $(element + ' td').keydown(function(e) {
    if(e.which == 13){
      this.blur();
      console.log("keydownEvent");
    }
  });

  $("#demo td").on("change", function(){
    calc_column();
    console.log("change");
  });
  
  //select common dtr and apply same edit value to cells
  $('.c\\.MissionProfile').keyup(function(event){
    $(".s\\.AlstomPN:contains('" + $(this).siblings(".s\\.AlstomPN").html() + "')").siblings('.c\\.MissionProfile:not(:focus)').html($(this).html())
    console.log($(this));
  });
}

function calc_column() {
  var corrective_value = 0;
  var preventive_value = 0;
  var external_value = 0;
  var renewal_value = 0;
  var repair_value = 0;


  //to be deleted
  tf.getHeadersText().forEach(function(value, index){
    console.log(value + ": " + index);
  });
  //

  tf.getFilteredValues().forEach(function(value, index){
    var c = value[1];

    //------Corrective calculation----------------
    var DEN = Number(c[11])+Number(c[12])+Number(c[18]);
    corrective_value += ( // AH + AF + AA*(AB + AC + AD + AE + AF + AG + AH + AI)
      Number(c[15])+Number(c[16])+Number(c[17])+Number(c[18]) + // AH
      (DEN*Number(300 /*to be updated */)) + // AF
      (Number(c[9]) / Number(c[10])) *  //AA
      (
        Number(c[11]) * Number(c[13]) + // AB
        Number(c[11]) * Number(300 /*to be updated */) +// AC
        DEN + //AD
        (DEN*Number(c[13])) +  // AE
        (DEN*Number(300)) /*to be updated */ + // AF
        Number(c[15]) + // AG ??? to be updated
        Number(c[15]) + Number(c[16]) + Number(c[17]) + Number(c[18]) // AH
         // AI
      )
    );
    //------Preventive calculation----------------
    var DEN = Number(c[22])+Number(c[12])+Number(c[18]);
    preventive_value += ( // AH + AF + AA*(AB + AC + AD + AE + AF + AG + AH + AI)
      Number(c[15])+Number(c[16])+Number(c[17])+Number(c[18]) + // AH
      (DEN*Number(300 /*to be updated */)) + // AF
      (Number(c[9]) / Number(c[10])) *  //AA
      (
        Number(c[11]) * Number(c[13]) + // AB
        Number(c[11]) * Number(300 /*to be updated */) +// AC
        DEN + //AD
        (DEN*Number(c[13])) +  // AE
        (DEN*Number(300)) /*to be updated */ + // AF
        Number(c[15]) + // AG ??? to be updated
        Number(c[15]) + Number(c[16]) + Number(c[17]) + Number(c[18]) // AH
         // AI
      )
    );
    //------External calculation----------------
    var DEN = Number(c[22])+Number(c[12])+Number(c[18]);
    external_value += ( // AH + AF + AA*(AB + AC + AD + AE + AF + AG + AH + AI)
      Number(c[15])+Number(c[16])+Number(c[17])+Number(c[18]) + // AH
      (DEN*Number(300 /*to be updated */)) + // AF
      (Number(c[9]) / Number(c[10])) *  //AA
      (
        Number(c[11]) * Number(c[13]) + // AB
        Number(c[11]) * Number(300 /*to be updated */) +// AC
        DEN + //AD
        (DEN*Number(c[13])) +  // AE
        (DEN*Number(300)) /*to be updated */ + // AF
        Number(c[15]) + // AG ??? to be updated
        Number(c[15]) + Number(c[16]) + Number(c[17]) + Number(c[18]) // AH
          // AI
      )
    );
    //------Renewal calculation---------------- 
    renewal_value += (
      Number(c[41]) + 
      Number(c[42]) +
      Number(c[43]) +
      Number(c[44]) +
      Number(c[45])
    );
    //------Repair calculation----------------
    repair_value +=( // AA + AB
      (Number(c[46])*(Number(c[50])+Number(c[49]))) + // AA: B*(F+E)
      ((1-Number(c[46]))*(Number(c[47])+Number(c[48])+Number(c[9])+Number(c[50]))) // AB: (1-B)*(C+D+E+F) to be updated
    );
  });

  $("#corrective_value_holder").html(corrective_value.toFixed(2) + ' DKK').hide().fadeIn();
  $("#preventive_value_holder").html(preventive_value.toFixed(2) + ' DKK').hide().fadeIn();
  $("#external_value_holder").html(external_value.toFixed(2) + ' DKK').hide().fadeIn();
  $("#renewal_value_holder").html(renewal_value.toFixed(2) + ' DKK').hide().fadeIn();
  $("#repair_value_holder").html(repair_value.toFixed(2) + ' DKK').hide().fadeIn();
  
  $("#total_cost_var").html(((corrective_value+preventive_value+external_value+renewal_value+repair_value)/1000000).toFixed(2) + 'M DKK').hide().fadeIn();
}

function addContextMenu(){
  $.contextMenu({
      selector: '#demo thead tr th', 
      callback: function(key, options) {
          var m = "clicked: " + key;
          window.console && console.log(m) || alert(m); 
      },
      items: {
        "hide": {name: "Hide column", "icon": "edit"},
        "show": {
          "name": "Show column", 
          "items": {
            "column1": {"name": "column 1"},
            "column2": {"name": "column 2"},
            "column3": {"name": "column 3"}
          }
        }
      }
  });
}

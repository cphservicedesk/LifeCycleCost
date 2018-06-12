function calculate() {
  var tableHTML =[];

  var maintainer = {
    "main1": 300,
    "man2": 250
  }

  tableHTML += `
  <table class="data-table TF">
    <caption>
      <div class="inf"></div>
    </caption>
    <thead>
      <tr>
        <th colspan='6'>SAP</th>
        <th colspan='17'>Corrective maintenance data information</th>
        <th colspan='17'>Preventive maintenance data information</th>
        <th colspan='17'>External failure maintenance data information</th>
        <th colspan='3'>Repair data information</th>
      </tr>
      <tr>
        <th>s.ID</th>
        <th>s.Location</th>
        <th>s.SubSystem</th>
        <th>s.Module</th>
        <th>s.AlstomPN</th>
        <th>s.Quantity</th>

        <th title="number of interventions per year" fulltext="full text example">c.AA</th>
        <th title="active man-hours required per each intervention">c.AB</th>
        <th title="cost of active man-hours required per each intervention (formula to be updated)">c.AC</th>
        <th title="total time required per each intervention">c.AD</th>
        <th title="total man-hours required per each intervention">c.AE</th>
        <th title="total cost of man-hours required per each intervention (formula to be updated)">c.AF</th>
        <th title="cost of possession per each intervention">c.AG</th>
        <th title="total cost no man-hours per each intervention (formula to be updated)">c.AH</th>
        <th title="total cost per each intervention (formula to be updated)">c.AI</th>
        <th title="active man-hours required per each year">c.AJ</th>
        <th title="cost of active man-hours required per each year (formula to be updated)">c.AK</th>
        <th title="total time required per each year (formula to be updated)">c.AL</th>
        <th title="total man-hours required per each year (formula to be updated)">c.AM</th>
        <th title="total cost of man-hours required per each year (formula to be updated)">c.AN</th>
        <th title="cost of possession per each year (formula to be updated)">c.AO</th>
        <th title="total cost no man-hours per each year (formula to be updated)">c.AP</th>
        <th title="total cost per each year (formula to be updated)">c.AQ</th>

        <th title="number of intervention per year">p.AA</th>
        <th title="active man-hours required per each intervention">p.AB</th>
        <th title="cost of active man-hours required per each intervention">p.AC</th>
        <th title="total time required per each intervention">p.AD</th>
        <th title="total man-hours required per each intervention">p.AE</th>
        <th title="total cost of man-hours required per each intervention">p.AF</th>
        <th title="cost of possession per each intervention">p.AG</th>
        <th title="total cost no man-hours per each intervention">p.AH</th>
        <th title="total cost per each intervention">p.AI</th>
        <th title="active man-hours required per each year">p.AJ</th>
        <th title="cost of active man-hours required per each year">p.AK</th>
        <th title="total time required per each year">p.AL</th>
        <th title="total man-hours required per each year">p.AM</th>
        <th title="total cost of man-hours required per each year">p.AN</th>
        <th title="cost of possession per each year">p.AO</th>
        <th title="total cost no man-hours per each year">p.AP</th>
        <th title="total cost per each year">p.AQ</th>

        <th title="number of intervention per year">e.AA</th>
        <th title="active man-hours required per each intervention">e.AB</th>
        <th title="cost of active man-hours required per each intervention">e.AC</th>
        <th title="total time required per each intervention">e.AD</th>
        <th title="total man-hours required per each intervention">e.AE</th>
        <th title="total cost of man-hours required per each intervention">e.AF</th>
        <th title="cost of possession per each intervention">e.AG</th>
        <th title="total cost no man-hours per each intervention">e.AH</th>
        <th title="total cost per each intervention">e.AI</th>
        <th title="active man-hours required per each year">e.AJ</th>
        <th title="cost of active man-hours required per each year">e.AK</th>
        <th title="total time required per each year">e.AL</th>
        <th title="total man-hours required per each year">e.AM</th>
        <th title="total cost of man-hours required per each year">e.AN</th>
        <th title="cost of possession per each year">e.AO</th>
        <th title="total cost no man-hours per each year">e.AP</th>
        <th title="total cost per each year">e.AQ</th>

        <th title="repair price for each discarded reparation">rp.AA</th>
        <th title="repair price for each not discarded reparation">rp.AB</th>
        <th title="total repair price for each reparation">rp.AC</th>
      </tr>
    </thead>
    <tbody>`;

  tf.getFilteredValues().forEach(function(value, index){
    var col = value[1];
    tableHTML += `
      <tr class="${oddOrEven(index)}">
        <td>${col[0].toString()}</td>
        <td>${col[1].toString()}</td>
        <td>${col[2].toString()}</td>
        <td>${col[3].toString()}</td>
        <td>${col[4].toString()}</td>
        <td>${col[5].toString()}</td>

        <td>${col[9] / col[10]}</td>
        <td>${col[11] * col[13]}</td>
        <td>${col[11] * 4}</td>
        <td>${Number(col[11]) + Number(col[12]) + Number(col[28])}</td>
        <td>${(Number(col[11]) + Number(col[12]) + Number(col[28]))*col[13]}</td>
        <td>${(Number(col[11]) + Number(col[12]) + Number(col[28]))*col[13] *3}</td>
        <td>${col[15]}</td>
        <td>${Number(col[15]) + Number(col[16]) + Number(col[17]) + Number(col[18])}</td>
        <td>${Number(col[15]) + Number(col[16]) + Number(col[17]) + Number(col[18]) + (Number(col[11]) + Number(col[12]) + Number(col[28]))*col[13] *3}</td>
        <td>${col[15]}</td>
        <td>${col[15]}</td>
        <td>${col[15]}</td>
        <td>${col[15]}</td>
        <td>${col[15]}</td>
        <td>${col[15]}</td>
        <td>${col[15]}</td>
        <td>${col[15]}</td>

        <td>${col[11]}</td>
        <td>${col[11]}</td>
        <td>${col[11]}</td>
        <td>${col[11]}</td>
        <td>${col[11]}</td>
        <td>${col[11]}</td>
        <td>${col[11]}</td>
        <td>${col[11]}</td>
        <td>${col[11]}</td>
        <td>${col[11]}</td>
        <td>${col[11]}</td>
        <td>${col[11]}</td>
        <td>${col[11]}</td>
        <td>${col[11]}</td>
        <td>${col[11]}</td>
        <td>${col[11]}</td>
        <td>${col[11]}</td>

        <td>${col[13]}</td>
        <td>${col[13]}</td>
        <td>${col[13]}</td>
        <td>${col[13]}</td>
        <td>${col[13]}</td>
        <td>${col[13]}</td>
        <td>${col[13]}</td>
        <td>${col[13]}</td>
        <td>${col[13]}</td>
        <td>${col[13]}</td>
        <td>${col[13]}</td>
        <td>${col[13]}</td>
        <td>${col[13]}</td>
        <td>${col[13]}</td>
        <td>${col[13]}</td>
        <td>${col[13]}</td>
        <td>${col[13]}</td>

        <td>${col[12]}</td>
        <td>${col[12]}</td>
        <td>${col[12]}</td>
      </tr>`;  
  });

  tableHTML += `
    </tbody>
  </table>`;

  $("#fragment-2").html(tableHTML);
}

function oddOrEven(num){
  if(num % 2 == 0)
      return "even";
  return "odd";
}

function switch_header_text(e) {
  
}
function addRow(table, vals, isHeader){
  var row = document.createElement("tr");
  if(isHeader){
    for (const header of vals) {
      addHeader(row, header);
    }
  }
  else{
    for (const data of vals){
      addData(row, data);
    }
  }
  table.append(row);
}

function addHeader(row, val){
  var header = document.createElement("th");
  header.innerText = val;
  row.append(header);
}

function addData(row, val){
  var data = document.createElement("td");
  data.innerText = val;
  row.append(data);
}


function appendTable(tableDiv, tableId, tableSchema){
  var table = document.createElement("table");
  table.className = "Tables";
  table.id = tableId;

  addRow(table, tableSchema.columns, true);

  if(tableSchema.data){
    for(const row of tableSchema.data){
      addRow(table, row, false);
    }
  }
  tableDiv.append(table);
}
function appendTable(tableDiv){
  var tableMain = document.createElement("table")
    tableMain.id = "example-table"

    var tabler0 = document.createElement("tr")
    var tableh1 = document.createElement("th")
    tableh1.innerText = "Col1"
    var tableh2 = document.createElement("th")
    tableh2.innerText = "Col2"
    tabler0.append(tableh1)
    tabler0.append(tableh2)

    var tabler1 = document.createElement("tr")
    var tabled1 = document.createElement("td")
    tabled1.innerText = "Data1"
    var tabled2 = document.createElement("td")
    tabled2.innerText = "Data2"
    tabler1.append(tabled1)
    tabler1.append(tabled2)

    tableMain.append(tabler0)
    tableMain.append(tabler1)

    tableDiv.append(tableMain)
}
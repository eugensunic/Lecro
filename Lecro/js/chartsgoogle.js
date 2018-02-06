var pie_chart = true;
var column_chart = false;
var graph_title = "Pie chart";

var chart;
google.load('visualization', '1', { packages: ['corechart'] });

//trebao bi ponovo kopiju arraya napraviti
function drawBasic(array1) {
    var data = new google.visualization.DataTable();

    data.addColumn('string', 'Iznos: '); //Columns in the multidimensional array
    data.addColumn('number', ''); //
    data.addRows(array1.length);
   

    for (var j = 0; j < array1.length; j++) {
       
        data.setValue(parseInt(j), 0, array1[j].imprezim);
        //alert(array1[j].imprezim);
        if (ustedevina) {
            checkNullAndK(array1,j);
           
            data.setValue(parseInt(j), 1, array1[j].ustedevina);
        }
        else if (nekretnine) {
            checkNullAndK(array1, j);
       
            data.setValue(parseInt(j), 1, array1[j].nekretnine);
        }
        else if (placa) {
            checkNullAndK(array1, j);
            data.setValue(parseInt(j), 1, array1[j].placa);
        }
        else if (broj_nekretnina) {
            checkNullAndK(array1, j);
            data.setValue(parseInt(j), 1, array1[j].broj_nekretnina);
        }
        else if (broj_optuznica) {
            checkNullAndK(array1, j);
            data.setValue(parseInt(j), 1, array1[j].broj_optuznica);
        }
    }

    if (pie_chart) {
        if (croatian_lang_selected) {
            graph_title = "Kružni graf";
        }
        else if (english_lang_selected) {
            graph_title = "Pie chart";
        }
        var options = {

            title: graph_title
        };

        chart = new google.visualization.PieChart(document.getElementById('chart_div'));
    }
    else if (column_chart) {
        var politician_string_name;
        var ranking_name;
        if (croatian_lang_selected) {

            graph_title = "Stupčasti graf";
            politician_string_name = "Dužnosnici";
            ranking_name = "Rang lista";
        }
        else if (english_lang_selected) {
            graph_title = "Column chart";
            politician_string_name = "Politicians ";
            ranking_name = "Ranking";
        }
        var options = {

            title: graph_title,

            hAxis: {
                title: politician_string_name
            },
            vAxis: {
                title: ranking_name
            }
        };

        chart = new google.visualization.ColumnChart(document.getElementById('chart_div'));
    }

    chart.draw(data, options);
}
function checkNullAndK(array1,index) {
    if (ustedevina) {
        if ((array1[index].ustedevina) == null || (array1[index].ustedevina) == undefined) { array1[index].ustedevina = "0"; }
        else if ((array1[index].ustedevina)[array1[index].ustedevina.length - 1] == "K") {
            array1[index].ustedevina = array1[index].ustedevina.substr(0, array1[index].ustedevina.length - 1);
        }
    }
    else if (nekretnine) {
        //alert(array1[index].nekretnine);
        if ((array1[index].nekretnine) == null || (array1[index].nekretnine) == undefined) { array1[index].nekretnine = "0"; }
        else if ((array1[index].nekretnine)[array1[index].nekretnine.length - 1] == "K") {
            //alert("Enter");
            array1[index].nekretnine = array1[index].nekretnine.substr(0, array1[index].nekretnine.length - 1);
            //alert(array1[index].nekretnine);
        }
      
        
    }
     else if (placa) {
        if ((array1[index].placa) == null || (array1[index].placa) == undefined) { array1[index].placa = "0"; }
       else  if ((array1[index].placa)[array1[index].placa.length - 1] == "K") {
            array1[index].placa = array1[index].placa.substr(0, array1[index].placa.length - 1);
        }
    }
     else if (broj_nekretnina) {
        if ((array1[index].broj_nekretnina) == null || (array1[index].broj_nekretnina) == undefined) { array1[index].broj_nekretnina = "0"; }

       else  if ((array1[index].broj_nekretnina)[array1[index].broj_nekretnina.length - 1] == "K") {
            array1[index].broj_nekretnina = array1[index].broj_nekretnina.substr(0, array1[index].broj_nekretnina.length - 1);
        }
    }
    else if (broj_optuznica) {
        if ((array1[index].broj_optuznica) == null || (array1[index].broj_optuznica) == undefined) { array1[index].broj_optuznica = "0"; }
       else  if ((array1[index].broj_optuznica)[array1[index].broj_optuznica.length - 1] == "K") {
            array1[index].broj_optuznica = array1[index].broj_optuznica.substr(0, array1[index].broj_optuznica.length - 1);
        }
    }
}

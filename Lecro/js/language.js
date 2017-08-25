$(document).ready(function () {

    $("#cro-lang").click(function () {
        //fixing chart section on cro click
        if ($("#expand-chart").text() == "Proširi") {
            $("#expand-chart").text("Smanji");
            drawBasic(drzavnici_main_middle);
        }
        else {
            $("#chart_div").css({
                width: isotope_width,
                height: "229px"
            });
            drawBasic(drzavnici_main_middle);
            $("#expand-chart").text("Proširi");
        }
        english_lang_selected = false;
        croatian_lang_selected = true;
        croatianTranslate();
        timelineTranslateCroatian();
        $(this).css("opacity", "0.9");
        $("#uk-lang").css("opacity", "0.2");
    });
    $("#uk-lang").click(function () {
        //fixing chart section on uk click
        if ($("#expand-chart").text() == "Expand") {
            $("#expand-chart").text("Contract");
            drawBasic(drzavnici_main_middle);
        }
        else {
            $("#chart_div").css({
                width: isotope_width,
                height: "229px"
            });
            drawBasic(drzavnici_main_middle);
            $("#expand-chart").text("Expand");
        }
        english_lang_selected = true;
        croatian_lang_selected = false;
        englishTranslate();
        timelineTranslateEnglish();
        $(this).css("opacity", "0.9");
        $("#cro-lang").css("opacity", "0.2");

    });
});

function englishTranslate() {
    //right side first three OK
    $(".nav.navbar-nav.navbar-right .dropdown:first-child a").text("Settings").append('<span class="caret">');
    $(".dropdown + li a").text("Vision");
    $(".nav.navbar-nav.navbar-right .dropdown:nth-child(3) a").text("Info").append('<span class="caret">');
    $(".dropdown + li a").text("Vision");

    //right side embedded  second OK
    $(".dropdown .dropdown-menu li:first-child a").text("Lecro (info)");
    $(".dropdown .dropdown-menu li:nth-child(2) a").text("Data (criteria)");
    $(".dropdown .dropdown-menu li:nth-child(3) a").text("Impresum");
    $(".dropdown .dropdown-menu li:nth-child(5) a").text("Technologies");

    //right side embedded  first OK
    $("#icon-animation > a").text("Icon animation");
    $("#back-color > a").text("Background color");
    $("#language-but > a").text("Language");
    $("#timeline-but > a").text("Timeline");
    $("#category-but > a").text("Category");

    //sort-graph radio NOT WORKING"
    $(".onoffswitch-inner").attr("data-content1", "Sort");
    $(".onoffswitch-inner").attr("data-content2", "Graph");

    //0label+five labels - left side OK
    $("#Radio0").text("Original");
    $('label[for="Radio1"]').text("Savings");
    $('label[for="Radio2"]').text("Real estate");
    $('label[for="Radio3"]').text("Salary");
    $('label[for="Radio4"]').text("#Real estate");
    $('label[for="Radio5"]').text("#Indictment");

    //filter paragraph OK
    $("#checkbox-wrapper + p").text("Choose:");
    $("#switch-chart").text("Column chart");
    $("#expand-chart").text("Expand");

    //middle hover 4icons text OK
    $("#trending + p").text("trending");
    $("#croatian-parliament + p").text("croatian parliament");
    $("#euro-parliament + p").text("european parliament");
    $("#everyone + p").text("all politicians");

    //middle hover 4icons extended text OK
    $("#trendin2").text("Trending");
    $("#croatian-parliament2").text("CRO.parliament");
    $("#euro-parliament2").text("Europarliament");
    $("#everyone2").text("Politicians");

    //president section OK
    $("#presidentsicons-wrapper > p").text("Presidents");

    //settings section
    //settings top left label OK
    $(".left-top-settings").text("Settings");

    //3paragraphs OK
    $("#animation-settings p").text("Border");
    $("#animation-settings p:first-child").text("Animation effect");
    $("#squares > p").text("Background-color");

    //3 checkboxes OK
    $('label[for="fancy-checkbox-primary"]:nth-child(2)').text("pop-up box");
    $('label[for="fancy-checkbox-info"]:nth-child(2)').text("middle icon");
    $('label[for="fancy-checkbox-warning"]:nth-child(2)').text("sorting icons");
    //footer text OK
    $(".footer").text("© 2016 LeCro. All rights reserved.");


}
function croatianTranslate() {
    //right side first three OK
    $(".nav.navbar-nav.navbar-right .dropdown:first-child a").text("Postavke").append('<span class="caret">');
    $(".nav.navbar-nav.navbar-right .dropdown:nth-child(3) a").text("Info").append('<span class="caret">');
    $(".dropdown + li a").text("Vizija");

    //right side embedded  second OK
    $(".dropdown .dropdown-menu li:first-child a").text("Lecro (info)");
    $(".dropdown .dropdown-menu li:nth-child(2) a").text("Podaci (kriterij)");
    $(".dropdown .dropdown-menu li:nth-child(3) a").text("Impresum");
    $(".dropdown .dropdown-menu li:nth-child(5) a").text("Tehnologije");

    //right side embedded  first OK
    $("#icon-animation > a").text("Animacija ikona");
    $("#back-color > a").text("Boja pozadine");
    $("#language-but > a").text("Jezik");
    $("#timeline-but > a").text("Timeline");
    $("#category-but > a").text("Kategorija");

    //sort-graph radio NOT WORKING
    $(".onoffswitch-inner").attr('data-content1', 'Sortiraj');
    $(".onoffswitch-inner").attr('data-content2', 'Graf');

    //0label+five labels - left side OK
    $("#Radio0").text("Original");
    $('label[for="Radio1"]').text("Ušteđevina");
    $('label[for="Radio2"]').text("Nekretnine");
    $('label[for="Radio3"]').text("Plaća");
    $('label[for="Radio4"]').text("#Nekretnine");
    $('label[for="Radio5"]').text("#Optužnice");

    //filter paragraph OK
    $("#checkbox-wrapper + p").text("Odaberi:");
    $("#switch-chart").text("Column chart");
    $("#expand-chart").text("Proširi");

    //middle hover 4icons text OK
    $("#trending + p").text("trending");
    $("#croatian-parliament + p").text("saborski zastupnici");
    $("#euro-parliament + p").text("europski parlament");
    $("#everyone + p").text("svi političari");

    //middle hover 4icons extended text OK
    $("#trendin2").text("Trending");
    $("#croatian-parliament2").text("HR.parlament");
    $("#euro-parliament2").text("Europarlament");
    $("#everyone2").text("Političari");

    //president section OK
    $("#presidentsicons-wrapper > p").text("Predsjednici");

    //settings section
    //settings top left label OK
    $(".left-top-settings").text("Postavke");

    //3paragraphs OK
    $("#animation-settings p").text("Okvir");
    $("#animation-settings p:first-child").text("Efekt animacije");
    $("#squares > p").text("Boja pozadine");

    //3 checkboxes OK
    $('label[for="fancy-checkbox-primary"]:nth-child(2)').text("pop-up pozadina");
    $('label[for="fancy-checkbox-info"]:nth-child(2)').text("srednja ikona");
    $('label[for="fancy-checkbox-warning"]:nth-child(2)').text("sortiranje ikona");
    //footer text OK
    $(".footer").text("© 2016 LeCro. Sva prava pridržana.");
    

}
function timelineTranslateEnglish() {
    $("#prikazi-sve").text("See all");
    $("#obiljezja").text("General elements");
    $("#optuznice").text("Indictment");
    $("#novac").text("Money");
    $("#statistika").text("Statistics");
    $("#year-choose").text("Select year:")
    $("#lab-one span").text("Heading");
    $("#lab-one").css("margin-left", "1px"); 
    //$("#lab-two").text("URL");
    $("#lab-two").css("margin-left", "-11px"); 
    $("#lab-three span").text("Order");
    $("#lab-three").css("margin-left", "-6px"); 
    $("#lab-one input").prop('checked', true); 
    $("#lab-two input").prop('checked', true); 
    $("#lab-three input").prop('checked', true);
    $("url-timeline").text("URL:");


}
function timelineTranslateCroatian() {
    $("#prikazi-sve").text("Prikaži sve");
    $("#obiljezja").text("Obilježja");
    $("#optuznice").text("Optužnice");
    $("#novac").text("Novac");
    $("#statistika").text("Statistika");
    $("#year-choose").text("Odaberi godinu:")
   
    $("#lab-one span").text("Naslov");
    $("#lab-one").css("margin-left", "-3px"); 
    //$("#lab-two input").text("URL");
    $("#lab-two").css("margin-left", "-11px"); 
    $("#lab-three span").text("Poredak");
    $("#lab-three").css("margin-left", "0px"); 
    $("#lab-one input").prop('checked', true); 
    $("#lab-two input").prop('checked', true); 
    $("#lab-three input").prop('checked', true);
    $("url-timeline").text("URL:"); 
}
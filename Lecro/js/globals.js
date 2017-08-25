//typeahead populate box
var drzavnici = [];
var drzavnici_copy = []; //cro and on ready
var drzavnici_eu = []; //eu 
var drzavnici_main_middle = [];
var drzavnici_cro = [];
var trending_array_both = [];
var event_radioleftgroup_endloop = 0;

//timeline arrays
var prikazi_sve = [];
var obiljezja = [];
var optuznice = [];
var novac = [];

//za prikazi sve
var podaci_date = [];
var podaci_url = [];

//za ostalo
var podaci_date_obiljezja = [];
var podaci_url_obiljezja = [];
var podaci_date_optuznice = [];
var podaci_url_optuznice = [];
var podaci_date_novac = [];
var podaci_url_novac = [];
var podaci_heading = [];

//index.html left side
var ustedevina;
var nekretnine;
var placa;
var broj_nekretnina;
var broj_optuznica;

var original_sort = false;
var num_sort = false;
var bar_color = "silver";
var path = "";

var initial_isotope_img_alt =  [];
var initial_isotope_img_src =  [];
var initial_isotope_txtimg = [];

var resizelang = true;
var resizetime = false;
var resizecat = false;

var horizontal_vertical = false;

var popupcheck = true;
var middlecheck = true;
var isotopetime = "0.5s";

var english_lang_selected = false;
var croatian_lang_selected = true;

var windowsize;
var stats = true;
var isotope_width;


function populateTimeline(array_content, array_date, array_url, index0, array_heading,checks) {
    var temp_year = "";
    if (checks) {
        for (index0 = array_content.length - 1; index0 >= 0; index0--) {
           
                if (temp_year != array_date[index0].toString().substr(0, 4).trim()) {
                    $(".timeline").append('<li class="year">' + array_date[index0].toString().substr(0, 4) + '</li>');
                    temp_year = array_date[index0].toString().substr(0, 4);
                }
            createPost(index0, array_content, array_url, array_date,array_heading);
        }
        checkTimelineCheckbox();
    } else {
        for (index0 = 0; index0 <array_content.length; index0++) {
           
                if (temp_year != array_date[index0].toString().substr(0, 4).trim()) {
                    $(".timeline").append('<li class="year">' + array_date[index0].toString().substr(0, 4) + '</li>');
                    temp_year = array_date[index0].toString().substr(0, 4);
                }
            createPost(index0, array_content, array_url, array_date,array_heading);
        }
        checkTimelineCheckbox();
    }
}
function populateDropDownDate(input_array) {
    if (input_array.length > 0) {
        if ($('#lab-three input').is(':checked')) {
            for (var i = 0; i<input_array.length; i++) {
                if (i == input_array.length - 1) {

                    $(".dropping-years").append('<option value=' + i + '>' + input_array[i].toString().substr(0, 4).trim() + '</option>');
                }
                if (i < input_array.length - 1) {
                    if (input_array[i].toString().substr(0, 4).trim() != input_array[i + 1].toString().substr(0, 4).trim()) {

                        $(".dropping-years").append('<option value=' + i + '>' + input_array[i].toString().substr(0, 4).trim() + '</option>');
                    }
                }
            }
        }
        else {
            for (var i = input_array.length - 1; i >= 0; i--) {
                if (i == input_array.length - 1) {

                    $(".dropping-years").append('<option value=' + i + '>' + input_array[i].toString().substr(0, 4).trim() + '</option>');
                }
                if (i < input_array.length - 1) {
                    if (input_array[i].toString().substr(0, 4).trim() != input_array[i + 1].toString().substr(0, 4).trim()) {

                        $(".dropping-years").append('<option value=' + i + '>' + input_array[i].toString().substr(0, 4).trim() + '</option>');
                    }
                }
            }

        }
    }
}
function createPost(i, cont, url, date, heading_name) {
    var current_language;
    if (croatian_lang_selected) {
        current_language = "Naslov:";
    }
    else {
        current_language = "Heading:";
    }
    var makediv = $('<li class="event">\
                        <div class="date-post"></div>\
                        <p></p>\
                        <div class="heading-timeline">'+current_language+'</div>\
                        <div class="heading-response"></div>\
                        <div class="url-timeline"><a class="link-response" href="" target="_blank">URL</a></div>\
                        </li>');

    
    var moment = date[i].toString().substr(5, date[i].length).trim();
    $(makediv).find(".date-post").text(moment.substring(moment.indexOf('-') + 1, moment.length) + "." + moment.substring(0,moment.indexOf('-')) + ".");
    $(makediv).find("p").text(cont[i]);
    if (heading_name[i] == null) {
        $(makediv).find(".heading-response").text("... ");
    }
    else {
        $(makediv).find(".heading-response").text(heading_name[i]);
    }
    $(makediv).find(".url-timeline").find(".link-response").prop("href", url[i]);
    $(".timeline").append(makediv);
}
function checkTimelineCheckbox() {
    if ($('#lab-one input').is(":checked")) {
        $(".heading-timeline").show();
        $(".heading-response").show();
    }
    else {
        $(".heading-timeline").hide();
        $(".heading-response").hide();
    }
    if ($('#lab-two input').is(":checked")) {
        $(".url-timeline").show();
        $(".url-response").show();
    }
    else {
        $(".url-timeline").hide();
        $(".url-response").hide();
    }
}
function trendingFindOnline(htmltext, input_array_all) {
    var trending_temp_array = [];
    for (var i = 0; i < input_array_all.length; i++) {
        if (htmltext.indexOf(input_array_all[i].prezime) > -1 && input_array_all[i].prezime != "Mesić" && input_array_all[i].prezime != "Grabar-Kitarović" && input_array_all[i].prezime != "Josipović") {  //if contains
            trending_temp_array.push(input_array_all[i].imprezim);
        }    
    }
    return trending_temp_array;
}
function typeaheadPopulateFields(name1, displaykey1, source1) {
    $('.typeahead').typeahead({
        hint: true,
        highlight: true,
        minLength: 1
    }, {
        name: name1,
        displayKey: displaykey1,
        source: source1
    });
}
function typeaheadPopulateFieldsOnReady(name1,source1) {
    $('.typeahead').typeahead({
        hint: true,
        highlight: true,
        minLength: 1
    }, {
        name: name1,
        source: source1
    });
}
function checkFilterAndPopulate(input_array, filter_word) {
    var temp_obj_array = [];
    for (var i = 0; i < input_array.length; i++) {
        if (input_array[i].filtar == filter_word) {
            inner_drzavnici = {}
            inner_drzavnici["newnames"] = input_array[i].imprezim;
            temp_obj_array.push(inner_drzavnici);
        }
    }
    return temp_obj_array;
}
function chooseTwelvePoliticians(input_array,filter_word) {
    var temp_array = [];
    for (var i = 0; i < input_array.length; i++) {
        if (i > 11) {
            break;
        }
        if (filter_word == "cro" || filter_word == "eu") {
            temp_array.push(removeDiacritics(input_array[i].newnames.trim().toLowerCase().replace(' ', '_')));
        }
        else if (filter_word == "trend") {
            temp_array.push(removeDiacritics(input_array[i].trim().toLowerCase().replace(' ', '_')));
        }
        else {
            temp_array.push(removeDiacritics(input_array[i].imprezim.trim().toLowerCase().replace(' ', '_')));
        } //umjesto imprezim stavi newnames za eu i cro
    }
  
    return temp_array;   
}
//input_array se odnosi na ime/prezime
function removeDiacritics(input_word) {
   
    for (var i = 0; i < input_word.length; i++) {
        if (input_word[i] == 'ć' || input_word[i] == 'č') { input_word =input_word.replace(input_word[i], 'c'); }
        if (input_word[i] == 'ž') { input_word = input_word.replace(input_word[i], 'z'); }
        if (input_word[i] == 'š') { input_word = input_word.replace(input_word[i], 's'); }
        if (input_word[i] == 'đ') { input_word = input_word.replace(input_word[i], 'd'); }
        if (input_word[i] == ' ') { input_word = input_word.replace(input_word[i], '_'); }
    }
    return input_word;
}
function removeLeftIconsDoNotMatchFilter(input_array) {
    //uvijek 12
    $(".isotope .ikonice").each(function (i, obj) {
        if (i >= input_array.length) {
            $(this).remove();
        }
    });
}
function blurEuropeanElements(blur_degree) {
    $(".typeahead").prop('disabled', true);
    $(".typeahead").css("opacity", blur_degree);
    $("#change-image").css("opacity", blur_degree);
    $("#checkbox-wrapper+p").css("opacity", blur_degree);
}
function unblurEuropeanElements(blur_degree) {
    $(".typeahead").prop('disabled', false);
    $(".typeahead").css("opacity", blur_degree);
    $("#change-image").css("opacity", blur_degree);
    $("#checkbox-wrapper+p").css("opacity", blur_degree);
}
function removeDuplicates(arr) {
    var obj = {};
    for (var i = 0; i < arr.length; i++) {
        obj[arr[i]] = true;
    }
    arr = [];
    for (var key in obj) {
        arr.push(key);
    }
    return arr;
}
function populateMiddleIcons(arraynamelast,arrayimg, filter_word) {
    $(".ikonice").each(function (i, obj) {

        if (filter_word == "trend") {
            $(this).find(".txtimg").text(arraynamelast[i].substring(arraynamelast[i].indexOf(' ') + 1, arraynamelast[i].length) + " " + (arraynamelast[i])[0] + ".");  
        }
        else {
            $(this).find(".txtimg").text(arraynamelast[i].imprezim.substring(arraynamelast[i].imprezim.indexOf(' ') + 1, arraynamelast[i].imprezim.length) + " " + (arraynamelast[i].imprezim)[0] + ".");
        }
        $(this).find("img").attr({
            alt: arraynamelast[i].imprezim,
            src: "images/" + arrayimg[i] + ".jpg"
        });

    });
}
function populateMainMiddleObjectArray(reference_array) {
    var output_array = [];
    $(".isotope > .ikonice").each(function (i, obj) { 
        populatingMainArray(this,output_array,reference_array);
    });
    return output_array;
}
function populateMainMiddleObjectArrayEuOnly(reference_array) {
    
    var output_array = [];
    $(".isotope > .ikonice").each(function (j, obj) { 
        if (j > 10) { return false;}
        populatingMainArray(this,output_array,reference_array);
        
    });
    return output_array;
}
function populateMainMiddleObjectArrayTrendingOnly(reference_array) {
    
    var output_array = [];
    $(".isotope > .ikonice").each(function (i, obj) { 
        if (i > trending_array_both.length-1) { return false; }
         populatingMainArray(this,output_array,reference_array);

    });
    return output_array;
}
//funckija koja se nikada nece izvrsiti jer ce uvijek biti barem jedan podatak u bazi od njih 12 ali svejedno
function checkIfAnyArrayElementIsNull(reference_array) {
  
    for (var i = 0; i < reference_array.length; i++) {
        if (ustedevina) {
            if (reference_array[i].ustedevina != null && reference_array[i].ustedevina != undefined && parseInt(reference_array[i].ustedevina) != 0) {
                return true; //barem jedan nije null
            }
        }
        else if (nekretnine) {
            if (reference_array[i].nekretnine != null && reference_array[i].nekretnine != undefined && parseInt(reference_array[i].nekretnine) != 0) {
                return true; 
            }
        }
        else if (placa) {
            if (reference_array[i].placa != null && reference_array[i].placa != undefined && parseInt(reference_array[i].placa) != 0) {
                return true; 
            }
        }
        else if (broj_nekretnina) {
            if (reference_array[i].broj_nekretnina!= null && reference_array[i].broj_nekretnina != undefined && parseInt(reference_array[i].broj_nekretnina) != 0) {
                return true; 
            }
        }
        else if (broj_optuznica) {
            if (reference_array[i].broj_optuznica != null && reference_array[i].broj_optuznica != undefined && parseInt(reference_array[i].broj_optuznica) != 0) {
                return true; 
            }
        }
    }
    return false; // znaci da su svi null
}
function checkBarColorAndSet() {
    if (bar_color == "green") {
        $("#chart_div").hide();
        $("input[type=radio] + label").css({
            "border": "1px solid #5cb85c",
            "background": "#DFFFDF",
            "color": "#116312"
        });
    }
    else if (bar_color == "silver") { defaultSilverColor(); }
}
function appendIkoniceItems(array_one) {
    for (var i = 0; i < (12 - array_one.length) ; i++) {
        var makediv = $('<div class="ikonice">\
                        <p class="textvalue"></p>\
                        <img id="" alt="" class="headerslike" src="" onclick="" />\
                        <div class="txtimg"></div>\
                        </div>');
        $(".isotope").append(makediv);
        $(makediv).hide();

    }
}
function populatingMainArray(this_refference, array_general,reference_array) {
    for (var i = 0; i < reference_array.length; i++) {
        if ($(this_refference).find("img").attr("alt") == reference_array[i].imprezim) {
            inside_main_middle = {}
            inside_main_middle["imprezim"] = reference_array[i].imprezim;
            inside_main_middle["ustedevina"] = reference_array[i].ustedevina;
            inside_main_middle["nekretnine"] = reference_array[i].nekretnine;
            inside_main_middle["placa"] = reference_array[i].placa;
            inside_main_middle["broj_nekretnina"] = reference_array[i].broj_nekretnina;
            inside_main_middle["broj_optuznica"] = reference_array[i].broj_optuznica;

            array_general.push(inside_main_middle);

        }
    }
}
function disableEnableFourCategoriesOnClick(first,second,third,state) {
    $(first).prop('disabled', state);
    $(second).prop('disabled', state);
    $(third).prop('disabled', state);
}
function disableEnableRadioButtons(first, second, third,fourth, state) {
    $(first).prop('disabled', state);
    $(second).prop('disabled', state);
    $(third).prop('disabled', state);
    $(fourth).prop('disabled', state);
}





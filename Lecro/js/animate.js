var img_src;
var pol_name;
var img_alt;
var initobject;
var pos;
var x;
var y;
var width1;
var height1;
var predsjednici = false;


$(document).ready(function () {
    //presidents click
    $("#presidentsicons-wrapper").on("click", ".presidenticons", function () {

        path = $(this).find(".headerslikepres").attr("src");
        if (path == "images/kolinda_grabar_kitarovic.jpg") {
            presidentsProperties("images/kolinda_grabar_kitarovic.jpg", "Kolinda k", "Grabar K.");
            ajaxRequestPerson("Kolinda", "Grabar-Kitarović");
        }
        else if (path == "images/ivo_josipovic.png") {
            presidentsProperties("images/ivo_josipovic.png", "Ivo J", "Josipović I.");
            ajaxRequestPerson("Ivo", "Josipović");

        }
        else if (path == "images/stjepan_mesic.jpg") {
            presidentsProperties("images/stjepan_mesic.jpg", "Stjepan M", "Mesić S.");
            ajaxRequestPerson("Stjepan", "Mesić");
        }
        var inst1 = $.remodal.lookup[$("[data-remodal-id=modal]").data("remodal")]; // pop up box opening
        inst1.open();
    });
    //politicians click
    $(".isotope").on("click", ".ikonice", function () {

        initobject = $(this);
        animateToMiddle(initobject);
        var phpname = img_alt.substr(0, img_alt.indexOf(' ')).trim();
        var phplastname = img_alt.substr(img_alt.indexOf(' '), img_alt.length).trim();
        ajaxRequestPerson(phpname, phplastname);
        ikoniceEnableDisable(true);

    });
});

$(document).on("opened", ".remodal", function () {      //POP UP OPEN
     
    if (path != "images/kolinda_grabar_kitarovic.jpg" && path != "images/ivo_josipovic.png" && path != "images/stjepan_mesic.jpg") {
        predsjednici = false;
        document.getElementsByClassName("popupslike")[0].src = img_src;
        document.getElementsByClassName("popupslike")[0].alt = img_alt;
        document.getElementsByClassName("txtimgpopup")[0].innerHTML = pol_name;

        path = "";
    }
    else {
        predsjednici = true;
        if (path == "images/kolinda_grabar_kitarovic.jpg") img_alt = "Kolinda G. Kitarović";
        else if (path == "images/ivo_josipovic.png") img_alt = "Ivo Josipović";
        else { img_alt = "Stjepan Mesić"; }
        path = "";
    }

    $(".remodal").show();
    $(".ikonica").css("visibility","visible");
    $(this).find(".txtimgpopup").hide();

    //animation on
    if (popupcheck) {
      
        $(".ikonica").animate({  // ovo je problem
            //position: "relative",
            //left: "31%",  
            //top: "0px"

        }, 700, false, function () {

         $(".ikonica").css({
            marginBottom: "0px",
            width: "100%",
            position: "relative",
            left: "0",
            height: "100px",
            textAlign: "center",
            marginBottom: "17px",
            marginRight: "2px",
            zIndex: "1",
            borderRadius: "100px",
            top: "0px",
            visibility:"visible"

            });
        });


        $(".popupslike").animate({                               //image fade in
            width: '150px',
            height: '130px',
            borderRadius: "25px"
        }, 800, false);

    }
    //animation off
    else {
        $(".ikonica").css({
            marginBottom: "0px",
            width: "100%",
            position: "relative",
            left: "0",
            height: "100px",
            textAlign: "center",
            marginBottom: "17px",
            marginRight: "2px",
            zIndex: "1",
            borderRadius: "100px",
            top: "0px",

        });
        $(".popupslike").css({                              
            width: '150px',
            height: '130px',
            borderRadius: "25px"
        });          
    }
    $("#timeline-pre-section").css({                            //timeline container fade in
        visibility: "visible"
    }).hide();
    $("#timeline-pre-section").fadeIn(500);
    document.getElementById("fnname").innerHTML = img_alt;


});
$(document).on("close", ".remodal", function (e)         //POP-UP CLOSE
{
    $('#scrolluptop').hide(); //remove scrolltop button
    clearTimelineArrays();
    $(".timeline").empty(); //clearing timeline elements
    $(".ikonica").css({
        marginBottom: "0px",
        width: "40%",
        position: "relative",
        left: "57%",
        height: "100px",
        textAlign: "center",
        marginBottom: "17px",
        marginRight: "2px",
        zIndex: "1",
        bordeRadius: "100px",
        top: "0px",
        visibility:"hidden"
    });
   
    if (!stats) {
        $("#statistika").css({
            width: "20%",
            height: "23px",
            color: "white",
            backgroundColor: "grey",
            wordWrap: "break-word"
        });

        stats = true;
        $("#statistika").text("Statistika").css("z-index", "999");
    }
    $(".remodal").find(".popupslike").css({
        borderRadius: "75px",
        width: "100px",
        height: "100px"
    }, 1);
    $(".remodal").find(".popupslike").prop("src", "");
    $(this).find(".txtimgpopup").fadeIn(1);
    $(this).hide();
    $(initobject).show();

    if (predsjednici == false && middlecheck) {
        $(initobject).animate({                                //move image back                               
            position: "relative",
            left: x,
            top: y,
            zIndex: "1"

        });
    }
    ikoniceEnableDisable(false);
   
});

//FUNCTION BEGIN
function ikoniceEnableDisable(state) {
    $('.ikonice').each(function () {
        $(this).prop("disabled", state);
    });
}
function animateToMiddle(element) {

    var selectedIndex = $(element).index();
    var makedive;

    var sel1 = document.getElementsByClassName('headerslike');
    var option1 = sel1[selectedIndex];
    img_src = option1.getAttribute('src');
    var sel2 = document.getElementsByClassName('txtimg');
    pol_name = sel2[selectedIndex].innerHTML;
    var sel3 = document.getElementsByClassName('headerslike');
    var option3 = sel3[selectedIndex];
    img_alt = option3.getAttribute('alt');

    if (middlecheck) {
        makedive = $('<div></div>');
        $(makedive).css({
            position: "relative",
            left: ($(".isotope").width() / 2) - 50,
            top: (window.outerHeight / 2) - 6,
            zIndex: "999",
            borderRadius: "75px",
            width: "90px",
            height: "90px",
            border: "1px solid black",
            boxShadow: "10px 10px 5px #888888"
        });
        $(makedive).appendTo(".isotope").hide().fadeIn(1000);
        $(element).css("z-index", "2");

        pos = $(element).position();
        x = pos.left;                                             //get image position
        y = pos.top;

        $(element).animate({                                   //moving image to center                                 
            position: "relative",
            left: ($(".isotope").width() / 2) - 43,               // floating decimal point going on factorial and later limes...
            top: (window.outerHeight / 2),
            zIndex: "999",

        }, 1200, function () {
            $(makedive).remove();
            var inst = $.remodal.lookup[$("[data-remodal-id=modal]").data("remodal")]; // pop up box opening
            inst.open();
            inst.close();
        });
    }
    else {
       
        var inst = $.remodal.lookup[$("[data-remodal-id=modal]").data("remodal")]; // pop up box opening
        inst.open();
        inst.close();
    }
}
function clearTimelineArrays() {
    //timeline arrays
    prikazi_sve = [];
    obiljezja = [];
    optuznice = [];
    novac = [];
    //za prikazi sve
    podaci_date = [];
    podaci_url = [];
    //za ostalo
    podaci_date_obiljezja = [];
    podaci_url_obiljezja = [];
    podaci_date_optuznice = [];
    podaci_url_optuznice = [];
    podaci_date_novac = [];
    podaci_url_novac = [];
    podaci_heading = [];
    $("#lab-three input").prop('checked', true);
}
function ajaxRequestPerson(first_name, second_name) {
    $.ajax({
        url: 'http://projectsgono.com/lecro/lecrotime.php',
        type: 'POST',
        data: { 'name': first_name, 'lastname': second_name },
        dataType: "json",
        success: function (response) {
            if (response == null) { if (english_lang_selected) { alert("Unable to get data"); } else { alert("Dohvat podataka neuspješan"); } }  //set css margin url timeline here inside the if
            else {
                for (var i = 0; i < response.length; i++) {

                    if (response[i].radoviPostupciAktivnost != null) {
                        prikazi_sve.push(response[i].radoviPostupciAktivnost);

                        obiljezja.push(response[i].radoviPostupciAktivnost); // tu se vec nalazi novac samo treba kopiju napraviti ukoliko se nalazi u Tablicu novac i staviti kolki je iznos
                        podaci_date_obiljezja.push(response[i].datum);
                        podaci_url_obiljezja.push(response[i].url);
                    }
                    if (response[i].prijedloziPodrska != null) {
                        prikazi_sve.push(response[i].prijedloziPodrska);

                        obiljezja.push(response[i].prijedloziPodrska);
                        podaci_date_obiljezja.push(response[i].datum);
                        podaci_url_obiljezja.push(response[i].url);
                    }
                    if (response[i].otpuznice != null) {
                        prikazi_sve.push(response[i].otpuznice);

                        optuznice.push(response[i].optuznice);
                        podaci_date_optuznice.push(response[i].datum);
                        podaci_url_optuznice.push(response[i].url);
                    }

                    podaci_date.push(response[i].datum);
                    podaci_url.push(response[i].url);
                    podaci_heading.push(response[i].naslov);

                   
                    //tu stavi novac --> if obiljezja1[i].contains(number sign;example:kn,$,€ itd.){novac[i]=obiljezja1[i]} then add it to novac array if obiljezja2[i].contains(number sign;example:kn,$,€ itd.){novac[i]=obiljezja1[i]} 

                }
                //timeline start prikazi_sve by default
                $('.dropping-years').empty();
                populateDropDownDate(podaci_date);
                $(".timeline").empty();
                populateTimeline(prikazi_sve, podaci_date, podaci_url, 0, podaci_heading,false);
            }

        },
        error: function (xhr, ajaxOptions, thrownError) {
        }
    });
}
//FUNCTION END

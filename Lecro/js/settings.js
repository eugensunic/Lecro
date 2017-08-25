//background squares on click - color
$(document).ready(function () {

    windowsize = $(window).width();
    checkMiddleIcon(windowsize); //check if windowsize is tablet size, if yes, disable animation of the middle icon.
    $(".background-squares").on("click", function () {
        $("body").css("background-color", getBackgroundColor($(this).css('backgroundColor')));
    });
    //ON CLICK EVENTS BEGIN
    //----------------------------------------------------------
    // click on vertical category items
    //$("#left_side_bar .dropdown li").click(function () {
    //    alert();
    //});
    //pop-up box
    $('#fancy-checkbox-primary').change(function () {
        if ($(this).is(":checked")) {
            popupcheck = true;
        }
        else {
            popupcheck = false;
        }
    });
    //middle icons
    $('#fancy-checkbox-info').change(function () {
        if ($(this).is(":checked")) {
            middlecheck = true;
        }
        else {
            middlecheck = false;
        }
    });
    //isotope effect
    $('#fancy-checkbox-warning').change(function () {
        if ($(this).is(":checked")) {
            isotopetime = "0.5s";
        }
        else {
            isotopetime = "0s";
        }
    });
    //border yes-no click
    $('#border-settings').find(".btn-primary").click(function () {
        $(".isotope").css({
            "border": "2px solid #808080",
            "border-radius": "3px"
        });
        $(".trending-icons").css("border", "1px solid grey");
    });
    $('#border-settings').find(".btn-default").click(function () {
        $(".isotope").css("border", "none");
        $(".trending-icons").css("border", "none");
    });
    //category vertical-horizontal click
    $('#category-section').find(".btn-primary").click(function () {
        horizontal_vertical = false;

        //horizontal part
        if ($(".trending-icons").is(':hidden')) {
            $('.trending-icons').fadeIn(200);
            $('#arrow-left').hide();
        }
        if ($("#left_side_bar").is(':visible')) {
            leftBarClose();
            $('#arrow-left').hide();
        }

    });
    $('#category-section').find(".btn-default").click(function () {
        horizontal_vertical = true;

        //vertical part
        if ($("#arrow-left").is(':hidden')) {
            $('.trending-icons').fadeOut(200);
            $('#arrow-left').fadeIn(200);
        }
    });
    //timeline yes-no
    $('.timeline-section').find(".btn-primary").click(function () {
        //vertical part
    });
    $('.timeline-section').find(".btn-default").click(function () {
        //horizontal part
    });
    $("#close-settings-div").click(function () {
        closeSettings();
    });
    //arrow-left2 se odnosi na settings plavi trokut
    $("#arrow-left2").click(function () {

        if ($(".left-top-settings").css('visibility') === 'hidden') {
            showPartOfSettings();
            
        }
        $(this).fadeOut(200);
    });
    $("#icon-animation").click(function () {

        if ($("#animation-settings").is(':hidden')) {
            animationSettingsShow();
        }
        else {
            animationSettingsHide();
            if (ifAllSettingsHidden()) {
                $("#arrow-left2").show();
                $("#close-settings-div").hide();
                $(".container").css("border", "none");
                $(".left-top-settings").css("visibility", "hidden"); //mora jer su dva containera
            }
        }
    });
    // back-color dropdown settings click
    $("#back-color").click(function () {

        if ($("#squares").is(':hidden')) {
           
            backColorSettingsShow();
           
        }
        else {
            backColorSettingsHide();
            if (ifAllSettingsHidden()) {
                $("#arrow-left2").show();
                $("#close-settings-div").hide();
                $(".container").css("border", "none");
                $(".left-top-settings").css("visibility", "hidden");
            }
        }

    });
    //settings on-click (language, timeline, category)
    $("#language-but").click(function () {
        languageFunction();
        if (windowsize <= 1483) {
           
            if (resizelang) {
                $("#lang-section").appendTo("#container-num2");
                $("#lang-section").css({
                    marginLeft: "10px",
                    display: "inline"

                });
                $("#lang-section").find("img").css({
                    display: "inline-block",
                    marginBottom: "0px"
                });
            }
        }
        else {
            if (resizelang) {
                $("#lang-section").appendTo("#box-section");
                $("#lang-section").attr('id', 'lang-section');
            }

        }
    });
    $("#timeline-but").click(function () {

       
        timelineFunction();
        if (windowsize <= 1483) {

            if (resizetime) {
                $(".timeline-section").appendTo("#container-num2"); //on zapravo samo transfer napravi, cudno ali ok
                $(".timeline-section").css({
                    position: "relative",
                    rigth: "0px",
                    marginTop: "30px",
                    display: "block"
                });
            }

        }
        else {
            if (resizetime) {
                $(".timeline-section").appendTo("#box-section");
                $(".timeline-section").attr('id', 'timeline-section');
            }

        }
    });
    $("#category-but").click(function () {
        categoryFunction();
    });
    // trending icons on-hover //you could solve this with css but leave it as it is
    $("#trending").mouseenter(function () {
        trendingIconsHover("trending-text");
    });
    $("#croatian-parliament").mouseenter(function () {
        trendingIconsHover("croatian-text");
    });
    $("#euro-parliament").mouseenter(function () {
        trendingIconsHover("euro-text");
    });
    $("#everyone").mouseenter(function () {
        trendingIconsHover("everyone-text");
    });
    $("#trending").mouseleave(function () {
        $("#trending-text").hide();
    });
    $("#croatian-parliament").mouseleave(function () {
        $("#croatian-text").hide();
    });
    $("#euro-parliament").mouseleave(function () {
        $("#euro-text").hide();
    });
    $("#everyone").mouseleave(function () {
        $("#everyone-text").hide();
    });
    $("#close_left_bar").click(function () {
        leftBarClose();
    });
    $("#arrow-left").click(function () {
        leftBarOpen();
    });

    $(window).resize(function () {
        //alert(windowsize); //na 2133 je sve ok

        windowsize = $(window).width(); //windowsize includes scrollbar
        //adjusting chart_div
        var isotope_height = $(".isotope").height();
        var isotope_width = $(".isotope").width() + 12;
        $("#chart_div").css({
            width: isotope_width,
            height: isotope_height
        });
        drawBasic(drzavnici_main_middle);
        checkMiddleIcon(windowsize); //check if windowsize is tablet size, if yes, disable animation of the middle icon.
        if (windowsize <= 1483) {
            //ovo bi trebalo u if ali navodno je neki bug sa visiblityima..
            //alert("ovo ne smije pisati");
            //dakle samo kad su checkboxi prikazani zato je uvijek true
            if (resizecat) {

                $(".trending-icons").show();
                $("#category-section").hide();
                $("#arrow-left").hide();
                $("#fifth-check").hide();
                $("#left_side_bar").hide();
                $("#close_left_bar").hide();
            }

            if (resizetime) {
                $(".timeline-section").appendTo("#container-num2"); //on zapravo samo transfer napravi, cudno ali ok
                $(".timeline-section").css({
                    position: "relative",
                    rigth: "0px",
                    marginTop: "30px",
                    display: "block"
                });
            }
            if (resizelang) {
                $("#lang-section").appendTo("#container-num2");
                $("#lang-section").css({
                    marginLeft: "10px",
                    display: "inline"
                });
                $("#lang-section").find("img").css({
                    display: "inline-block",
                    marginBottom: "0px"
                });
            }
        }
        else {

            if (resizecat) {
                //tu je problem
                $("#category-section").show();
                if (horizontal_vertical) //vertical
                {
                    $("#left_side_bar").hide();
                    $("#close_left_bar").hide();
                    $("#arrow-left").show();
                    $(".trending-icons").hide();
                }
                else { //horizontal
                    $("#arrow-left").hide();
                    $(".trending-icons").show();
                }
                $("#fifth-check").show();
            }
            if (resizetime) {
                $(".timeline-section").appendTo("#box-section");
            }

            if (resizelang) {
                $("#lang-section").appendTo("#box-section");
            }
        }
    });
});
//ON CLICK EVENTS END
//----------------------------------------------------------
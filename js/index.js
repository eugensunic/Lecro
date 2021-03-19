//isotope original or number sort
function isNumisOrg(val1, val2) {
  num_sort = val1;
  original_sort = val2;
}
//sorting isotope depending on input
function isotopeSort(value, asc_dsc, transition_time) {
  $container.isotope('reloadItems').isotope({
    sortBy: value,
    sortAscending: asc_dsc,
    transitionDuration: transition_time
  });
}
//check if all settings are hidden
function ifAllSettingsHidden() {
  if ($('#animation-settings').is(':visible') && $('#squares').is(':visible')) {
    return false;
  }
  return true;
}
function getBackgroundColor(colorval) {
  var parts = colorval.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
  delete parts[0];
  for (var i = 1; i <= 3; ++i) {
    parts[i] = parseInt(parts[i]).toString(16);
    if (parts[i].length == 1) parts[i] = '0' + parts[i];
  }
  color = '#' + parts.join('');
  return color;
}
function checkMiddleIcon(winsize) {
  if (winsize < 767) {
    middlecheck = false;
    $('#fancy-checkbox-info').prop('checked', false);
    $('#fancy-checkbox-info').attr('disabled', true);
  } else {
    if ($('#fancy-checkbox-info').checked) {
      $('#fancy-checkbox-info').removeAttr('disabled');
      $('#fancy-checkbox-info').attr('disabled', false);
      $('label[for="fancy-checkbox-info"]').prop('checked', false);
    } else {
      middlecheck = true;
      $('#fancy-checkbox-info').attr('disabled', false);
      $('#fancy-checkbox-info').prop('checked', true);
      $('label[for="fancy-checkbox-info"]').prop('checked', true);
    }
  }
}
//--------------------------------------------------------------------------------------------------------
function closeSettings() {
  $('#first-check').hide();
  $('#second-check').css('display', 'none');
  //$("#third-check").css("display", "none");
  $('.container').css('border', 'none');
  //$(".left-top-settings").hide();
  $('#animation-settings').hide();
  $('#border-settings').hide();
  $('#squares').hide();

  $('#close-settings-div').hide();

  $('#arrow-left2').show();
  $('#container-num2').css('visibility', 'hidden');
  $('.left-top-settings').css('visibility', 'hidden');

  //----------------------------------------
}
//hiding objects on document.ready
function closeSettingsAtAppStart() {
  $('#uk-lang').css('opacity', '0.5'); // fade uk language
  $('#lab-two').css('margin-left', '-11px'); // timeline adjusting URL
  $('#first-check').hide();
  $('#second-check').hide();
  $('#third-check').show();
  $('#fourth-check').hide();
  $('#fifth-check').hide();
  $('.container').css('border', 'none');
  $('.left-top-settings').css('visibility', 'hidden');
  $('#animation-settings').hide();
  $('#border-settings').hide();
  $('#squares').hide();
  $('#lang-section').show();
  $('.timeline-section').hide();
  $('#category-section').hide();
  $('#close-settings-div').hide();

  $('#left_side_bar').hide();
  $('#close_left_bar').hide();

  $('#Radio0').hide(); //Original button hide
  $('#expand-chart').hide();

  $('#chart_div').hide();
  $('#switch-chart').hide();
  $('.trending-icons > p').hide();

  $('#arrow-left').hide();
  selectSettingsCheckbox();
  languageLabelSet();
}
function languageLabelSet() {
  $('.onoffswitch-inner').attr('data-content1', 'Sortiraj');
  $('.onoffswitch-inner').attr('data-content2', 'Graf');
}
function selectSettingsCheckbox() {
  $('#fancy-checkbox-warning').prop('checked', true);
  $('#fancy-checkbox-info').prop('checked', true);
  $('#fancy-checkbox-primary').prop('checked', true);
}

// on arrow-left2 (blue arrow for settings) show objects
function showPartOfSettings() {
  $('#container-num2').css('visibility', 'visible');
  $('#first-check').show();
  $('#second-check').show();
  $('#animation-settings').show();
  $('#border-settings').show();
  $('#squares').show();
  $('#container-num2').css('border', '1px solid black');
  $('.left-top-settings').css('visibility', 'visible');

  $('#close-settings-div').show();
}
function animationSettingsShow() {
  $('html, body').animate({ scrollTop: $(document).height() - $(window).height() }); //scroll to bottom of page
  $('#animation-settings').fadeIn(200);
  $('#border-settings').fadeIn(200);
  $('#first-check').show();
  $('#close-settings-div').show();
  $('#arrow-left2').hide();
  $('#container-num2').css('border', '1px solid black');
  $('.left-top-settings').css('visibility', 'visible');
  $('#border-settings').show();
  $('#container-num2').css('visibility', 'visible');
}
function animationSettingsHide() {
  $('#animation-settings').fadeOut(200);
  $('#border-settings').fadeOut(200);
  $('#first-check').css('display', 'none');
}
function backColorSettingsShow() {
  $('html, body').animate({ scrollTop: $(document).height() - $(window).height() }); //scroll to bottom of page
  $('#squares').fadeIn(200);
  $('#second-check').show();
  $('#close-settings-div').show();
  $('#arrow-left2').hide();
  $('#container-num2').css('border', '1px solid black');
  $('.left-top-settings').css('visibility', 'visible');
  $('#border-settings').show();
  $('#container-num2').css('visibility', 'visible');
}
function backColorSettingsHide() {
  $('#squares').fadeOut(200);
  $('#second-check').css('display', 'none');
}
//on button  click
function languageFunction() {
  if ($('#lang-section').is(':hidden')) {
    $('#third-check').show();
    resizelang = true;
    $('#lang-section').fadeIn(200);
  } else {
    resizelang = false;
    $('#lang-section').hide();
    $('#third-check').hide();
  }
}
//on button timeline click
function timelineFunction() {
  if ($('.timeline-section').is(':hidden')) {
    $('#fourth-check').show();
    resizetime = true;
    $('.timeline-section').fadeIn(200);
  } else {
    resizetime = false;
    $('.timeline-section').hide();
    $('#fourth-check').hide();
  }
}
//on button category click
function categoryFunction() {
  if ($('#category-section').is(':hidden')) {
    $('#fifth-check').show();
    resizecat = true;
    $('#category-section').fadeIn(200);
  } else {
    resizecat = false;
    $('#category-section').hide();
    $('#fifth-check').hide();
    $('#arrow-left').hide();
    $('.trending-icons').show();
  }
}
//on trending icons (4 icons) click
function trendingIconsHover(ID) {
  //ovo sa css
  $('#' + ID).show();
}
function switchChartOption(val1, val2, val3, val4) {
  $('#switch-chart').text(val3);
  graphtitlePieColumn(val4, val1, val2);
  $('.maincheckbox').each(function() {
    if ($(this).is(':checked')) {
      drawBasic(drzavnici_main_middle);
    }
  });
}
function presidentsProperties(first, second, third) {
  document.getElementsByClassName('popupslike')[0].src = first;
  document.getElementsByClassName('popupslike')[0].alt = second;
  document.getElementsByClassName('txtimgpopup')[0].innerHTML = third;
}
function originalButtonShow() {
  if ($('#Radio0').length > 0) {
    $('#Radio0').show();
  }
}
function defaultSilverColor() {
  $('input[type=radio] + label').css({
    border: '1px solid #ccc',
    background: '#efefef',
    color: '#aaa',
    'border-radius': '4px',
    'text-shadow': '1px 1px 0 rgba(0,0,0,0)'
  });
}
function defaultGreenColor() {
  $('input[type=radio] + label').css({
    border: '1px solid #5cb85c',
    background: '#DFFFDF',
    color: '#116312'
  });
}
function changeLabelColorSilver(label_argument) {
  $('label[for=' + label_argument + ']').css({
    background: '#777',
    border: '1px solid #444',
    'text-shadow': '1px 1px 0 rgba(0,0,0,0)',
    color: 'white'
  });
}
function changeLabelColorGreen(label_argument) {
  $('label[for=' + label_argument + ']').css({
    border: '1px solid #5cb85c',
    background: 'green',
    color: 'white',
    'text-shadow': '1px 1px 0 rgba(0,0,0,0)'
  });
}
function unCheckFive() {
  $('#Radio1').prop('checked', false);
  $('#Radio2').prop('checked', false);
  $('#Radio3').prop('checked', false);
  $('#Radio4').prop('checked', false);
  $('#Radio5').prop('checked', false);
}
function checkboxClicked(val1, val2, val3, val4, val5) {
  ustedevina = val1;
  nekretnine = val2;
  placa = val3;
  broj_nekretnina = val4;
  broj_optuznica = val5;
}
function graphtitlePieColumn(graphtit, pie, column) {
  graph_title = graph_title;
  pie_chart = pie;
  column_chart = column;
}
function leftBarClose() {
  $('#left_side_bar').hide('slide', { direction: 'right' }, 500);
  $('#close_left_bar').fadeOut(400);
  $('#arrow-left').fadeIn(600);
}
function leftBarOpen() {
  $('#left_side_bar').show('slide', { direction: 'right' }, 600);
  $('#close_left_bar').fadeIn(650);
  $('#arrow-left').fadeOut(400);
}
function getCategoryPeople(array, source, array_names0) {
  $('.ikonice').each(function(i, obj) {
    if (i < array_names0.length) {
      $(this)
        .find('.txtimg')
        .text(array_names0[i].newnames.substring(array_names0[i].newnames.indexOf(' ') + 1, array_names0[i].newnames.length) + ' ' + array_names0[i].newnames[0] + '.');
      $(this)
        .find('img')
        .attr({
          alt: array_names0[i].newnames,
          src: source + array[i] + '.jpg'
        });
    }
  });
}
function getCategoryPeopleAtStart() {
  //just fetchin the img src values... you should also fetch the rest...
  var arrayintern = [];
  $('.ikonice').each(function(i, obj) {
    arrayintern[i] = $(this)
      .find('img')
      .attr('src');
    arrayintern[i] = arrayintern[i].substring(7, arrayintern[i].indexOf('.'));
  });
  return arrayintern;
}

function createClosure(myvar, myarray, source2, array_names) {
  $('.trending-icons > img').each(closure(myvar, myarray, source2, array_names));
}

function closure(storedVariable, array, source2, array_names) {
  // da izbjegnem visak ifova
  var someVar = storedVariable;
  var array5 = [];
  array5 = array;
  var array6 = [];
  array6 = array_names;
  return function(index, element) {
    if ($(element).prop('alt') == someVar) {
      getCategoryPeople(array5, source2, array6);
    }
  };
}
function removeTrendingIconDesign() {
  $('.trending-icons > img').each(function(i, obj) {
    if ($(this).hasClass('trend-add')) {
      $(this).removeClass('trend-add');
    }
  });
}
function checkIfSafariAndSet() {
  if (!!navigator.userAgent.match(/Version\/[\d\.]+.*Safari/)) {
    $('#container-num1').css('box-shadow', ' rgba(0,0,0,0.8) 0 0 10px');
    $('.ikonice').css({
      borderRadius: '75px',
      border: '0px solid grey'
    });
    $('.headerslike').css({
      borderRadius: '75px',
      border: '0px solid grey'
    });
    $('.headerslikepres').css({
      borderRadius: '75px',
      border: '0px solid grey'
    });
    $('.presidentsicons').css({
      borderRadius: '75px',
      border: '0px solid grey'
    });
    $('#zmin').css({
      border: '0px solid grey'
    });
    //set margin
  }
}
//.timeline-section
//#category-section
//#lang-section

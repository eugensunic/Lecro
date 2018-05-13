$(document).ready(function() {
  //animate pop-up window up
  var showupimage = false;
  $('.remodal-wrapper').scroll(function() {
    if ($(this).scrollTop() > 300) {
      //    $('#scrolluptop').show();
      //    $('#scrolluptop').css({
      //    position: absolute,
      //    right:"30px",
      //    bottom:"25px",
      //})
    } else {
      if (showupimage) {
        showupimage = false;
        $('#scrolluptop').hide();
      }
    }
  });

  $('#scrolluptop').click(function() {
    $('.remodal-wrapper').animate(
      {
        scrollTop: 0
      },
      600
    );
    $('#scrolluptop').hide();
    //return false;
  });
  $('#lab-one input').prop('checked', true);
  $('#lab-two input').prop('checked', true);
  $('#lab-three input').prop('checked', true);

  $('.timeline').on('click', '.year', function() {
    var indexofli = $(this)
      .parent()
      .children()
      .index(this);

    if (
      $('.timeline li')
        .eq(indexofli + 1)
        .is(':hidden')
    ) {
      while (true) {
        indexofli++;
        $('.timeline li')
          .eq(indexofli)
          .show();
        if (
          indexofli >
          $('.timeline li')
            .last()
            .index()
        ) {
          break;
        }
        var temp_li = $('.timeline li')
          .eq(indexofli)
          .attr('class')
          .toString()
          .trim();
        if (temp_li == 'year') {
          break;
        }
      }
    } else {
      while (true) {
        indexofli++;
        if (
          indexofli >
          $('.timeline li')
            .last()
            .index()
        ) {
          break;
        }
        var temp_li = $('.timeline li')
          .eq(indexofli)
          .attr('class')
          .toString()
          .trim();
        if (temp_li == 'year') {
          break;
        }
        $('.timeline li')
          .eq(indexofli)
          .hide();
      }
    }
  });

  //blue button clicked
  $('#prikazi-sve').click(function() {
    $('.dropping-years').empty();
    populateDropDownDate(podaci_date);
    $('.timeline').empty();
    populateTimeline(prikazi_sve, podaci_date, podaci_url);
    $('.event').css('border-color', 'rgb(223, 224, 228)');
  });
  //green button clicked
  $('#obiljezja').click(function() {
    $('.dropping-years').empty();
    populateDropDownDate(podaci_date_obiljezja);
    $('.timeline').empty();
    populateTimeline(obiljezja, podaci_date_obiljezja, podaci_url_obiljezja);
    $('.event').css({
      borderColor: '#419641',
      borderRadius: '2px'
    });
  });
  //yellow button clicked
  $('#optuznice').click(function() {
    $('.dropping-years').empty();
    populateDropDownDate(podaci_date_optuznice);
    $('.timeline').empty();
    populateTimeline(optuznice, podaci_date_optuznice, podaci_url_optuznice);
    $('.event').css({
      borderColor: '#B63C39',
      borderRadius: '2px'
    });
  });
  //red button clicked
  $('#novac').click(function() {
    $('.dropping-years').empty();
    populateDropDownDate(podaci_date_novac);
    $('.timeline').empty();
    populateTimeline(novac, podaci_date_novac, podaci_url_novac);
    $('.event').css({
      borderColor: '#B63C39',
      borderRadius: '2px'
    });
  });

  $('#statistika').click(function() {
    if (stats) {
      $(this).animate(
        {
          width: '100%',
          height: '100px',
          backgroundColor: '#f4f4f4'
        },
        function() {
          stats = false;
          $(this).text('');
        }
      );
    } else {
      $(this).animate(
        {
          width: '20%',
          height: '23px',
          backgroundColor: 'gray'
        },
        function() {
          stats = true;
          $(this).text('Statistika');
        }
      );
    }
  });
  $('.dropping-years').on('change', function() {
    var constant_top_offset = 380;
    $('.timeline li').each(function(index, value) {
      if (
        $('.dropping-years option:selected')
          .text()
          .trim() ==
        $('.timeline li')
          .eq(index)
          .text()
          .trim()
      ) {
        var pos_li = $('.timeline li')
          .eq(index)
          .position();
        $('.remodal-wrapper').animate({ scrollTop: pos_li.top }, 700, function() {
          showupimage = true;
        });
        if ($('.dropping-years')[0].selectedIndex != 0) {
          $('#scrolluptop').show();
          $('#scrolluptop').css({
            position: 'absolute',
            top: pos_li.top + constant_top_offset
          });
          $('.dropping-years').text(''); // da se izbrise
          populateDropDownDate(podaci_date);
        }
        return false;
      }
    });
  });
  //heading change
  $('#lab-one input').change(function() {
    if ($(this).is(':checked')) {
      $('.heading-timeline').show();
      $('.heading-response').show();
    } else {
      $('.heading-timeline').hide();
      $('.heading-response').hide();
    }
  });
  //url change
  $('#lab-two input').change(function() {
    if ($(this).is(':checked')) {
      $('.url-timeline').show();
      $('.url-response').show();
    } else {
      $('.url-timeline').hide();
      $('.url-response').hide();
    }
  });
  //post order change
  $('#lab-three input').change(function() {
    if ($(this).is(':checked')) {
      $('.timeline').empty();
      $('.dropping-years').empty();
      populateTimeline(prikazi_sve, podaci_date, podaci_url, 0, podaci_heading, false);
      populateDropDownDate(podaci_date);
    } else {
      $('.timeline').empty();
      $('.dropping-years').empty();
      populateTimeline(prikazi_sve, podaci_date, podaci_url, 0, podaci_heading, true);
      populateDropDownDate(podaci_date);
    }
  });
});

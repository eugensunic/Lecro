var selected_item = '';
var text_between = '';
var alt_atb = '';
var sortedItems;
var first_name;
var last_name;

$(document).ready(function() {
  $('.typeahead').on('typeahead:selected', function(obj, obj_value) {
    drzavnici_main_middle = [];
    var drzavnici_copy_copy = [];

    for (var i = 0; i < drzavnici_copy.length; i++) {
      drzavnici_copy_copy.push(drzavnici_copy[i]);
    }

    if (filter_all) {
      setObjectAttributes(obj_value);
    }
    if (filter_cro) {
      setObjectAttributes(obj_value.newnames);
    }

    drzavnici_main_middle = populateMainMiddleObjectArray(drzavnici);
    selected_item = removeDiacritics(selected_item); //because of the object image

    //making the div BEGIN
    //-----------------------------------------------------------------------------------------------------------------------
    for (var i = 0; i < drzavnici.length; i++) {
      if (drzavnici[i].ime.trim() == first_name.trim() && drzavnici[i].prezime.trim() == last_name.trim()) {
        //ivana maletic ne radi ocito zbog spellinga

        drzavnici_main_middle.splice(
          0,
          0, //ulazak typehead objekta unutra.
          {
            ime: first_name,
            prezime: last_name,
            imprezim: first_name + ' ' + last_name, //mora se poklapati sa inicijalnim vrijednostima  znaci mora biti tu imprezim jer je i tam
            ustedevina: drzavnici[i].ustedevina,
            nekretnine: drzavnici[i].nekretnine,
            placa: drzavnici[i].placa,
            broj_nekretnina: drzavnici[i].broj_nekretnina,
            broj_optuznica: drzavnici[i].broj_optuznica
          }
        );
      }
    }
    var makediv = $(
      '<div class="ikonice">\
                        <p class="textvalue"></p>\
                        <img id="isuk" alt="" class="headerslike" src="" onclick="" />\
                        <div class="txtimg"></div>\
                        </div>'
    );

    $(makediv)
      .find('img')
      .attr({
        alt: alt_atb,
        src: 'images/' + selected_item + '.jpg'
      });

    $(makediv)
      .find('.txtimg')
      .text(text_between);
    if (bar_color == 'silver') {
      if (ustedevina) {
        $(makediv)
          .find('.textvalue')
          .text(drzavnici_main_middle[0].ustedevina);
      } else if (nekretnine) {
        $(makediv)
          .find('.textvalue')
          .text(drzavnici_main_middle[0].nekretnine);
      } else if (placa) {
        $(makediv)
          .find('.textvalue')
          .text(drzavnici_main_middle[0].placa);
      } else if (broj_nekretnina) {
        $(makediv)
          .find('.textvalue')
          .text(drzavnici_main_middle[0].broj_nekretnina);
      } else if (broj_optuznica) {
        $(makediv)
          .find('.textvalue')
          .text(drzavnici_main_middle[0].broj_optuznica);
      } else {
        isNumisOrg(false, true); //original state
      }
    } else {
      isNumisOrg(false, true);
    }

    if (num_sort) {
      $('.isotope')
        .prepend(makediv)
        .isotope('reloadItems')
        .isotope({
          sortBy: 'number'
        });
    } else if (original_sort) {
      $('.isotope')
        .prepend(makediv)
        .isotope('reloadItems')
        .isotope({
          sortBy: 'original-order'
        });
      $('.textvalue').hide();
    }
    // making the div END
    //-----------------------------------------------------------------------------------------------------------------------
    //pronalazk minimalne vrijednost na osnovu osnovnog min-max algoritma
    var min = 10000000; // ne moze biti veci od tog broja
    var secondmin = 10000000; //
    var indextofind = 0;

    if (num_sort) {
      //sredivanje pomocu algoritma
      $('.isotope > .ikonice').each(function(i, obj) {
        if (
          parseInt(
            $(obj)
              .find('.textvalue')
              .text()
              .trim()
          ) < min
        ) {
          secondmin = min;
          min = parseInt(
            $(obj)
              .find('.textvalue')
              .text()
              .trim()
          );
        } else if (
          parseInt(
            $(obj)
              .find('.textvalue')
              .text()
              .trim()
          ) < secondmin
        ) {
          secondmin = parseInt(
            $(obj)
              .find('.textvalue')
              .text()
              .trim()
          );
        }
      });

      $('.isotope > .ikonice').each(function(i, obj) {
        if (
          secondmin ==
          parseInt(
            $(obj)
              .find('.textvalue')
              .text()
              .trim()
          )
        ) {
          indextofind = i;
        }
      });

      //prva kombinacija
      $('.isotope > .ikonice').each(function(i, obj) {
        if (
          parseInt(
            $(obj)
              .find('.textvalue')
              .text()
              .trim()
          ) == min &&
          $(obj)
            .find('img')
            .attr('alt') != alt_atb
        ) {
          // and ako nije upravo dodan (bas taj koji se dodaje) uglavnom nemoze nikako eleminatri novog to je to nakon and-a

          if (filter_all) {
            drzavnici_main_middle.splice(i, 1);
            drzavnici_copy_copy.push(
              $(this)
                .find('img')
                .attr('alt')
            ); //ulazak typehead objekta unutra.
            $(this).remove(); //this se odnosi na minimalni broj (ikona s najmanjom vrijednošću)
            isotopeSort('number', false, '0.5s');
            return false;
          } else if (filter_cro) {
            drzavnici_main_middle.splice(i, 1);
            for (var i = 0; i < drzavnici.length; i++) {
              if (
                drzavnici[i].imprezim.trim() ==
                $(this)
                  .find('img')
                  .attr('alt')
                  .trim()
              ) {
                inner_drzavnici = {};
                inner_drzavnici['newnames'] = drzavnici[i].imprezim;
                drzavnici_cro.push(inner_drzavnici);
              }
            }
            drzavnici_cro.push(); //ulazak typehead objekta unutra.
            $(this).remove(); //this se odnosi na minimalni broj (ikona s najmanjom vrijednošću)
            isotopeSort('number', false, '0.5s');
            return false;
          }
        } else if (
          parseInt(
            $(obj)
              .find('.textvalue')
              .text()
              .trim()
          ) < secondmin
        ) {
          //druga kombinacija
          if (filter_all) {
            drzavnici_main_middle.splice(indextofind, 1);
            drzavnici_copy_copy.push(
              $(this)
                .find('img')
                .attr('alt')
            ); //ulazak typehead objekta unutra.
          } else if (filter_cro) {
            drzavnici_main_middle.splice(indextofind, 1);
            for (var i = 0; i < drzavnici.length; i++) {
              if (
                drzavnici[i].imprezim.trim() ==
                $(this)
                  .find('img')
                  .attr('alt')
                  .trim()
              ) {
                inner_drzavnici = {};
                inner_drzavnici['newnames'] = drzavnici[i].imprezim;
                drzavnici_cro.push(inner_drzavnici);
              }
            }
          }
          $('.ikonice')
            .eq(indextofind)
            .remove();
          isotopeSort('number', false);
          return false;
        }
      });
    } else if (original_sort) {
      if (filter_cro) {
        for (var i = 0; i < drzavnici.length; i++) {
          if (
            drzavnici[i].imprezim.trim() ==
            $('.isotope > .ikonice')
              .eq(12)
              .find('img')
              .attr('alt')
              .trim()
          ) {
            inner_drzavnici = {};
            inner_drzavnici['newnames'] = drzavnici[i].imprezim;
            drzavnici_cro.push(inner_drzavnici);
          }
        }
      }
      if (filter_all) {
        drzavnici_copy_copy.push(obj_value);
      }
      $('.isotope > .ikonice')
        .eq(12)
        .remove();
      drzavnici_main_middle.pop();

      drawBasic(drzavnici_main_middle); //jedino se i crta graf na original_sort zato se samo u ovom djelu drawBasic nalazi
    }
    $('.typeahead').typeahead('destroy');
    drzavnici_middle_copy = [];
    if (filter_all) {
      adjustMidlleIconsForTypeaheadAllPoliticians(drzavnici_middle_copy, drzavnici_copy_copy);
      var initialtypeahead = new Bloodhound({
        datumTokenizer: function(data) {
          return Bloodhound.tokenizers.whitespace(data);
        },
        queryTokenizer: Bloodhound.tokenizers.whitespace,
        local: drzavnici_copy_copy
      });
      initialtypeahead.initialize();
      typeaheadPopulateFieldsOnReady('drzavnici_copy_copy', initialtypeahead);
    }
    if (filter_cro) {
      adjustMidlleIconsForTypeaheadCroPoliticians(drzavnici_middle_copy, drzavnici_cro);
      var initialtypeahead = new Bloodhound({
        datumTokenizer: function(data) {
          return Bloodhound.tokenizers.whitespace(data.newnames);
        },
        queryTokenizer: Bloodhound.tokenizers.whitespace,
        local: drzavnici_cro
      });
      initialtypeahead.initialize();
      typeaheadPopulateFields('drzavnici_cro', 'newnames', initialtypeahead);
    }
  });

  // TYPEAHEAD BEGIN

  //TYPEAHEAD END
}); //END OF document.ready

function setObjectAttributes(objectvalue) {
  text_between = objectvalue.trim().substring(objectvalue.indexOf(' '), objectvalue.length) + ' ' + objectvalue[0] + '.'; //Šuker I.
  first_name = objectvalue
    .trim()
    .substring(0, objectvalue.indexOf(' '))
    .trim(); // Ivan
  last_name = objectvalue
    .trim()
    .substring(objectvalue.indexOf(' '), objectvalue.length)
    .trim(); //Šuker
  selected_item = objectvalue
    .trim()
    .toLowerCase()
    .replace(' ', '_'); //ivan_suker
  alt_atb = objectvalue.trim(); //Ivan Šuker
}
//arrays are refference type
function adjustMidlleIconsForTypeaheadCroPoliticians(array_one, array_two) {
  $('.isotope .ikonice').each(function(i, val) {
    array_one.push(
      $(this)
        .find('img')
        .attr('alt')
    );
  });
  for (var i = array_one.length - 1; i < array_two.length; i++) {
    array_one.push('nan');
  }
  for (var i = 0; i < 12; i++) {
    for (var j = 0; j < array_two.length; j++) {
      if (array_two[j].newnames != undefined) {
        if (array_two[j].newnames.trim() == array_one[i].trim()) {
          array_two.splice(j, 1);
        }
      }
    }
  }
}
function adjustMidlleIconsForTypeaheadAllPoliticians(array_one, array_two) {
  $('.isotope .ikonice').each(function(i, val) {
    array_one.push(
      $(this)
        .find('img')
        .attr('alt')
    );
  });
  for (var i = array_one.length - 1; i < array_two.length; i++) {
    array_one.push('nan');
  }
  for (var i = 0; i < 12; i++) {
    for (var j = 0; j < array_two.length; j++) {
      if (array_two[j].trim() == array_one[i].trim()) {
        array_two.splice(j, 1);
      }
    }
  }
}

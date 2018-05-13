var vecernji = {
  //dovhvaca sve URL-ove sa stranice
  getUrlBlock: function(htmltext) {
    // RADI
    var url_links = [];
    var i = 0;
    var inner_counter = 0;
    var lines = htmltext.split('\n');

    while (lines[i].indexOf('class="list_block_02') <= -1) {
      i++;

      if (lines[i].indexOf('class="block"') > -1) {
        do {
          i++;
          if (lines[i].indexOf('class="link"') > -1 && vecernji.notPremium(lines, i)) {
            var first_pos = lines[i].indexOf('"');
            var second_pos = lines[i].indexOf('"', lines[i].indexOf('"') + 1); //+1 zato da ne search-a prvog opet
            var url_string = lines[i].substring(first_pos + 1, second_pos);
            url_links.push(url_string);
            appendToListbox('#listbox', url_links, inner_counter);
            ++inner_counter;
          }
        } while (lines[i].indexOf('class="link"') <= -1);
      }
    }
    $('#num-url').text(url_links.length);
    return url_links;
  },
  getArticleCleanText: function(htmltext) {
    // RADI

    var i = 0;
    var text_concat = '';
    var lines = htmltext.split('\n');

    while (i < lines.length - 1) {
      ++i;
      vecernji.getTitle(lines, i);
      vecernji.getDate(lines, i);
      if (lines[i].indexOf('class="article_author"') > -1) {
        do {
          ++i;
        } while (lines[i].indexOf('</aside>') <= -1);
        do {
          text_concat += lines[i]; //ovo mi vidimo u textfieldu.
          ++i;

          vecernji.getInfoBoxText(lines, i, text_concat);
        } while (lines[i].indexOf('class="bottom_meta"') <= -1);
      }
      if (lines[i].indexOf('class="detail_content intextAd"') > -1) {
        i++;
        do {
          text_concat += lines[i]; //ovo mi vidimo u textfieldu.
          ++i;
        } while (lines[i].indexOf('class="bottom_meta"') <= -1);
      }
    }

    return vecernji.removeAftergt(parseHtml(text_concat)).trim();
  },
  removeAftergt: function(text_input) {
    // RADI
    var enteredfirst = false;
    var eneteredsecond = false;
    if (text_input.indexOf('&gt;') > -1) {
      eneteredfirst = true;

      second_index = text_input.length;
      first_index = text_input.indexOf('&gt;');
      text_input = text_input.replace(text_input.substring(first_index, second_index - 1), '');
    }
    if (text_input.indexOf('&amp;') > -1) {
      eneteredsecond = true;
      text_input = text_input.replace('&amp;', '');
    }
    if (eneteredsecond == true || enteredfirst == true) {
      return text_input;
    } else {
      return text_input;
    }
  },
  getDate: function(array1, index) {
    // RADI
    if (array1[index].indexOf('class="meta"') > -1) {
      do {
        if (array1[index].indexOf('Objava') > -1) {
          var datestorage = array1[index].substring(array1[index].indexOf(':') + 1, array1[index].indexOf('|'));
          $('#date1').text(datestorage.trim() + '.');
        }
        ++index;
      } while (array1[index].indexOf('</aside>') <= -1);
    }
  },
  getTitle: function(array1, index) {
    // RADI
    var counter2 = 0;
    if (array1[index].indexOf('class="title_large') > -1) {
      headingstorage = array1[index].substring(array1[index].indexOf('>') + 1, array1[index].indexOf('<', array1[index].indexOf('<') + 1));
      if (headingstorage.indexOf('&#39;') > -1) {
        do {
          headingstorage = headingstorage.replace('&#39;', '');
          counter2++;
        } while (headingstorage.indexOf('&#') > -1);
      }
      $('#heading1').text(headingstorage);
    }
  },
  getInfoBoxText: function(array1, index_counter, text_concat2) {
    //nije testirano, to treba ukomponirati u ostatak

    console.log('asdfas');
    if (array1[index_counter].indexOf('class="infobox"') > -1) {
      ++index_counter;

      do {
        text_concat2 += array1[index_counter]; //ovo mi vidimo u textfieldu.
        ++index_counter;
      } while (array1[index_counter].indexOf('</div>') <= -1);
    }
  },
  notPremium: function(array1, index_counter) {
    // RADI

    do {
      if (array1[index_counter].indexOf('class="premium') > -1) {
        return false;
        //implementiraj global_counter pomocu closur-a
      }
      index_counter++;
    } while (array1[index_counter].indexOf('class="block"') <= -1);
    return true;
  },
  getTimeInterval: function(input_interval_string) {
    var start_interval = input_interval_string.substring(input_interval_string.indexOf('df') + 3, input_interval_string.indexOf('dt') - 1);
    var end_interval = input_interval_string.substring(input_interval_string.indexOf('dt') + 3, input_interval_string.length);
    return start_interval.trim() + ' - ' + end_interval.trim();
  },
  //http://www.vecernji.hr/pretraga?q=mirela+holy&df=2005-05-24&dt=2010-05-03
  getNameWhenTimeInterval: function(input_url_string) {
    var name1 = input_url_string.substring(input_url_string.indexOf('q') + 2, input_url_string.indexOf('+'));
    var lastname1 = input_url_string.substring(input_url_string.indexOf('+') + 1, input_url_string.indexOf('&'));
    return name1.trim() + '+' + lastname1.trim();
  },
  //http://www.vecernji.hr/pretraga?q=mirela+holy
  getNameWhithoutTimeInterval: function(input_url_string) {
    var name2 = input_url_string.substring(input_url_string.indexOf('q') + 2, input_url_string.indexOf('+'));
    var lastname2 = input_url_string.substring(input_url_string.indexOf('+') + 1, input_url_string.indexOf('&'));
    return name2.trim() + '+' + lastname2.trim();
  },
  endPageMaximumNumberOfArticles: function(htmltext) {
    //RADI
    var lines = htmltext.split('\n');
    var i = 0;
    var tempnum = -1;
    var currentnum;

    while (lines[i].indexOf('pagination') <= -1) {
      i++;
    }

    do {
      i++;
      if (lines[i].indexOf('<a') >= -1) {
        currentnum = lines[i].substring(lines[i].indexOf('>') + 1, lines[i].indexOf('</a>'));

        if (parseInt(currentnum) > parseInt(tempnum)) {
          tempnum = currentnum;
        }
      }
    } while (lines[i].indexOf('</div>') <= -1);
    return tempnum.toString(); //vraca posljedni broj stranice ovisno o broju clanaka
  }
};

//SVE RADI OSIM infobox KOJI NIJE TESTIRAN

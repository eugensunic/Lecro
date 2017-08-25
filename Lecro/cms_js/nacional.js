
        var nacional = {
            getUrlBlock: function (htmltext) { //RADI, samo stavlja urlove u listbox
                var new_array_url_nacional = [];
                var i = 0;
                var lines = htmltext.split('\n');
                url_links_nacional = [];  // setting array to 0 to not add previous elements
                $("#append-element").append('<button class="btn btn-default" type="button" onclick="searchArticlesUrlNacional()">Search articles url</button>');
                $("#append-listbox").append('<select id="listbox2" size="10" name="decision2" style="width:100%;"></select>');
                while (lines[i].indexOf('class="issues') <= -1) {
                    i++;

                    if (lines[i].indexOf('class="issues') > -1) {

                        do {
                            i++;
                            if (lines[i].indexOf('<a href') > -1) {

                                var first_pos = lines[i].indexOf('href') + 6;
                                var second_pos = lines[i].indexOf('>') - 1; //+1 zato da ne search -a prvog opet
                                var url_string = lines[i].substring(first_pos, second_pos);
                                url_links_nacional.push(url_string);
                            }

                        } while (lines[i].indexOf('</ul>') <= -1);

                        new_array_url_nacional = removeDuplicatesFromArray(url_links_nacional);
                        for (i = 0; i < new_array_url_nacional.length; i++) {
                            appendToListbox("#listbox", new_array_url_nacional, i);
                        }
                        $("#num-url").text(new_array_url_nacional.length);
                        break;


                    }
                }
            },
            getArticlesUrlPage: function (htmltext) {  // RADI, jednostavni je ipak bez return-a
                var i = 0;
                var lines = htmltext.split('\n');
                var inner_counter = 0;
              

                do {
                    i++;
                    if (lines[i].indexOf('class="preamble"') > -1) {
                        i++; // makar bi tu trebao staviti do while petlu radi neke sigurnosti ali ok je zasad
                        var temp_pos = lines[i].indexOf('>');
                        var first_pos = lines[i].indexOf('href') + 6;
                        var second_pos = lines[i].indexOf('>', temp_pos + 1) - 1; //+1 zato da ne search-a prvog opet
                        var url_string = lines[i].substring(first_pos, second_pos);

                        links_transfer2.push(url_string);

                        appendToListbox("#listbox2", links_transfer2, inner_counter);
                        inner_counter++;
                    }
                }
                while (inner_counter < 6); // nema zasad bolje nacina od konstante, u ovom slucaju 6, mozes i do 10 staviti
                $("#append-listbox").append("<p id=added-paragraph-down>Number of urls on page: </p>" + inner_counter.toString()); //napravi listbox 2
               
            },

            getDate: function getDate(array1, index) { //RADI
                if (array1[index].indexOf('class="info"') > -1) {
                    var temp_index_date = array1[index].indexOf('</a>') + 1;
                    var datestorage = array1[index].substring(array1[index].indexOf('</a>') + 5, array1[index].indexOf('<', temp_index_date));
                    $("#date1").text(datestorage.trim());

                }

            },
            getTitle:function getTitle(array1, index) { // RADI
                if (array1[index].indexOf('<title>') > -1) {
                    var temp_index_title = array1[index].indexOf('<') + 1;
                    var titlestorage = array1[index].substring(array1[index].indexOf('>') + 1, array1[index].indexOf('<', temp_index_title)); //rade ovak pusti pa sa regexom sredi tj formatiraj
                    $("#heading1").text(titlestorage.trim() + ".");

                }
            },

            getUrlGazeta: function(htmltext){ //RADI
                var i = 0;
                var lines = htmltext.split('\n');
                var url_counter = 0;
                counter_until_toomuch = 0;
                url_links_gazeta_nacional = [];

                do {
                    i++;
                    if (lines[i].indexOf('gazeta') > -1 || lines[i].indexOf('GAZETA') > -1) {
                        alert();
                        do {
                            if (lines[i].indexOf('class="preamble"') > -1) {

                                counter_until_toomuch = 0;
                                i++; // makar bi tu trebao staviti do while petlu radi neke sigurnosti ali ok je zasad
                                var first_pos = lines[i].indexOf('href') + 6;
                                var temp_pos = lines[i].indexOf('>');
                                var second_pos = lines[i].indexOf('>', temp_pos + 1) - 1; //+1 zato da ne search-a prvog opet
                                var url_string = lines[i].substring(first_pos, second_pos);
                                url_links_gazeta_nacional.push(url_string);
                                appendToListbox("#listbox", url_links_gazeta_nacional, url_counter);
                                url_counter++;
                            }
                            i++;
                           
                            counter_until_toomuch++;

                        } while (counter_until_toomuch <= 10);  //10 ili 9 stavi ne manje niti vise
                        break;
                    }


                } while (true);

            },

            getArticleCleanText: function (htmltext) { //RADI , dohvacanje cistog texta i stavljanje u  #first textarea
                var i = 0;
                var lines = htmltext.split('\n');
                var text_concat = "";

                do {
                    i++;
                    nacional.getTitle(lines, i);
                    nacional.getDate(lines, i);
                    if (lines[i].indexOf('id="__xclaimwords') > -1) {
                        do {
                            text_concat += lines[i];
                            ++i;


                        } while (lines[i].indexOf('</div>') <= -1);
                        
                        break;
                    }

                } while (true);
                return parseHtml(text_concat).trim();
            }


        };





       
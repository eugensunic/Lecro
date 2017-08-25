        //--GLOBAL FUNCTIONS BEGIN--
        function removeDuplicatesFromArray(names) {
            var uniquenames = [];
            $.each(names, function (i, el) {
                if ($.inArray(el, uniquenames) === -1) uniquenames.push(el);
            });
            return uniquenames;
        }
        function parseHtml(htmltext) {
            htmltext = htmltext.replace(/<a\b[^>]*>(.*?)<\/a>/i, ""); //remove everything between <a> and </a>
            htmltext = htmltext.replace(/<style>.*?<\/style>/g, ''); //remove everything between style tags
            htmltext = htmltext.replace(/(\<script)\s*[^\>]*\>([^\<]*\<\/script>)?/gi, ''); //              //remove everything between script tags
            htmltext = htmltext.replace(/(<([^>]+)>)/ig, "");  //remove all remained html tags to get clean text, place "" instead of tags
            return htmltext.trim();
        }
        function appendToListbox(boxname, array1, index) {
            $(boxname).append("<option value=" + index + ">" + array1[index] + "</option>"); //napravi listbox 2
        }
        function checkWordChars(array1, index) {
            if ((text[z] == "." && !(isNaN(text[z - 1]))) ||
                (text[z - 1] == " " && text[z] == "." && !(isNaN(text[z - 2]))) ||
                (text[z - 1] == "d" && text[z] == "." && text[z - 2] == "t" && text[z - 3] == "i") ||
                (text[z - 1] == "r" && text[z] == "." && text[z - 2] == "p" && text[z - 3] == "n") ||
                (text[z - 1] == "d" && text[z] == "." && text[z - 2] == "o" && text[z - 3] == "g") ||
                (text[z - 1] == "r" && text[z] == "." && text[z - 2] == "t" && text[z - 3] == "s") ||
                (text[z - 1] == "d" && text[z] == "." && text[z - 2] == "t" && text[z - 3] == "i") ||
                (text[z - 1] == "l" && text[z] == "." && text[z - 2] == "č") ||
                (text[z - 1] == "t" && text[z] == "." && text[z - 2] == "s") ||
                (text[z - 1] == "r" && text[z] == "." && text[z - 2] == "b") ||
                (text[z - 1] == "j" && text[z] == "." && text[z - 2] == "t"))
                return true;
            else { false;}
            
        }
        function getPage() {
            var string_text = $("#input-url").val().trim();
            if (string_text.indexOf('df') <= -1) {
                var index_to_start = string_text.indexOf('&') + 1;
                return string_text.substring(string_text.indexOf('p', string_text.indexOf('q')) + 2, string_text.indexOf('&', index_to_start));
            }
            else if (string_text.indexOf('&p') > -1) {
                var positionofpage = string_text.indexOf('&p')+3;
                var pagenumber = string_text.substring(positionofpage, positionofpage.length);
                return pagenumber;
            }
          
        }
        function getPerson() {
            return getSearchTerm().replace('+', ' ');
        }
        function getSearchTerm() { //RADI
           
            var string_text = $("#input-url").val().trim();
            if (string_text.indexOf('df') <= -1) {
                return (string_text.substring(string_text.indexOf('q') + 2, string_text.indexOf('&')));
            }

            else {
                alert();
                var firstandposition = string_text.indexOf('&') + 1;
                alert((string_text.substring(string_text.indexOf('q') + 2, string_text.indexOf('&', firstandposition))));
                return (string_text.substring(string_text.indexOf('q') + 2, string_text.indexOf('&', firstandposition)));
            }
        }
     
        //--GLOBAL FUNCTIONS END--
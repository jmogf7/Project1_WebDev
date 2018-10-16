$(document).ready(function () { 
    $("#search_bar").on('keyup',search);
    $("#search_bar").on('click',search);
    //hide the suggesions when search button is clicked
    $("#search_button").on('click', function() {
        $("#suggestions_box").hide();
    })
});

function search() {
   var data = movies['movies'];
   var html = "";
   var value = $("#search_bar").val();
   var show=false;

   var found = 0;
   for(var i=0; i < data.length; ++i){
       var start = data[i]['title'].toLowerCase().search(value.toLowerCase().trim());
       //check if there is a matching substring
       if (start != -1) {
            //found a match (increment found)
            found++;
            //only display first 5 matches
            if (found <= 5)
            {
                //div start tag
                html += "<div class='sub_suggestions' data-item='" + data[i]['title'] + "' >";
                //display title and bold the matching substring from the search bar
                html += data[i]['title'].substring(0,start)+ "<b>";
                html += data[i]['title'].substring(start,start+value.length) + "</b>"
                html += data[i]['title'].substring(start+value.length,data[i]['title'].length);
                //display date
                html += "(" + data[i]['year'] + "), ";
                //display actors
                html += "Starring: " + data[i]['starring'];
                html += "</div>";
            }
            show=true;
       }
   }
   if(show){
       $("#suggestions_box").html(html);
       $("#suggestions_box").children(".sub_suggestions").on('click',function(){
           var item=$(this).attr('data-item');
           $("#search_bar").val(item);
           $("#suggestions_box").hide();
       });
       
       $("#suggestions_box").show();
   }
   else
      $("#suggestions_box").hide();
}

function submit_search() {
    var data = movies['movies'];
}
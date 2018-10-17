$(document).ready(function () {
    var controller = new Controller(movies["movies"]);
});

function Controller(data) {
    this.movies = data;
    
    // CONSTANTS
    this.movies_div="#movies";
    this.grid_icon="#grid_icon";
    this.list_icon="#list_icon";
    this.sort_by="#sort_by";
    this.search_bar="#search_bar";
    this.search_button="#search_button";
    
    var self = this;

    // FUNCTIONS
    var make_grid_function=function(){
        self.make_grid.call(self);
    };
    
    var make_list_function=function(){
        self.make_list.call(self);
    };
    
    var sort_movies_function=function(){
        self.sort_movies.call(self);
    };

    var filter_movies_function=function(){
        self.filter_movies.call(self);
    };
    
    // EVENTS
    $(this.grid_icon).on("click", make_grid_function);
    $(this.grid_icon).on("click", filter_movies_function);
    $(this.list_icon).on("click", make_list_function);
    $(this.list_icon).on("click", filter_movies_function);
    $(this.sort_by).on('change',sort_movies_function);
    $(this.search_button).on('click',filter_movies_function);
    
    this.load_movies();
}

Controller.prototype.load_movies = function() {
    var html = "";
    //loop through and display all movies
    for (var i = 0; i < this.movies.length; i++)
        html += make_image(this.movies[i]);

    $(this.movies_div).html(html);
};

Controller.prototype.sort_movies=function(){
    //sort_movies based on year or rating
    var by=$(this.sort_by).val().toLowerCase();
    this.movies=this.movies.sort(
            function(a,b){
                if(a[by]<b[by])
                    return -1;
                if(a[by]==b[by])
                    return 0;
                if(a[by]>b[by])
                    return 1;
            }            
            );
    
    this.load_movies();
};

Controller.prototype.filter_movies=function(){
    var value = $("#search_bar").val();
    var html = "";
    //if there is no input in search bar, display all the movies
    if (value.length == 0) {
        this.movies = movies["movies"];
        for (var i = 0; i < this.movies.length; i++) {
            html += make_image(this.movies[i]);
        }
        $(this.movies_div).html(html);
        return;
    }
    //filter based on input in search bar
    this.movies = this.movies.filter(a=>a['title'].toLowerCase().search(value.toLowerCase().trim()) != -1);
    //find all movies whose title matches search criteria
    for (var i = 0; i < this.movies.length; i++) {
        html += make_image(this.movies[i]);
    }
    //reset the this.movies to all the movies
    this.movies = movies["movies"];
    $(this.movies_div).html(html);
};

Controller.prototype.make_grid = function () {
    //change the layout of the page and the display of the icon
    $(this.movies_div).attr("class", "grid");
    $(this.grid_icon).attr("src", "../icons/grid_pressed.jpg");
    $(this.list_icon).attr("src", "../icons/list.jpg");
};

Controller.prototype.make_list = function () {
    //change the layout of the page and the display of the icon
    $(this.movies_div).attr("class", "list");
    $(this.grid_icon).attr("src", "../icons/grid.jpg");
    $(this.list_icon).attr("src", "../icons/list_pressed.jpg");
};

function make_image(data) {
    //if grid view, create grid view
    if ($("#grid_icon").attr("src") === "../icons/grid_pressed.jpg")
    {
        var html = "";
        html += "<div class='movie'>";
        html += "<img src='../" + data["photo"] + "'>";
        html += "<div class='description'>" + data["title"] + "<br>" + "(" + data["year"] + ")" + "</div>";
        html += "<div class='hover_description'>" + "<b>Starring: </b><br>" + data["starring"] + "</div>";
        html += "</div>";
        return html;
    }
    //else, create list view
    var html = "";
        html += "<div class='movie'>";
        html +=     "<div class='title_container'>";
        html +=         "<div class='title'>" + data["title"] + "</div>";
        html +=         "<div class='date'>(" + data["year"] + ")</div>";
        html +=     "</div>";
        html +=     "<div class='description'>"+ data["description"] + "</div>";
        html +=     "<div class='starring'>" + "<b>Starring: </b>" + data["starring"] + "</div>";
        html +=     "<div class='rating'>" + "<b>Rating: </b>";
        //display the stars (gold stars for each rating value, regular stars for the rest)
        for (var i=1; i <= 5; i++) {
            if (i <= data["rating"]) {
                html +=     "<img src='../icons/gold_star.png'>";
            }
            else {
                html +=     "<img src='../icons/regular_star.png'>";
            }
        }
        html +=     "</div>"
        html +=     "<img src='../" + data["photo"] + "'>";
        html += "</div>";
        return html;
}
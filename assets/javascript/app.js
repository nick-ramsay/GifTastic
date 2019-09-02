$(document).ready(function () {
    var allButtons = [];

    function renderButtons() {
        $(".buttons").empty();
        for (i = 0; i < allButtons.length; i++) {
            var newButtonSearch = allButtons[i];
            var newButton = $('<button class="btn btn-dark btn-sm m-1 gifButton" data-topic=' + newButtonSearch + '>' + newButtonSearch + '</button>');
            $(".buttons").append(newButton);
        }
    };

    $("#newButtonRun").on("click", function () {
        allButtons.push($("#newButtonSearch").val());
        renderButtons();
        $("#newButtonSearch").val("");
    })

    $(document).on("click", ".gifButton", function () {
        $(".gifs").empty();
        var gifSearch = $(this).attr("data-topic");
        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=kVnhBzTc4hSQFqIP3Xg2CIuos2Lmj5ze&q=" + gifSearch + "&limit=10&offset=0&rating=G&lang=en";
        console.log(gifSearch);

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            $(".gifs").empty();
            var results = response.data;
            for (var i = 0; i < results.length; i++) {
                /*var cardDiv = $('<div class="card" style="width: 18rem;">');
                var imageDiv = $('<img src="' + results.url + '" class="card-img-top" alt="' + results.title + '">');
                var cardBodyDiv = $('<div class="card-body">');
                var ratingDiv = $('<p> Rating: ' + results.rating + '</p>');

                $(cardDiv).append(imageDiv);
                $(cardBodyDiv).append(ratingDiv);
                $(cardDiv).append(cardBodyDiv);
                $(".gifs").append(cardDiv);
                */
                var gifContainerDiv = $('<div class="card" style="width: 18rem;">');
                var imageDiv = $('<img class="card-img-top" alt=' + results.title + '>');
                var cardBodyDiv = $('<div class="card-body">');
                var ratingDiv = $("<p>Rating: " + results[i].rating + "</p>");
                $(imageDiv).attr("src", results[i].images.fixed_height.url);
                $(cardBodyDiv).append(ratingDiv);
                $(gifContainerDiv).append(imageDiv);
                $(gifContainerDiv).append(cardBodyDiv);
                $(".gifs").append(gifContainerDiv);
            }
        })
    }
    );

    window.onload = renderButtons();
})
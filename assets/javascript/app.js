$(document).ready(function () {
    var allButtons = ["Pun", "Fail", "Happy"];

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

    uniqueGifID = 0;

    $(document).on("click", ".gifButton", function () {
        $("#currentGifHeader").text($(this).attr("data-topic"));
        $(".gifs").empty();
        var gifSearch = $(this).attr("data-topic");
        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=kVnhBzTc4hSQFqIP3Xg2CIuos2Lmj5ze&q=" + gifSearch + "&limit=10&offset=0&rating=G&lang=en";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            $(".gifs").empty();
            var results = response.data;
            for (var i = 0; i < results.length; i++) {
                uniqueGifID++;
                var gifContainerDiv = $('<div class="card float-left" style="width: 18rem;">');
                $(gifContainerDiv).attr("id", gifSearch + uniqueGifID);

                var imageDiv = $('<img class="card-img-top gifImage" alt=' + results.title + '>');
                $(imageDiv).attr("data-still-url", results[i].images.fixed_height_still.url);
                $(imageDiv).attr("data-play-url", results[i].images.fixed_height.url);
                $(imageDiv).attr("src", $(imageDiv).attr("data-play-url"));

                var cardBodyDiv = $('<div class="card-body gifText">');
                $(cardBodyDiv).attr("id", gifSearch + uniqueGifID + "cardBody");

                var ratingDiv = $("<span>Rating: " + results[i].rating.toUpperCase() + "</span>");
                var favouriteBtn = $("<a class='float-right favouriteBtn'><img src='https://img.icons8.com/offices/30/000000/hearts.png'></a>");
                $(favouriteBtn).attr("id", gifSearch + uniqueGifID + "button");
                $(favouriteBtn).attr("data-gif-ID", gifSearch + uniqueGifID);

                $(cardBodyDiv).append(ratingDiv);
                $(cardBodyDiv).append(favouriteBtn);
                $(gifContainerDiv).append(imageDiv);
                $(gifContainerDiv).append(cardBodyDiv);
                $(".gifs").append(gifContainerDiv);
            }
        })
    }
    );

    var state = "play";

    $(document).on("click", ".gifImage", function playPause() {
        if (state === "play") {
            state = "pause";
            $(this).attr("src", $(this).attr("data-still-url"));
        } else {
            state = "play";
            $(this).attr("src", $(this).attr("data-play-url"));
        }

    })

    $(document).on("click", ".favouriteBtn", function addFavourite() {
        $("#" + $(this).attr("data-gif-ID")).prependTo(".favourites");
        $("#" + $(this).attr("id")).remove();
        var removeBtn = $("<a class='float-right removeBtn'><img src='https://img.icons8.com/material-outlined/24/000000/filled-trash.png'></a>");
        $(removeBtn).attr("data-gif-ID", $(this).attr("data-gif-ID"));
        $('#' + $(this).attr('data-gif-ID') + 'cardBody').append(removeBtn);
    }) //adds gif to favourites section

    $(document).on("click", ".removeBtn", function removeFavourite() {
        $('#' + $(this).attr('data-gif-ID')).remove();
    })

    $(".clearFavourites").on("click", function clearFavourites() {
        $(".favourites").empty();
    })

    window.onload = renderButtons();
})
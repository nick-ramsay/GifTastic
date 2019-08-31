$(document).ready(function () {
    var allButtons = ["Fail", "Pundog"];

    function renderButtons() {
        $(".buttons").empty();
        for (i = 0; i < allButtons.length; i++) {
            var newButtonSearch = allButtons[i];
            var newButton = $('<button class="btn btn-dark btn-sm m-1 gifButton" data-search=' + newButtonSearch + '>' + newButtonSearch + '</button>');
            $(".buttons").append(newButton);
        }
    };

    $("#newButtonRun").on("click", function () {
        allButtons.push($("#newButtonSearch").val());
        renderButtons();
        $("#newButtonSearch").val("");
    })

    function generateGifs() {
        var gifSearch = $(this).attr("data-search");
        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=kVnhBzTc4hSQFqIP3Xg2CIuos2Lmj5ze&q=" + gifSearch + "&limit=10&offset=0&rating=G&lang=en";
        console.log(queryURL);
    }

    $(document).on("click", ".gifButton", generateGifs);

    window.onload = renderButtons();
})
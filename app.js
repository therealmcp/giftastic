var topics = [];

$(document).on("click", ".btn", function() {
    $("#gifs-here").empty();
    var topic = $(this).attr("data-name");

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + 
        topic + "&api_key=YNeSnTDGKAV0njIvU7N751izO7vi9JzT&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    })

        .then(function(response) {
                console.log(response);

            var results = response.data;

            for (i = 0; i < results.length; i++) {
                if (results[i].rating != "r" && results[i].rating != "pg-13") {
                    var gifDiv = $("<div>");
                    var rating = results[i].rating;
                    var p = $("<p>").text("Rating: " + rating);
                    var topicImage = $("<img>");
                    
                    topicImage.attr("src", results[i].images.fixed_height_still.url);
                    topicImage.attr("animated-url", results[i].images.fixed_height.url);
                    topicImage.addClass("gif");
                    topicImage.attr("data-state", "still");

                    gifDiv.append(p);
                    gifDiv.append(topicImage);

                    $("#gifs-here").prepend(topicImage);
                }
            }

        });
});

$(document).on("click", ".gif", function() {
    var state = $(this).attr("data-state");
    if (state === "still") {
        var temp = $(this).attr("src");
        $(this).attr("src", $(this).attr("animated-url"));
        $(this).attr("data-state", "animate");
        $(this).attr("animated-url", temp);
    } else {
        var temp = $(this).attr("src");
        $(this).attr("src", $(this).attr("animated-url"));
        $(this).attr("data-state", "still");
        $(this).attr("animated-url", temp);
        };

        console.log("gif clicked");
});

function renderButtons() {
    $("#buttons-view").empty();

    for (i = 0; i < topics.length; i++) {
        var a = $("<button>");
        a.addClass("btn btn-info");
        a.attr("data-name", topics[i]);
        a.text(topics[i]);
        $("#buttons-view").append(a);
    }
}

$("#add-gif").on("click", function(event) {
    event.preventDefault();
    var topic = $("#gif-input").val().trim();
    topics.push(topic);
    renderButtons();
});

/* $(document).on("click", ".gif-btn");
 */
renderButtons();
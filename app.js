var topics = [];

$(".btn").on("click", function() {
    var topic = $(this).attr("data-name");

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + 
        topic + "&api_key=YNeSnTDGKAV0njIvU7N751izO7vi9JzT&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
    })

        .then(function(response) {
                console.log(response);
/*             var topicDiv = $("<div class='topic'>");
 */
            var results = response.data;

            for (i = 0; i < results.length; i++) {
                if (results[i].rating != "r" && results[i].rating != "pg-13") {
                    var gifDiv = $("<div>");
                    var rating = results[i].rating;
                    var p = $("<p>").text("Rating: " + rating);
                    var topicImage = $("<img>");
                    
                    topicImage.attr("src", results[i].images.fixed_height_still.url);

                    gifDiv.append(p);
                    gifDiv.append(topicImage);

                    $("#gifs-here").prepend(topicImage);
                }
            }
        });
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
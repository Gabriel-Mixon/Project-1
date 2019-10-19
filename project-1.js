// function buildQueryUrl(input) {
//     var queryURL = "https://api.edamam.com/search?";
//     var appKey = "&app_key=${da6f303557b9ecd12d0710df3c225180}";
//     var appID = "&app_id=${16ae349c}";
//     var search = "q=";
//     var quantity = "&quantity=5";

//     var fullQuery = queryURL + search + input + appID + appKey + quantity

//     return fullQuery

// }




$(".btn").on("click", function (event) {
    event.preventDefault();
    var input = $("#user-input").val().trim();
    console.log("clicked");
    console.log(input);

    // $.ajax({
    //     url: buildQueryUrl(input),
    //     method: "GET"
    // }).then(function (response) {
    //     console.log(response);
    // });
});


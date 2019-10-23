// function buildQueryUrl(input) {
//     var queryURL = "https://api.edamam.com/search?";
//     var appKey = "&app_key=${da6f303557b9ecd12d0710df3c225180}";
//     var appID = "&app_id=${16ae349c}";
//     var search = "q=";
//     var quantity = "&quantity=5";

//     var fullQuery = queryURL + search + input + appID + appKey + quantity

//     return fullQuery

// }
var edamamResponse = {};

function createCORSRequest(method, url) {
    var xhr = new XMLHttpRequest();
    if ("withCredentials" in xhr) {
        // XHR for Chrome/Firefox/Opera/Safari.
        xhr.open(method, url, true);
    } else if (typeof XDomainRequest != "undefined") {
        // XDomainRequest for IE.
        xhr = new XDomainRequest();
        xhr.open(method, url);
    } else {
        // CORS not supported.
        xhr = null;
    }
    console.log(xhr);
    return xhr;

}

// Make the actual CORS request.
function makeCorsRequest(input) {
    let app_id = "&app_id=16ae349c";
    let app_key = "&app_key=da6f303557b9ecd12d0710df3c225180";
    let recipe = "q=";


    // let quantity = "&quantity=5";

    var url = "https://api.edamam.com/search?" + recipe + input + app_id + app_key;
    // console.log(url)

    var xhr = createCORSRequest('POST', url);
    if (!xhr) {
        // console.log('CORS not supported');
        return;
    }
    // Response handlers.
    xhr.onload = function () {
        var text = xhr.responseText;
        edamamResponse = JSON.parse(xhr.response);
        for (var i = 0; i < 5; i++) {
            console.log(edamamResponse.hits[i].recipe.label);
            console.log(edamamResponse.hits[i].recipe.ingredients);
            var ingredients = edamamResponse.hits[i].recipe.ingredients;
            var tables = $("<table>");
            var rows = $("<tr>");
            var body = $("<tbody>")
            rows.text(edamamResponse.hits[i].recipe.label);
            tables.append(rows);
            for (var j = 0; j < ingredients.length; j++) {
                var ingredient = ingredients[j].text;
                var data = $("<td>")
                data.text(ingredient)
                rows.append(data)
            }
            $(".tableHolder").append(tables)


        }
    };
    xhr.onerror = function () {
        // console.log('Woops, there was an error making the request.');
    };

    input.innerHTML = 'Loading...';
    xhr.setRequestHeader('Content-Type', 'application/json');
    console.log(recipe);
    xhr.send(recipe);
}


$(".btn").on("click", function (event) {
    event.preventDefault();
    var input = $("#user-input").val().trim();
    // console.log("clicked");
    // console.log(input);

    makeCorsRequest(input);
    for (const key in edamamResponse) {
        if (edamamResponse.hasOwnProperty(key)) {
            //    console.log(key);
        }

        // console.log(edamamResponse.key);
    }





    // $.ajax({
    //     url: buildQueryUrl(input),
    //     method: "GET"
    // }).then(function (response) {
    //     console.log(response);
    // });

  
});



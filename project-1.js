
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
    // console.log(xhr);
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
    xhr.onload = function (ingredients) {
        var text = xhr.responseText;
        edamamResponse = JSON.parse(xhr.response);
        for (var i = 0; i < 5; i++) {
            // console.log(edamamResponse.hits[i].recipe.label);
            // console.log(edamamResponse.hits[i].recipe.ingredients);
            console.log(edamamResponse.hits[i].recipe.totalNutrients.FAT)
            var ingredients = edamamResponse.hits[i].recipe.ingredients;
            var tables = $("<table>");
            var rows = $("<tr>");
            var help = $(".ingrTableHolder");
            var url = edamamResponse.hits[i].recipe.url;
            var urlStorage = $("<td>");
            var urlAnchor = $("<a href=\"" + url + "\" >");
            var button = $("<button>");
            var buttonStorage = $("<td>")

            rows.text(edamamResponse.hits[i].recipe.label);
            tables.append(rows);
            for (var j = 0; j < ingredients.length; j++) {
                var ingredient = ingredients[j].text;
                var data = $("<td>")
                data.text(ingredient)
                rows.append(data)
            }
            help.text(edamamResponse.hits[i].recipe.totalNutrients.FAT)
            // help.append(rows)
            urlAnchor.text(" Recipe link!")
            urlStorage.append(urlAnchor);
            rows.append(urlStorage);

            button.addClass("dynamic");
            button.text("For more informaton than you need click me and look below:)")
            button.attr("data-nutrients", JSON.stringify(edamamResponse.hits[i].recipe.totalNutrients))
            buttonStorage.append(button);
            rows.append(buttonStorage);

            $(".tableHolder").append(tables)



        }
        $(".dynamic").on("click", function (event) {
            // console.log(event)
            console.log(this)
            var nutrients = $(this).attr("data-nutrients")
            console.log(JSON.parse(nutrients));
            var importantStuff = (JSON.parse(nutrients))
            var nutritionStuff = $(".ingrTableHolder")
            // nutritionStuff.append(importantStuff)
            nutritionStuff.text(nutrients)
            var string = ""
            var nutritionPlace = $(".ingrTableHolder")
            for (key in importantStuff) {
                // console.log(key + ": " + importantStuff[key].quantity + " " + importantStuff[key].unit)
                string = string + importantStuff[key].label + ": " + importantStuff[key].quantity + " " + importantStuff[key].unit + "\n"
            }
            nutritionPlace.text(string);



        });

    };
    xhr.onerror = function () {
        // console.log('Woops, there was an error making the request.');
    };

    input.innerHTML = 'Loading...';
    xhr.setRequestHeader('Content-Type', 'application/json');
    // console.log(recipe);
    xhr.send(recipe);
}

var ingrResponse = {};

$(".btn").on("click", function (event) {
    $(".tableHolder").empty();
    event.preventDefault();
    var input = $("#user-input").val().trim();

    makeCorsRequest(input);
    for (const key in edamamResponse) {
        if (edamamResponse.hasOwnProperty(key)) {
            //    console.log(key);
        }

        // console.log(edamamResponse.key);
    }
});

$(".tableHolder").on("click", ".dynamic", function () {
    console.log("clicked")
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
        return xhr;
    }

    // Make the actual CORS request.
    function makeCorsRequest(ingredients) {
        let app_id = "&f400704d";
        let app_key = "&261f94eb78c5280f2b9776cbd6fe7e88"
        let ingredientSearch = "&ingr="
        // let pre = document.getElementById('response');

        var ingrURL = "https://api.edamam.com/api/nutrition-details" + app_id + app_key + ingredientSearch + ingredients;
        // console.log(ingrURL)

        var xhr = createCORSRequest('POST', url);
        if (!xhr) {
            alert('CORS not supported');
            return;
        }

        // Response handlers.
        xhr.onload = function () {
            var text = xhr.responseText;
            console.log(text)
            var ingrResponse = JSON.parse(xhr.response);
            var ingrInfo = ingrResponse;
            console.log(ingrInfo);
            var ingredientPlacement = $(".ingrTableHolder");
            var rows = $("<tr>");
            var data = $("<td>");
            ingredientPlacement.append(ingrInfo);
            data.append(ingredientPlacement);
            rows.append(data);
        };

        xhr.onerror = function () {
            alert('Woops, there was an error making the request.');
        };

        pre.innerHTML = 'Loading...';
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(recipe);
    }

});



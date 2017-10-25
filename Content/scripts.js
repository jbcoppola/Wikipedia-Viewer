window.onload = function () {
    document.querySelector(".search button").addEventListener("click", function () {
        var search = document.querySelector(".search input").value;
        var url = 'https://en.wikipedia.org/w/api.php?action=opensearch&search=' + search + '&origin=*';
        buttonGet(url);
    });
};

function buttonGet(url) {
    fetch(url, {
        method: 'POST'
    }).then(function (response) {
        if (response.ok) {
            return response.json();
        }
        throw new Error('Network response was not ok: ' + response.statusText);
        }).then(function (data) {
            return htmlBuilder(data);
        })
        .then(function (data) {
            document.querySelector(".results").innerHTML = data;
        })
        .catch(function (error) {
            console.log(error);
        });
}

function htmlBuilder(data) {
    var htmlString = "";
    for (i = 0; i < data[1].length; i++) {
        var result = '<div class="result">';
        for (j = 1; j < data.length; j++) {
            if (j === 1) {
                result += "<h1>" + data[j][i] + "</h1>";
            }
            else if (j === 2) {
                result += "<p>" + data[j][i] + "</p>";
            }
            else {
                result += "<a href='" + data[j][i] + "'>" + data[j][i] + "</a>";
            }
        }
        result += "</div>";
        htmlString += result;
    }
    return htmlString;
}
window.onload = function () {
    document.querySelector(".search button").addEventListener("click", function () {
        var search = document.querySelector(".search input").value;
        var url = 'https://en.wikipedia.org/w/api.php?action=opensearch&search=' + search + '&origin=*';
        var resultsList = document.querySelector(".results-list");
        searchFunc(url);
    });
};


function searchFunc(url) {
    if (document.querySelector(".results-list").classList.contains("expand")) {
        retract();
        setTimeout(function () {
            buttonGet(url);
            expand();
        }, 1000);
    }
    else {
        buttonGet(url);
        expand();
    }
}

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
            document.querySelector(".results-list").innerHTML = data;
        })
        .catch(function (error) {
            console.log(error);
        });
}

function htmlBuilder(data) {
    var htmlString = "";
    for (i = 0; i < data[1].length; i++) {
        var result = '<a href="'+ data[3][i] + '" target="_blank" class="result">';
        for (j = 1; j < data.length - 1; j++) {
            if (j === 1) {
                result += "<h1>" + data[j][i] + "</h1>";
            }
            else if (j === 2) {
                result += "<p>" + data[j][i] + "</p>";
            }
        }
        result += "</a>";
        htmlString += result;
    }
    return htmlString;
}
function expand() {
    document.querySelector(".results-list").classList.add("expand");
}
function retract() {
    document.querySelector(".results-list").classList.remove("expand");
}
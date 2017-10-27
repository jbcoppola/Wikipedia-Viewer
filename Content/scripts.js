﻿window.onload = function () {
    var button = document.querySelector(".search input.btn");
    document.querySelector("form").addEventListener("submit", function (e) {
        e.preventDefault();
        var search = document.querySelector(".search-bar").value;
        var url = 'https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&prop=pageimages%7Cpageterms&list=&generator=search&piprop=original&gsrnamespace=0&gsrlimit=18&gsrprop=snippet%7Ctitlesnippet&gsrsearch=' + search;
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
            return response;
        }
        throw new Error('Network response was not ok: ' + response.statusText);
        }).then(function (data) {
            return data.json();
        }).then(function (data) {
            var results = data.query.pages;
            document.querySelector(".results-list").innerHTML = htmlBuilder(results);
        })
        .catch(function (error) {
            console.log(error);
        });
}

function htmlBuilder(pages) {
    var htmlString = "";
    for (page in pages) {
        if (pages[page].terms.description) {
            var desc = pages[page].terms.description[0];
            var display = "string: '" + desc + "'. Found disambiguation: " + !(desc.indexOf("disambiguation") === -1);
            if (desc.indexOf("disambiguation") === -1) {
                var result = '<a href="http://en.wikipedia.org/?curid=' + pages[page].pageid + '" target="_blank" class="result">';
                result += "<h1>" + pages[page].title + "</h1>";
                if (pages[page].original && pages[page].title.length < 30) { result += '<img src="' + pages[page].original.source + '" />'; }
                result += "<p>" + pages[page].terms.description + "</p>";
                result += "</a>";
                htmlString += result;
            }
        }
    };
    return htmlString;
}
function expand() {
    document.querySelector(".results-list").classList.add("expand");
}
function retract() {
    document.querySelector(".results-list").classList.remove("expand");
}
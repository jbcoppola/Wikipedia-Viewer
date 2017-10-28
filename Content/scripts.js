window.onload = function () {
    var button = document.querySelector(".search input.btn");
    document.querySelector("form").addEventListener("submit", function (e) {
        e.preventDefault();
        var search = document.querySelector(".search-bar").value;
        var url = 'https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&prop=pageimages%7Cpageterms&list=&generator=search&piprop=original&gsrnamespace=0&gsrlimit=18&gsrprop=snippet%7Ctitlesnippet&gsrsearch=' + search;
        var resultsList = document.querySelector(".results-list");
        searchFunc(url);
    });
    scrollTo(document.querySelector(".footer a"), "search");
    window.onresize = function() {
        resultsHeight();
    }
};


function searchFunc(url) {
    if (document.querySelector(".results-list").classList.contains("expand")) {
        document.querySelector(".footer").classList.add("hidden");
        //retract();
        setTimeout(function () {
            buttonGet(url);
            //expand();
        }, 1000);
        setTimeout(function () {

            resultsHeight();
            document.querySelector(".footer").classList.remove("hidden");
        }, 2000);
    }
    else {
        buttonGet(url);
        //expand();
        setTimeout(function () {

            resultsHeight();
            document.querySelector(".footer").classList.remove("hidden");
        }, 800);
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
            var title = pages[page].title;

            if (desc.indexOf("disambiguation") === -1) {
                var result = '<a href="http://en.wikipedia.org/?curid=' + pages[page].pageid + '" target="_blank" class="result">';

                //truncate title if too long
                var maxTitleLen = 25;
                if (title.length >= maxTitleLen) { title = title.slice(0, maxTitleLen) + "..."; }
                result += "<h1>" + title + "</h1>";

                //truncate description if too long
                var maxDescLen = 100;
                if (desc.length >= maxDescLen) { desc = desc.slice(0, maxDescLen) + "..."; }

                //only include image if title and description aren't long
                if (pages[page].original && title.length < maxTitleLen && desc.length < maxDescLen) {
                    result += '<img src="' + pages[page].original.source + '" />';
                }
                result += "<p>" + desc + "</p>";
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

function scrollTo(btn, scrollToId) {
    btn.addEventListener("click", function (event) {
        event.preventDefault();
        var destination = document.getElementById(scrollToId).offsetTop;
        window.scroll({ top: destination, behavior: "smooth" });
    })
}

function resultsHeight() {
    var results = document.querySelectorAll(".result");
    console.log(results);
    var height = 0;
    for (i = 0; i < results.length; i++) {
        height += results[i].clientHeight;
    }
    var divider;
    if (window.innerWidth > 1080) {
        divider = 2.5;
    }
    else if (window.innerWidth > 720) {
        divider = 1.5;
    }
    else { divider = .5; }
    height /= divider;

    height = height.toString() + "px";
    document.querySelector(".results-list").style.maxHeight = height;
}
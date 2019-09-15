var delay = (function () {
    var timer = 0;
    return function (callback, ms) {
        clearTimeout(timer);
        timer = setTimeout(callback, ms);
    };
})();

window.onload = init;

// ensures page is fully loaded first
function init() {

    //   const captionsPanel = document.getElementById("captions-container");
    //   const scrollUpdate = function() {
    //    captionsPanel.scrollTop = captionsPanel.scrollHeight - captionsPanel.clientHeight;
    //   }

    var text = ["Here", "is", "some", "sample", "text", "that", "will", "be", "replaced", "by", "subtitles"];
    var timeStamps = [1, 3, 4, 6, 8, 12, 13, 17, 18, 19, 23, 25];
    var elem = document.getElementById("captions-container");
    const textLen = text.length;

    for (var i = 0; i < textLen; i++) {
        displayTimeoutText(text[i], timeStamps[i] * 400);
    };
    function displayTimeoutText(text, timeout) {
        setTimeout(function() {
            elem.innerHTML = text;
        }, timeout);
    };

}



$('#youtubeId').keyup(function () {
    delay(function () {
        var videoID = $('#youtubeId').val();
        var videos = "https://www.googleapis.com/youtube/v3/videos";
        var apiKey = "AIzaSyAzYHm1iwMocB9pW2uZrz_6Sqte5t_bXGo"; // Insert here your api key
        var fieldsTitle = "fields=items(snippet(title))";
        var videosCap = "https://video.google.com/timedtext?lang=en&v=" + videoID;
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function () {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                var parser = new DOMParser();
                var doc = parser.parseFromeString(xhr.responseText, "text/xml");
                $('#captionText').text(doc);
            }
        }
        xhr.open('GET', videosCap);
        xhr.send(null);
        var fieldsEmpty = "";
        var part = "part=snippet";

        function getUrl(fields) {
            var url = videos + "?" + "key=" + apiKey + "&" + "id=" + videoID + "&" + fields + "&" + part;
            return url;
        }

        $.get(getUrl(fieldsEmpty), function (response) {
            var status = response.pageInfo.totalResults;
            var title;
            if (status) {
                $.get(getUrl(fieldsTitle), function (response) {
                    title = response.items[0].snippet.title;
                    $('#info').text(title);
                    var url = "https://www.youtube.com/embed/" + videoID;
                    $('#myIframe').attr('src', url)
                })
            } else {
                title = "Video doesn't exist";
                $('#info').text(title);
                $('#myIframe').attr('src', "");
            }
        });
    }, 1000);
});

var myTimer;

function onPlayerStateChange(event) {
    if (event.data == 1) { // playing
        myTimer = setInterval(function () {
            var time;
            time = player.getCurrentTime();
            $("#timeHolder").text(time);
        }, 100);
    }
    else { // not playing
        clearInterval(myTimer);
    }
}
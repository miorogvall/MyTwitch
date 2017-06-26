// background.js


chrome.browserAction.setBadgeBackgroundColor({ color: "#ef0000"});
console.log(localStorage['mi_username']);

if (localStorage['mi_username'] !== undefined) {
    getStreamsFollowed();
}
var time = 60000;


// Called when the user clicks on the browser action.
chrome.browserAction.onClicked.addListener(function(tab) {



  // Send a message to the active tab
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    var activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, {"message": "clicked_browser_action"});
  });
});

var timedAjax = setInterval(function () {

            if (localStorage['mi_username'] !== undefined) {

                getStreamsFollowed();
                showNotification(localStorage["mi_HTMLcontent"]);

                var HTMLstorage = localStorage["mi_HTMLcontent"];
                var badgenumber = $(HTMLstorage).length;
                updateBadge(badgenumber);

            }


}, time);

timedAjax();

function getStreamsFollowed() {

var HTMLstring = "";

 
    var userinputbox = localStorage["mi_username"];
    var userstreamurl = "https://api.twitch.tv/kraken/users/" + userinputbox + "/follows/channels?limit=100&sortby=last_broadcast";
    var livestreams = 0;
    

    $.ajax({
        type: 'GET'
        , url: userstreamurl
        , headers: {
            'Client-ID': '0gs3uapd46kclqjd2hhv26bj0jcd5w'
        }
        , success: function (data) {


            
            for (var key in data['follows']) {



                var streamname = data['follows'][key]['channel']['name'];

              
                var finalurl = 'https://api.twitch.tv/kraken/streams/' + streamname;
                

                $.ajax({
                    type: 'GET'
                    , url: finalurl
                    , headers: {
                        'Client-ID': '0gs3uapd46kclqjd2hhv26bj0jcd5w'
                    }
                    , success: function (data) {

                      


                        if (data['stream'] !== null) {
                            
                            livestreams++;

                          

                            if (!$.trim(data)) {
                                $('#content').append('<p>There are no live streams currently. Either you have no followed any streams, wrote the wrong username in settings or there simply isnt any of your streams you follow live</p>');
                            }




                            var game = data['stream']['game'];
                            var viewers = data['stream']['viewers'];
                            var preview = data['stream']['preview']['medium'];
                            var link = data['stream']['channel']['url'];
                            var streamer = data['stream']['channel']['name'];
                            var status = data['stream']['channel']['status'];
                            var logo = data['stream']['channel']['logo'];
                            var banner = data['stream']['channel']['profile_banner'];
                            var live = data['stream']['stream_type'];

                            var escapedgamelink = escape(game);
                            var gamelink = "https://www.twitch.tv/directory/game/" + escapedgamelink;

                            if (live !== "live") {
                                live = "VOD";


                            }


                            var HTMLcontent = '<div class="streamerarea"><div class="bg" style="background-image: url(' + banner + ')"></div><div class="streampicture"><div class="watch"><p class="watchtext"><i class="fa fa-play-circle-o" aria-hidden="true"></i></p></div><div class="live"><div class="livedot"></div><span>' + live + '</span></div><a href="' + link + '"><img src="' + preview + '"></a></div>';
                            HTMLcontent += '<div class="streamerinfo"><div class="streamer"><img class="streamerlogo" src="' + logo + '"><span class="streamername">' + streamer + '</span></div>';
                            HTMLcontent += '<div class="status">' + status + '</div>';
                            HTMLcontent += '<a class="game" href="' + gamelink + '">' + game + '</a>';
                            HTMLcontent += '<div class="viewers">' + viewers + ' Viewers</div>';


                            HTMLcontent += '</div></div>';

                            HTMLstring += HTMLcontent;
                            localStorage.removeItem('mi_HTMLcontent');
                            localStorage["mi_HTMLcontent"] = HTMLstring;
                            
                            
                            
                


                            $('.live > span').each(function () {




                                if ($(this).text() === "VOD") {

                                    $(this).closest('.live').find('.livedot').addClass('ldwhite');

                                }

                            });


                        }

                    }

                });
            }

            updateBadge(localStorage["mi_HTMLcontent"]);
        }



    });


}

function updateBadge(number) {

     number = $(number);
    var streamerslive = number.length;

    chrome.browserAction.setBadgeText({
        text: streamerslive.toString()
    });

};

function showNotification(object) {



    var array = new Array();

    object = $(object);
    
    var streamers = $(object).find('.streamername');
    console.log(streamers);

    $(streamers).each(function () {

        var streamername = $(this)["0"].innerHTML;
        array.push(streamername);

    });

    console.log(localStorage["mi_compare"]);

    if (localStorage["mi_compare"] === undefined) {
    console.log('no comparison possible');
    localStorage["mi_compare"] = array.toString();
}
    var arrayToString = array.toString();
    console.log(arrayToString);

    var arrayFromStorage = localStorage["mi_compare"];
    var arrayFromStorage = arrayFromStorage.split(",");
    console.log(arrayFromStorage);
    console.log(array);

    array.forEach(function (element) {
/*
         var game = $(object)[0].children[2].children[2].innerHTML;
        
            var streamerimage;*/


        if (arrayFromStorage.indexOf(element) === -1) {

            thisStreamer(element);

        }
        
    });

    localStorage["mi_compare"] = arrayToString;


}


    function thisStreamer(streamer) {
    


    var options = {
        type: "basic"
        , title: "MyTwitch Notification"
        , message: streamer + " just started streaming!"
        , iconUrl: "../images/icon128.png"
    };


    chrome.notifications.create(options, callback);

    function callback() {


    }

}


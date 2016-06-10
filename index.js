$(document).ready(function() {
  var customURL;
  var twitchStreamer;
  var streamerChannel;
  var loginStatus;
  var streamContent;
  var streamerLogo;
  var streaming;
  // declare variables 
  var streamersArr = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", "brunofin", "comster404"];
  // last two streamers for verification of closed accounts
  for (i = 0; i < streamersArr.length; i++) {
    twitchStreamer = streamersArr[i];
    // access user
    customURL = "https://api.twitch.tv/kraken/streams/" + twitchStreamer + "?callback=?";
    // create custom URL for api call
    $.getJSON(customURL, (function(twitchStreamer) {
        return function(data) {
          // closure to access variable defined in functions outer scope
          streaming = data.stream;
          if (streaming === null) {
            // user offline
            loginStatus = "Offline";
            streamerChannel = "http://www.twitch.tv/" + twitchStreamer;
            // user channel href
            $(".streamer-container").append("<div>");
            $(".streamer-container div").last().append("<img> </img>")
            $(".streamer-container img").last().attr("src", "https://pixabay.com/static/uploads/photo/2014/11/10/17/48/offline-525700_960_720.png").addClass("img-circle img-responsive");
            $(".streamer-container div").last().append("<a>" + twitchStreamer + "</a>");
            $(".streamer-container a").last().attr({href: streamerChannel,target: "_blank"});
            $(".streamer-container div").last().append("<p>" + loginStatus + "</p>");
            $(".streamer-container div").last().append("</div>").addClass("off");
            // set div content
          } else if (streaming !== null && streaming !== undefined) {
            // user online
            loginStatus = "Online";
            streamContent = data.stream.game;
            streamerLogo = data.stream.channel.logo;
            streamerChannel = "http://www.twitch.tv/" + twitchStreamer;
            $(".streamer-container").append("<div>");
            $(".streamer-container div").last().append("<img> </img>")
            $(".streamer-container img").last().attr("src", streamerLogo).addClass("img-circle img-responsive");
            $(".streamer-container div").last().append("<a>" + twitchStreamer + "</a>");
            $(".streamer-container a").last().attr({href: streamerChannel,target: "_blank"});
            $(".streamer-container div").last().append("<p>" + streamContent + "</p>");
            $(".streamer-container div").last().append("</div>").addClass("on");
          } else {
            // account closed
            loginStatus = "Account Closed";
            streamerChannel = "https://s.codepen.io/FreeCodeCamp/fullpage/undefined";
            $(".streamer-container").append("<div>");
            $(".streamer-container div").last().append("<img> </img>")
            $(".streamer-container img").last().attr("src", 'https://pixabay.com/static/uploads/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png').addClass("img-circle img-responsive");
            $(".streamer-container div").last().append("<a>" + twitchStreamer + "</a>");
            $(".streamer-container a").last().attr({href: streamerChannel,target: "_blank"});
            $(".streamer-container div").last().append("<p>" + loginStatus + "</p>");
            $(".streamer-container div").last().append("</div>").addClass("closed");
          }
        }
      }(twitchStreamer))) // call function with current value immediately
      .fail(function(xhr, status, error) {
        console.log(xhr.status + ": " + error);
      })
    $("#all").click(function() {
      $(".on").show();
      $(".off").show();
      $(".closed").show();
      // show all streamers
    })
    $("#online").click(function() {
      $(".on").show();
      $(".off").hide();
      $(".closed").hide();
      // show online streamers
    })
    $("#offline").click(function() {
      $(".on").hide();
      $(".off").show();
      $(".closed").show();
      // show offline streamers & deactivated accounts
    })
  }
})
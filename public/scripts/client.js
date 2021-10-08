/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(() => {
  // AJAX request to retrieve tweets from database
  // and on success to render them on the web page.
  const loadTweets = () => {
    $.ajax({
      url: "/tweets",
      method: "GET",
      success: (tweets) => {
        renderTweets(tweets);
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  // Initial rendering of tweets in the database.
  loadTweets();

  // Adds tweets from the database to the html container
  // that displays them.
  const renderTweets = function(tweets) {
    const $tweetsContainer = $("#tweets-container");

    $tweetsContainer.empty();

    for (const tweet of tweets) {
      $tweetsContainer.prepend(createTweetElement(tweet));
    }
  };

  // Create an article element for each tweet and its specifics (age, user, handle, content)
  // given tweets from the databse in JSON format.
  const createTweetElement = function(tweet) {
    // Construct <header> within <article>
    const $avatar = $("<img>").addClass("tweeted-avatar").attr("src", tweet.user.avatars);
    const $name = $("<span>").addClass("tweeted-name").text(tweet.user.name);
    const $headerDivOne = $("<div>").append($avatar, $name);
    const $handle = $("<span>").addClass("tweeted-handle").text(tweet.user.handle);
    const $headerDivTwo = $("<div>").append($handle);
    const $articleHeader = $("<header>").append($headerDivOne, $headerDivTwo);

    // Construct <textarea> within <article>
    const $content = $("<textarea>").addClass("tweeted-text").prop("disabled", true).text(tweet.content.text);

    // Construct <footer> within <article>
    const $timeAgo = $("<span>").addClass("tweeted-age").text(timeago.format(tweet["created_at"]));
    const $footerDivOne = $("<div>").append($timeAgo);
    const $flag = $("<i>").addClass("fas fa-flag");
    const $retweet = $("<i>").addClass("fas fa-retweet");
    const $heart = $("<i>").addClass("fas fa-heart");
    const $footerDivTwo = $("<div>").append($flag, $retweet, $heart);
    const $articleFooter = $("<footer>").append($footerDivOne, $footerDivTwo);

    // Construct <article>
    const $article = $("<article>").addClass("tweet").append($articleHeader, $content, $articleFooter);

    // Return <article>
    return $article;
  };

  // Handler for when a user wants to submit a new tweet.
  $("#new-tweet-form").on("submit", function(event) {
    event.preventDefault();

    const lengthOfTweet = $("#tweet-text").val().length;

    if (lengthOfTweet === 0) {
      $("#error-message").addClass("not-hidden").text("Too Short. Plz hum at least 1 char. #kthxbye.");
      $("#error-message").prepend("<i class='fas fa-exclamation-triangle'></i>&nbsp&nbsp");
      $("#error-message").append("&nbsp&nbsp<i class='fas fa-exclamation-triangle'></i>");
    }

    if (lengthOfTweet > 140) {
      $("#error-message").addClass("not-hidden").text("Too Long. Plz rspct our arbitrary limit of 140 chars. #kthxbye.");
      $("#error-message").prepend("<i class='fas fa-exclamation-triangle'></i>&nbsp&nbsp");
      $("#error-message").append("&nbsp&nbsp<i class='fas fa-exclamation-triangle'></i>");
    }

    if (lengthOfTweet > 0 && lengthOfTweet <= 140) {
      const tweetFormSerializedData = $(this).serialize();

      $.ajax({
        url: "/tweets",
        type: "POST",
        data: tweetFormSerializedData,
        success: () => {
          $("#tweet-text").val('');
          $(".counter").val(140);
          $("#error-message").attr("class", "hidden").text("");
          loadTweets();
        },
        error: (error) => {
          console.log(error);
        }
      })
    }
  });

  // Handler for when a user clicks the area around the
  // "Write a new tweet" text.
  $("#write-new-tweet").click(function() {
    $("#new-tweet-form").slideToggle(200);
    $("#tweet-text").focus();
  });

  // Handler for when a user clicks the red circular button
  // that appears when scrolling down.
  $("#go-top-button").click(function() {
    $(window).scrollTop(0);
    $("#new-tweet-form").toggle(true);
    $("#tweet-text").focus();
  });

  // Handler for when a user scrolls down the web page.
  // When scrolled down the web page a certain amount,
  // allows the go-to-top button to appear.
  $(window).scroll(function() {
    if ($(this).scrollTop()) {
      $("#go-top-button").attr("class", "scrolled");
    } else {
      $("#go-top-button").attr("class", "not-scrolled");
    }
  });
});
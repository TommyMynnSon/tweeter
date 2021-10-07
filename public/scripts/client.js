/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(() => {
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

  loadTweets();

  const renderTweets = function(tweets) {
    const $tweetsContainer = $("#tweets-container");

    $tweetsContainer.empty();

    for (const tweet of tweets) {
      $tweetsContainer.prepend(createTweetElement(tweet));
    }
  };

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
});
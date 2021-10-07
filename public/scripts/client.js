/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

const tweets = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1633392708590
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd"
    },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1633479108590
  }
];

$(document).ready(() => {
  const renderTweets = function(tweets) {
    for (const tweet of tweets) {
      $("#tweets-container").append(createTweetElement(tweet));
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

  renderTweets(tweets);
});

/* <article class="tweet">
  <header>
    <div>
      <i class="far fa-kiss-beam fa-2x tweeted-avatar"></i>
      <span class="tweeted-name">Tommy Son</span>
    </div>
    <div>
      <span class="tweeted-handle">
        @TommySon
      </span>
    </div>
  </header>
  <textarea disabled
    class="tweeted-text">THERE ARE 140 CHARACTERS IN THIS TWEET. THERE ARE 100 CHARACTERS IN THIS TWEET. THERE ARE 100 CHARACTERS IN THIS TWEET. WEEEEEEEEEEEEEEEEEE.</textarea>
  <footer>
    <div>
      <span class='tweeted-age'>10 days ago</span>
    </div>
    <div>
      <i class="fas fa-flag"></i>
      <i class="fas fa-retweet"></i>
      <i class="fas fa-heart"></i>
    </div>
  </footer>
</article> */
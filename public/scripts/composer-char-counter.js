// Updates the character count via jQuery
// as a user is forming a new tweet.
$(document).ready(function() {
  $('#tweet-text').on('input', function() {
    const numberOfCharacters = $('#' + this.id).val().length;
    const parentNode = $(this).parents().get(0);
    const counterNode = $(parentNode).find(".counter");

    $(counterNode).text(140 - numberOfCharacters);

    if ((140 - numberOfCharacters) < 0) {
      $(counterNode).css('color', 'red');
    } else {
      $(counterNode).css('color', 'rgb(94, 94, 94)');
    }
  });
});


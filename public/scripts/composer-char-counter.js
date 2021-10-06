$(document).ready(function() {
  console.log('document is ready for jQuery.');

  $('#tweet-text').on('input', function() {
    const numberOfCharacters = $('#' + this.id).val().length;
    const parentNode = $(this).parents().get(0);
    const divNodeForCounterNode = $(parentNode).children().get(5);
    const counterNode = $(divNodeForCounterNode).children().get(1);

    $(counterNode).text(140 - numberOfCharacters);

    if ((140 - numberOfCharacters) < 0) {
      $(counterNode).css('color', 'red');
    } else {
      $(counterNode).css('color', 'rgb(94, 94, 94)');
    }
  });
});


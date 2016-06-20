// toggles has-value class on focusout depending on input value
$(function() {
  $('.group input, .group textarea').focusout(function() {
    var text_val = $(this).val();

    if (text_val === '') {
      $(this).removeClass('has-value');
    } else {
      $(this).addClass('has-value');
    }
  });
});

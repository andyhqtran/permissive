$(document).ready(function() {
  $('#navigation__toggle').on('click', function() {
    $(this).parent().toggleClass('navigation--active');
  });
});

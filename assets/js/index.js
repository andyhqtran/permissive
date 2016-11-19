$(document).ready(function() {
  var tl = new TimelineMax();

  $('#navigation__toggle').on('click', function() {
    $(this).parent().toggleClass('navigation--active');
  });
});

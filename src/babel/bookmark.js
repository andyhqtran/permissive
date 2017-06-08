$(document).ready(() => {
  $('#bookmarkMenuOpen').on('click', () => {
    $('.bookmark-menu').toggleClass('is-active');
  });


  if ($.isEmptyObject(JSON.stringify(localStorage.getItem('bookmarks')))) {
    localStorage.setItem('bookmarks', JSON.stringify({}));
  }

  $('#bookmarkMenuSave').on('click', () => {
    const post = JSON.parse(localStorage.getItem('bookmarks'));

    post[window.post.id] = window.post;

    localStorage.setItem('bookmarks', JSON.stringify(post));
  });
});

function clearListItem() {
  $('.bookmark-menu').find('.bookmark-menu__list').empty();
}

function renderListItem(post) {
  const listItem = $(`<li class="bookmark-menu__list-item" data-bookmark-id="${post.id}" />`);

  const listContent = $('<div class="bookmark-menu__list-content" />');
  listContent.append(`<h6><a href="${post.url}">${post.title}</a></h6>`);
  listContent.append(`<p>${post.excerpt}</p>`);

  const listDelete = $('<a class="bookmark-menu__list-delete" data-bookmark-action="delete" href="#" />');
  listDelete.append('<span class="ion ion-close-circled"></span>');

  listItem.append(listContent);
  listItem.append(listDelete);

  $('.bookmark-menu__list').append(listItem);
}

function clearBookmarkData() {
  localStorage.setItem('bookmarks', JSON.stringify({}));
}

function getBookmarkData() {
  return JSON.parse(localStorage.getItem('bookmarks'));
}

function saveBookmarkData(data) {
  localStorage.setItem('bookmarks', JSON.stringify(data));
}

function deleteBookmarkData(id) {
  const data = getBookmarkData();

  delete data[id];

  saveBookmarkData(data);
}

$(document).ready(() => {
  if (window.post) {
    if (!$.isEmptyObject(getBookmarkData()[window.post.id])) {
      if (getBookmarkData()[window.post.id].id === window.post.id) {
        $('[data-bookmark-action="save"]').css({ background: '#FFFFFF', color: '#4C4C4C' });
        $('[data-bookmark-action="save"]').find('span').addClass('ion-checkmark-round');
      }
    }
  }

  $('[data-bookmark-action="open"]').on('click', () => {
    const posts = getBookmarkData();

    clearListItem();

    if ($.isEmptyObject(posts)) {
      const listItem = $('<li class="bookmark-menu__list-item is-null" />').text('No post have been saved.');

      $('.bookmark-menu__list').append(listItem);
    }

    $('.bookmark-menu').toggleClass('is-active');

    $.each(posts, (index, post) => {
      renderListItem(post);
    });
  });

  $('[data-bookmark-action="clear"]').on('click', () => {
    clearListItem();

    clearBookmarkData();

    if ($.isEmptyObject(getBookmarkData())) {
      const listItem = $('<li class="bookmark-menu__list-item is-null" />').text('No post have been saved.');

      $('.bookmark-menu__list').append(listItem);
    }
  });

  $('.bookmark-menu').on('click', '[data-bookmark-action="delete"]', (event) => {
    const parent = $(event.currentTarget).closest('li.bookmark-menu__list-item');
    const postId = parent.attr('data-bookmark-id');

    deleteBookmarkData(postId);

    parent.remove();


    $('[data-bookmark-action="save"]').attr('style', '');
    $('[data-bookmark-action="save"]').find('span').addClass('ion-checkmark-round');

    if (parent.length > 0) {
      const listItem = $('<li class="bookmark-menu__list-item is-null" />').text('No post have been saved.');

      $('.bookmark-menu__list').append(listItem);
    }
  });

  if ($.isEmptyObject(JSON.stringify(localStorage.getItem('bookmarks')))) {
    localStorage.setItem('bookmarks', JSON.stringify({}));
  }

  $('[data-bookmark-action="save"]').on('click', (event) => {
    const posts = getBookmarkData();

    $(event.currentTarget).css({ background: '#FFFFFF', color: '#4C4C4C' });
    $(event.currentTarget).find('span').addClass('ion-checkmark-round');

    if (posts[window.post.id] === window.post.id) {
      return;
    }

    if (!posts[window.post.id]) {
      posts[window.post.id] = window.post;
    }

    saveBookmarkData(posts);
  });
});

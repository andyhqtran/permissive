function createPost(data, type) {
  if (!window.page || !type) {
    return false;
  }

  let post;

  if (type === 'blog') {
    post = $('<article class="article" />');

    const postHeader = $('<header class="article__header" />');

    const date = new Date(data.published_at).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: '2-digit',
    });

    postHeader.append(`<time class="article__date" datetime="${date}">${date}</time>`);

    const postTags = $('<div class="article__tags" />');

    for (let i = 0; i < data.tags.length; i += 1) {
      if (i === 0) {
        postTags.append(`<a href="/tag/${data.tags[i].name}">${data.tags[i].name}</a>`);
      } else {
        postTags.append(`<a href="/tag/${data.tags[i].name}">, ${data.tags[i].name}</a>`);
      }
    }

    postHeader.append('<span style="margin: 0 5px; vertical-align: middle;"> &middot; </span>');
    postHeader.append(postTags);
    postHeader.append(`<h2 class="article__title"><a href="${data.url}">${data.title}</a></h2>`);

    post.append(postHeader);

    const postContent = $('<section class="article__content" />');

    if (data.markdown.length > 500) {
      postContent.html(`${data.html.substr(0, 500).replace(/\s+$/, '')}...`);
    } else {
      postContent.html(data.html.replace(/\s+$/, ''));
    }

    postContent.children().contents(':not(p):not(b):not(i):not(u):not(a):not(strong):not(em), .button, .input').remove();
    postContent.contents('div, blockquote, pre, code, hr, br').remove();

    post.append(postContent);

    const postFooter = $('<footer class="article__footer" />');

    const postButtonGroup = $('<div class="button-group" />');
    postButtonGroup.append(`<a class="button button--primary" href="${data.url}">View Post</a>`);
    postButtonGroup.append('<button class="button"><span class="ion ion-android-bookmark"></span></button>');

    postFooter.append(postButtonGroup);

    post.append(postFooter);
  }

  if (type === 'project') {
    post = $('<div class="project" />');

    const postHeader = $('<header class="project__header" />');
    postHeader.append(`<h5 class="project__title"><a href="${data.url}">${data.title}</a></h5>`);

    const postSubTitle = $('<h6 class="project__sub-title" />');

    for (let i = 0; i < data.tags.length; i += 1) {
      if (i === 0) {
        postSubTitle.append(`<a href="/tag/${data.tags[i].name}">${data.tags[i].name.toUpperCase()}</a>`);
      } else {
        postSubTitle.append(`<a href="/tag/${data.tags[i].name}">, ${data.tags[i].name.toUpperCase()}</a>`);
      }
    }

    postHeader.append(postSubTitle);

    post.append(postHeader);

    if (data.image) {
      const postThumbnail = $('<div class="project__thumbnail" />');
      postThumbnail.append(`<img alt="${data.title}" src="${data.image}" />`);

      post.append(postThumbnail);
    }

    const postContent = $('<div class="project__content" />');

    if (data.markdown.length > 125) {
      postContent.append(`<p class="project__excerpt">${data.markdown.substr(0, 125).replace(/\s+$/, '')}...</p>`);
    } else {
      postContent.append(`<p class="project__excerpt">${data.markdown}</p>`);
    }

    postContent.append(`<a class="button" href="${data.url}"><span>Read More</span> <span class="icon ion-arrow-right-c" style="font-size: 0.625rem;"></span></a>`);

    post.append(postContent);
  }

  return post;
}

/**
 * [onSuccess success callback method]
 * @param  {[object]} data [data object from ajax request]
 * @return {[null]}        [null]
 */
function onSuccess(data) {
  if (window.page.type === 'post') {
    $('.blog-grid').empty();
  }

  if (window.page.type === 'project') {
    $('.project-grid').empty();
  }

  $.each(data.posts, (i, post) => {
    if (window.page.type === 'post') {
      $('.blog-grid').append(createPost(post, 'blog'));
    }

    if (window.page.type === 'project') {
      $('.project-grid').append(createPost(post, 'project'));
    }
  });
}

function postRequest(options) {
  return $.get(ghost.url.api('posts', options));
}

function checkCurrentPage(currentPage, postsPerPage) {
  return postRequest({
    filter: window.page.filter || console.warn('Filter must be provided'),
    order: window.page.order || console.warn('Order must be provided'),
    page: currentPage,
    limit: postsPerPage,
  }).done((data) => {
    if (data.posts.length < 1) {
      $('#pagination-right').attr('disabled', true).addClass('button--disabled');
    }
  });
}

function checkNextPage(currentPage, postsPerPage) {
  return postRequest({
    filter: window.page.filter || console.warn('Filter must be provided'),
    order: window.page.order || console.warn('Order must be provided'),
    page: currentPage + 1,
    limit: postsPerPage,
  }).done((data) => {
    if (data.posts.length < 1) {
      $('#pagination-right').attr('disabled', true).addClass('button--disabled');
    }
  });
}

jQuery(document).ready(() => {
  /**
   * [if ghost api url is enabled and page variable declared]
   * @return {[boolean]} [false if ghost api url is not enabled or page variable not declared]
   */
  if (!ghost.url.api || !window.page) {
    console.log('nope');
    return false;
  }

  let currentPage = parseInt(window.location.hash.substring(1), 10) || 1;

  const postsPerPage = window.page.limit || 1;

  const options = {
    include: 'tags,author',
    filter: window.page.filter || console.warn('Filter must be provided'),
    order: window.page.order || console.warn('Order must be provided'),
    page: currentPage,
    limit: postsPerPage,
  };

  const pagination = $('<div class="pagination" />');

  const buttonGroup = $('<div class="button-group" />');
  buttonGroup.append('<button class="button" id="pagination-left"><span class="icon ion-arrow-left-c"></span></button>');
  buttonGroup.append('<button class="button" id="pagination-right"><span class="icon ion-arrow-right-c"></span></button>');

  pagination.append(buttonGroup);

  $('.page__container').append(pagination);

  if (currentPage === 1) {
    $('#pagination-left').attr('disabled', true).addClass('button--disabled');
  }

  checkCurrentPage(currentPage, postsPerPage);

  checkNextPage(currentPage, postsPerPage);

  $('#pagination-left').on('click', () => {
    if (currentPage === 1) {
      return false;
    }

    currentPage -= 1;
    options.page -= 1;

    if (currentPage === 1) {
      $('#pagination-left').attr('disabled', true).addClass('button--disabled');
    }

    $('#pagination-right').attr('disabled', false).removeClass('button--disabled');

    window.location.hash = `#${currentPage}`;

    checkNextPage(currentPage, postsPerPage);

    return postRequest(options).done(onSuccess);
  });

  $('#pagination-right').on('click', () => {
    currentPage += 1;
    options.page += 1;

    $('#pagination-left').attr('disabled', false).removeClass('button--disabled');

    window.location.hash = `#${currentPage}`;

    checkNextPage(currentPage, postsPerPage);

    return postRequest(options).done(onSuccess);
  });

  return postRequest(options).done(onSuccess);
});

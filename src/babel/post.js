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
        postTags.append(`<a href="/tag/${data.tags[i].name}">${data.tags[i].name.toUpperCase()}</a>`);
      } else {
        postTags.append(`<a href="/tag/${data.tags[i].name}">, ${data.tags[i].name.toUpperCase()}</a>`);
      }
    }

    postHeader.append('<span style="margin: 0 5px; vertical-align: middle;"> &middot; </span>');
    postHeader.append(postTags);
    postHeader.append(`<h2 class="article__title"><a href="${data.url}">${data.title}</a></h2>`);

    post.append(postHeader);

    const postContent = $('<section class="article__content" />');

    if (data.markdown.length > 500) {
      postContent.append(`<p>${data.html.substr(0, 500).replace(/\s+$/, '')}...</p>`);
    } else {
      postContent.append(`<p>${data.html}</p>`);
    }

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
  // const currentPage = parseInt(window.location.hash.substring(1), 10) || 1;
  const projectsPerPage = 3;

  $.each(data.posts, (i, post) => {
    if (window.page.type === 'post') {
      $('.blog-grid').append(createPost(post, 'blog'));
    }

    if (window.page.type === 'project') {
      $('.project-grid').append(createPost(post, 'project'));
    }
  });

  if (data.posts.length > projectsPerPage) {
    const pagination = $('<div class="pagination" />');

    const buttonGroup = $('<div class="button-group" />');

    for (let i = 0; Math.ceil(data.posts.length / projectsPerPage) > i; i += 1) {
      buttonGroup.append(`<button class="button">${(i + 1)}</button>`);
    }

    if (Math.ceil(data.posts.length / projectsPerPage) >= 2) {
      buttonGroup.append('<button class="button"><span class="icon ion-arrow-right-c"></span></button>');
    }

    pagination.append(buttonGroup);

    $('.page__container').append(pagination);
  }

  $('.loading').remove();
}

jQuery(document).ready(() => {
  /**
   * [if ghost api url is enabled and page variable declared]
   * @return {[boolean]}             [return false if ghost api url is not enabled or page variable not declared]
   */
  if (!ghost.url.api || !window.page) {
    return false;
  }

  $.get(ghost.url.api('posts', {
    include: 'tags,author',
    filter: window.page.filter || console.warn('Filter must be provided'),
    limit: 'all',
  })).done(onSuccess);
});

function onSuccess() {}

jQuery(document).ready(() => {
  $.get(ghost.url.api('posts', {
    include: 'tags,author',
    limit: 'all',
  })).done(onSuccess);
});

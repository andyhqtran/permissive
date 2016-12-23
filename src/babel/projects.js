/**
 * [createProject creates project based on data provided]
 * @param  {[object]} data [passes data used to create project element]
 * @return {[object]}      [returns project element]
 */
function createProject(data) {
  const project = $('<div class="project" />');

  const projectHeader = $('<header class="project__header" />');
  projectHeader.append(`<h5 class="project__title">${data.title}</h5>`);

  const projectSubTitle = $('<h6 class="project__sub-title" />');

  for (let i = 0; i < data.tags.length; i += 1) {
    if (i === 0) {
      projectSubTitle.append(`<a href="/tag/${data.tags[i].name}">${data.tags[i].name.toUpperCase()}</a>`);
    } else {
      projectSubTitle.append(`<a href="/tag/${data.tags[i].name}">, ${data.tags[i].name.toUpperCase()}</a>`);
    }
  }

  projectHeader.append(projectSubTitle);

  const projectThumbnail = $('<div class="project__thumbnail" />');
  projectThumbnail.append(`<img alt="${data.name}" src="${data.image}" />`);

  const projectContent = $('<div class="project__content" />');

  if (data.markdown.length > 125) {
    projectContent.append(`<p class="project__excerpt">${data.markdown.substr(0, 125).replace(/\s+$/, '')}...</p>`);
  } else {
    projectContent.append(`<p class="project__excerpt">${data.markdown}</p>`);
  }

  projectContent.append(`<a class="button" href="${data.url}"><span>Read More</span> <span class="icon ion-arrow-right-c" style="font-size: 0.625rem;"></span></a>`);

  project.append(projectHeader);
  project.append(projectThumbnail);
  project.append(projectContent);

  return project;
}

/**
 * [onSuccess success callback function]
 * @param  {[object]} data [data object from ajax call]
 * @return {[null]}      [null]
 */
function onSuccess(data) {
  // const currentPage = parseInt(window.location.hash.substring(1), 10) || 1;

  const projectsPerPage = 3;

  $.each(data.posts, (i, post) => {
    $('.project-grid').append(createProject(post));
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
}

jQuery(document).ready(() => {
  $.get(ghost.url.api('posts', {
    filter: 'tags:[case-study,project,case-studies]',
    include: 'tags',
    limit: 'all',
  })).done(onSuccess);
});

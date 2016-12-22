jQuery(document).ready(function() {
  $.get(ghost.url.api('posts', {
    filter: 'tags:[case-study,project]',
    include: 'tags',
    limit: 6,
  })).done(onSuccess);
});

function onSuccess(data) {
  $.each(data.posts, function(i, post) {
    $('.project-grid').append(createProject(post));
  });
}

function createProject(data) {
  var project = $('<div class="project" />');

  var projectHeader = $('<header class="project__header" />');
  projectHeader.append('<h5 class="project__title">' + data.title + '</h5>');

  var projectSubTitle = $('<h6 class="project__sub-title" />');

  for(var i = 0; i < data.tags.length; i++) {
    if (i === 0) {
      projectSubTitle.append('<a href="/tag/' + data.tags[i].name + '">' + data.tags[i].name.toUpperCase() + '</a>');
    } else {
      projectSubTitle.append('<a href="/tag/' + data.tags[i].name + '">, ' + data.tags[i].name.toUpperCase() + '</a>');
    }
  }

  projectHeader.append(projectSubTitle)

  var projectThumbnail = $('<div class="project__thumbnail" />');
  projectThumbnail.append('<img alt="' + data.name + '" src="' + data.image + '" />');

  var projectContent = $('<div class="project__content" />');

  if (data.markdown.length > 125) {
    projectContent.append('<p class="project__excerpt">' + data.markdown.substr(0, 125).replace(/\s+$/, '') + '...</p>');
  } else {
    projectContent.append('<p class="project__excerpt">' + data.markdown + '</p>');
  }

  projectContent.append('<a class="button" href="' + data.url + '"><span>Read More</span> <span class="icon ion-arrow-right-c" style="font-size: 0.625rem;"></span></a>');

  project.append(projectHeader);
  project.append(projectThumbnail);
  project.append(projectContent);

  return project;
}

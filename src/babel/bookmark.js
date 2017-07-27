function getBookmarks() {
  const data = localStorage.getItem('bookmarks');

  if (!data) {
    localStorage.setItem('bookmarks', JSON.stringify({}));
  }
  // return {};
  return JSON.parse(localStorage.getItem('bookmarks'));
}

const BookmarkMenu = new Vue({
  el: '.bookmark-menu',
  delimiters: ['${', '}'],
  data: {
    pageId: window.post.id,
    message: 'test',
    bookmarks: getBookmarks(),
  },

  mounted() {
    this.handleSaveButtonChange();
  },

  methods: {
    handleSaveButtonChange() {
      if (this.bookmarks[this.pageId]) {
        return $('#bookmark-save')
          .css({ background: '#FFFFFF', color: '#4C4C4C' })
          .find('span').addClass('ion-checkmark-round');
      }

      return $('#bookmark-save')
          .attr('style', '')
          .find('span').removeClass('ion-checkmark-round');
    },
    handlePostSave() {
      Vue.set(this.bookmarks, window.post.id, window.post);
    },
  },

  watch: {
    bookmarks(val) {
      const data = JSON.stringify(val);

      console.log('updating');

      localStorage.setItem('bookmarks', data);

      this.handleSaveButtonChange();
    },
  },
});

$('[data-bookmark-action="open"]').on('click', () => {
  $('.bookmark-menu').toggleClass('is-active');
});

$('[data-bookmark-action="save"]').on('click', () => {
  BookmarkMenu.handlePostSave();

  $('.bookmark-menu').addClass('is-active');
});

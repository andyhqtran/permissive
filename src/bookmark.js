/* eslint-disable */
import { h, render, Component } from 'preact';

class Bookmark extends Component {
  render() {
    return (
      <div
        className="bookmark-menu"
        ref={bookmark => window.bookmark = bookmark}
      >
        <header className="bookmark-menu__header">
          <span>Bookmarks</span>

          <button className="button is-ghost">
            <span className="ion ion-trash-b"></span>
          </button>
        </header>

        <section className="bookmark-menu__content">
          <ul className="bookmark-menu__list">
            <li className="bookmark-menu__list-item">
              <div className="bookmark-menu__list-content">
                <h6>bookmark.title</h6>
                <p>bookmark.excerpt</p>
              </div>
              <a className="bookmark-menu__list-delete">
                <span className="ion ion-close-circled" />
              </a>
            </li>
          </ul>

          <ul className="bookmark-menu__list" v-else>
            <li className="bookmark-menu__list-item is-null">No post have been saved.</li>
          </ul>
        </section>

       <footer className="bookmark-menu__footer">
          <a className="button is-block is-ghost" href="#bookmarks">View All</a>
        </footer>
      </div>
    );
  }
};

render(<Bookmark />, document.getElementById('js-bookmark'));

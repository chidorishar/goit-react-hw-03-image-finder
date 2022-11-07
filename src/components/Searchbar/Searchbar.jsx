import PropTypes from 'prop-types';

import css from './Searchbar.module.css';

export function Searchbar({ onFormSubmitCallback }) {
  return (
    <header className={css.searchbar}>
      <form
        className={css.searchForm}
        onSubmit={e => {
          e.preventDefault();
          onFormSubmitCallback(e.target.elements.userQuery.value);
        }}
      >
        <button type="submit" className={css.searchForm_Button}>
          &#128270;
          <span className={css.searchForm_Button_Label}>Search</span>
        </button>

        <input
          className={css.searchForm_Input}
          type="text"
          name="userQuery"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  onFormSubmitCallback: PropTypes.func.isRequired,
};

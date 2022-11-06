import css from './Searchbar.module.css';

export function Searchbar() {
  return (
    <header className={css.searchbar}>
      <form className={css.searchForm}>
        <button type="submit" className={css.searchForm_Button}>
          &#128270;
          <span className={css.searchForm_Button_Label}>Search</span>
        </button>

        <input
          className={css.searchForm_Input}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
}

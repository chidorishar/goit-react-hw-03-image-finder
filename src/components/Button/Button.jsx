import css from './Button.module.css';

export function Button({ clickHandler, children }) {
  return (
    <button type="button" className={css.button} onClick={clickHandler}>
      {children}
    </button>
  );
}

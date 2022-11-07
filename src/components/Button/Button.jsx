import PropTypes from 'prop-types';

import css from './Button.module.css';

export function Button({ clickHandler, children }) {
  return (
    <button type="button" className={css.button} onClick={clickHandler}>
      {children}
    </button>
  );
}

Button.propTypes = {
  clickHandler: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
};

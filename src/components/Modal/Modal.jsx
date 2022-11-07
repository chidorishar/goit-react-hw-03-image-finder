import PropTypes from 'prop-types';
import { Component } from 'react';
import css from './Modal.module.css';

export class Modal extends Component {
  static propTypes = {
    imageData: PropTypes.shape({
      id: PropTypes.number.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    }),
    closeModalCallback: PropTypes.func.isRequired,
  };

  componentDidMount() {
    window.addEventListener('keydown', this.onKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onKeyDown);
  }

  onKeyDown = e => {
    if (e.code === 'Escape') this.props.closeModalCallback();
  };

  render() {
    const { imageData, closeModalCallback } = this.props;
    return (
      <div
        className={css.overlay}
        onClick={e => e.target === e.currentTarget && closeModalCallback()}
      >
        <div className={css.modal}>
          <img src={imageData.largeImageURL} alt={`id: ${imageData.id}`} />
        </div>
      </div>
    );
  }
}

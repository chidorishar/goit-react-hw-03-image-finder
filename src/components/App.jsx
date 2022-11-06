import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';

import css from './App.module.css';

export class App extends Component {
  render() {
    return (
      <div className={css.app}>
        <Searchbar />
        <ImageGallery />
        <Button>Load More</Button>
        <Modal />
      </div>
    );
  }
}

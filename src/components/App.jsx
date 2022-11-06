import { Component } from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';

import { PixabayAPI } from 'services/fetchImagesAPI';
import { responseToImagesData } from 'helpers/responseToImagesData';

import css from './App.module.css';

export class App extends Component {
  state = { searchQuery: null, imagesData: null, imageDataToShowInModal: null };
  #pixabayAPI = null;

  constructor() {
    super();
    this.#pixabayAPI = new PixabayAPI();
  }

  onGalleryCardClicked = clickedImageData =>
    this.setState({ imageDataToShowInModal: clickedImageData });

  onUserSearchInput = async query => {
    if (!query) return;

    const response = await this.#pixabayAPI.loadImagesByQuery(query);
    this.setState({ imagesData: responseToImagesData(response) });
  };

  closeModal = () => this.setState({ imageDataToShowInModal: null });

  showMoreImages = async () => {
    let response = null;

    if (this.#pixabayAPI.canLoadMoreImages()) {
      response = await this.#pixabayAPI.loadMoreImages();
      this.setState(prevState => ({
        imagesData: [
          ...prevState.imagesData,
          ...responseToImagesData(response),
        ],
      }));
    }
  };

  render() {
    const { imageDataToShowInModal, imagesData } = this.state;

    return (
      <div className={css.app}>
        <Searchbar onFormSubmitCallback={this.onUserSearchInput} />
        {imagesData?.length && (
          <>
            <ImageGallery
              imagesData={imagesData}
              onImageClickCallback={this.onGalleryCardClicked}
            />
            <Button clickHandler={this.showMoreImages}>Load More</Button>
          </>
        )}

        {imageDataToShowInModal && (
          <Modal
            imageData={imageDataToShowInModal}
            closeModalCallback={this.closeModal}
          />
        )}
      </div>
    );
  }
}

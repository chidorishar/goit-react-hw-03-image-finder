import { Component } from 'react';

import { ThreeCircles } from 'react-loader-spinner';

import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';

import { PixabayAPI } from 'services/fetchImagesAPI';
import { responseToImagesData } from 'helpers/responseToImagesData';

import css from './App.module.css';

export class App extends Component {
  state = {
    searchQuery: null,
    imagesData: null,
    imageDataToShowInModal: null,
    isWaitingForImages: false,
  };
  #pixabayAPI = null;
  #scrollToElSelector = null;

  constructor() {
    super();
    this.#pixabayAPI = new PixabayAPI();
  }

  componentDidUpdate() {
    if (!this.#scrollToElSelector) return;

    const el = document.querySelector(this.#scrollToElSelector);
    el.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
      inline: 'nearest',
    });
    this.#scrollToElSelector = null;
  }

  onGalleryCardClicked = clickedImageData =>
    this.setState({ imageDataToShowInModal: clickedImageData });

  onUserSearchInput = async query => {
    if (!query) return;

    this.setState({ isWaitingForImages: true });
    const response = await this.#pixabayAPI.loadImagesByQuery(query);
    this.setState({
      imagesData: responseToImagesData(response),
      isWaitingForImages: false,
    });
  };

  closeModal = () => this.setState({ imageDataToShowInModal: null });

  showMoreImages = async () => {
    let response = null;

    if (this.#pixabayAPI.canLoadMoreImages()) {
      this.setState({ isWaitingForImages: true });
      response = await this.#pixabayAPI.loadMoreImages();
      this.setState(prevState => ({
        imagesData: [
          ...prevState.imagesData,
          ...responseToImagesData(response),
        ],
        isWaitingForImages: false,
      }));
      this.#scrollToElSelector = `img[alt="id: ${response[0].id}"]`;
    }
  };

  render() {
    const { imageDataToShowInModal, imagesData, isWaitingForImages } =
      this.state;

    return (
      <div className={css.app}>
        <Searchbar onFormSubmitCallback={this.onUserSearchInput} />
        {imagesData?.length && (
          <ImageGallery
            imagesData={imagesData}
            onImageClickCallback={this.onGalleryCardClicked}
          />
        )}
        {isWaitingForImages && (
          <ThreeCircles
            height="100"
            width="100"
            color="#4fa94d"
            middleCircleColor="#8c4da9"
            wrapperStyle={{ margin: '0 auto' }}
            visible={true}
            ariaLabel="three-circles-rotating"
          />
        )}
        {imagesData?.length && (
          <Button clickHandler={this.showMoreImages}>Load More</Button>
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

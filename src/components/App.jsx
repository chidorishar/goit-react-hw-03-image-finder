import { Component } from 'react';

import { ThreeCircles } from 'react-loader-spinner';

import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from './Button/Button';
import { Modal } from './Modal/Modal';

import { pixabayAPI } from 'services/fetchImagesAPI';
import { responseToImagesData } from 'helpers/responseToImagesData';

import css from './App.module.css';

export class App extends Component {
  state = {
    searchQuery: null,
    page: 1,
    imagesData: null,
    imageDataToShowInModal: null,
    isWaitingForImages: false,
  };

  async componentDidUpdate(prevProps, prevState) {
    //TODO scroll to first of newly loaded images

    const { searchQuery, page } = this.state;

    //load new images
    if (prevState.page !== page || prevState.searchQuery !== searchQuery) {
      this.setState({ isWaitingForImages: true });
      const response = await pixabayAPI(searchQuery, page);
      //there is new images in response
      if (response.length)
        this.setState(prevState => ({
          imagesData: [
            ...prevState.imagesData,
            ...responseToImagesData(response),
          ],
        }));
      this.setState({
        isWaitingForImages: false,
      });
    }
  }

  onGalleryCardClicked = clickedImageData =>
    this.setState({ imageDataToShowInModal: clickedImageData });

  onUserSearchInput = async searchQuery => {
    if (!searchQuery) return;

    this.setState({ searchQuery, page: 1, imagesData: [] });
  };

  closeModal = () => this.setState({ imageDataToShowInModal: null });

  incrementPaginationByOne = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
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
          <Button clickHandler={this.incrementPaginationByOne}>
            Load More
          </Button>
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

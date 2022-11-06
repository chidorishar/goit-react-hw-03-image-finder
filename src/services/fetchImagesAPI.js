import axios from 'axios';

export class PixabayAPI {
  #URL = 'https://pixabay.com/api/';
  #searchOptions = {
    key: '28936627-cce82c9af8b6ea5e0aa07396c',
    q: '',
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page: 1,
    per_page: 12,
  };
  #totalHits = 0;
  #loadedNumber = 0;

  constructor() {
    axios.defaults.baseURL = this.#URL;
  }

  canLoadMoreImages() {
    return this.#totalHits !== this.#loadedNumber;
  }

  async loadImagesByQuery(searchQuery) {
    this.#searchOptions.page = 1;
    this.#loadedNumber = 0;
    this.#searchOptions.q = searchQuery;

    const response = await this.#fetchImages();
    this.#totalHits = response.totalHits;
    this.#loadedNumber += response.hits.length;

    return response.hits;
  }

  async loadMoreImages() {
    this.#searchOptions.page++;

    const response = await this.#fetchImages();
    this.#loadedNumber += response.hits.length;

    return response.hits;
  }

  async #fetchImages() {
    const response = await axios('', { params: this.#searchOptions });

    if (response.status === 200) {
      return response.data;
    } else {
      throw new Error(response.statusText);
    }
  }
}

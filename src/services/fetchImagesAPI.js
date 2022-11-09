import axios from 'axios';

export const searchOptions = {
  key: '28936627-cce82c9af8b6ea5e0aa07396c',
  q: '',
  image_type: 'photo',
  orientation: 'horizontal',
  safesearch: true,
  page: 1,
  per_page: 12,
};
axios.defaults.baseURL = 'https://pixabay.com/api/';

export async function pixabayAPI(searchQuery, page) {
  const response = await axios('', {
    params: { ...searchOptions, q: searchQuery, page },
  });

  const { hits, totalHits } = response.data;
  if (response.status === 200) {
    return { hits, totalHits };
  } else {
    throw new Error(response.statusText);
  }
}

'use strict';
import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '29945626-39ff6bec5d272e3c72434b7df';

export class UnsplashApi {

  constructor() {
    this.page = 1;
      this.searchQuery = '';
      this.per_page = 40;
  }
    fetchPhotosByQuery = () => {
        const searchParams = {
            key: API_KEY,
            q: this.searchQuery,
            image_type: 'photo',
            orientation: 'horizontal',
            safesearch: 'true',
            page: this.page,
            per_page: this.per_page,
        };

        return axios.get(`${BASE_URL}`, { params: searchParams })
    };
}
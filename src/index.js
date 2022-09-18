import './css/styles.css'
import { UnsplashApi } from './js/unsplash-api'
import Notiflix from 'notiflix'
import axios from 'axios';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import posts from './handlebarl/posts.hbs'


const searchForm = document.querySelector('.form');
const galleryEl = document.querySelector('.section');
const loadMoreBtnEl = document.querySelector('.load-more');

const unsplashApi = new UnsplashApi();

const lightbox = new SimpleLightbox('.photo-card a');

const onSearthFormSubmit = async event => {
    event.preventDefault();

    unsplashApi.searchQuery = event.currentTarget.elements.searchQuery.value;
    unsplashApi.page = 1;
loadMoreBtnEl.classList.add('is-hiden')

        try {
            const { data } = await unsplashApi.fetchPhotosByQuery()
            galleryEl.innerHTML = posts(data.hits);
            lightbox.refresh();

            if (data.totalHits > unsplashApi.per_page) {
                loadMoreBtnEl.classList.remove('is-hiden')  
            } 

            if (data.totalHits === 0) { 
                galleryEl.innerHTML = '';
                 Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.")
                return 
            }      
            
                 Notiflix.Notify.info(`Hooray! We found ${data.totalHits} images.`)

     } catch (err) { 
console.log(err)
    }
}
const onloadMoreBtnElClick = async event => {
    
    try {
        unsplashApi.page += 1;
        const { data } = await unsplashApi.fetchPhotosByQuery()

        galleryEl.insertAdjacentHTML('beforeend', posts(data.hits));
              lightbox.refresh();

             if (data.hits.length === 0 ) { 
                 loadMoreBtnEl.classList.add('is-hiden');  
                 loadMoreBtnEl.removeEventListener('click', onloadMoreBtnElClick);  
                 Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
                 return
        }         
     } catch (err) { 
console.log(err)
    }

}
searchForm.addEventListener('submit', onSearthFormSubmit)
loadMoreBtnEl.addEventListener('click', onloadMoreBtnElClick)




    // unsplashApi
    //     .fetchPhotosByQuery()
    //     .then(result => {
    //         console.log(result.data); 
    //         if (result.data.totalHits === 0) { 
    //             galleryEl.innerHTML = '';
    //              Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.")
    //             return 
    //         }
    //         if (result.data.totalHits > unsplashApi.per_page) {
    //             loadMoreBtnEl.classList.remove('is-hiden')
                
    //          }

    //             galleryEl.innerHTML = posts(result.data.hits);
               
    // }).catch(err => {
    //     console.log(err);
    // });   
//
    // 
    // unsplashApi
    //      .fetchPhotosByQuery().then(result => { 

                 
    //          if (result.data.hits.length === 0 ) { 
                 
    //              loadMoreBtnEl.classList.add('is-hiden');  
    //              loadMoreBtnEl.removeEventListener('click', onloadMoreBtnElClick);  
    //              Notiflix.Notify.info("We're sorry, but you've reached the end of search results.");
    //              return
    //          }
    //           galleryEl.insertAdjacentHTML('beforeend', posts(result.data.hits));
         
             
    //      }).catch(err => {
    //     console.log(err)
    // }); 
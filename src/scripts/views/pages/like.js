/* eslint-disable indent */
import FavoriteIdb from '../../data/favorite-idb';
import CONFIG from '../../globals/config';

const Favorite = {
    async render() {
        return `
        <section class='content'>
            <div class='latest'>
                <h1 tabindex='0'>Favorite Restaurant</h1>
                <div class='posts' id='tes'></div>
                <div class='resto-item__not__found' tabindex='0'></div>
            </div>
        </section>
        `;
    },

    async afterRender() {
        const resto = await FavoriteIdb.getAllFavorite();
        let dataList = '';
        if (resto.length === 0) {
            document.querySelector('.resto-item__not__found').innerHTML = 'Tidak ada Restoran Favorite untuk ditampilkan';
        } else {
            resto.forEach((data) => {
                dataList += `
                <div tabindex="0" class='post-item'>
    
                    <img class='lazyload post-item_thumb'  tabindex='0' src='${CONFIG.BASE_IMAGE_URL_SMALL + data.pictureId}' alt='${data.name}' title='${data.name}'>

                    <div class='city' tabindex='0'>${data.city}</div>

                    <div class='post-item_content'>
                        <p class='post-item_rating' tabindex='0'>
                            Rating : ${data.rating}
                        </p>
                        <h1 class='post-item_title' tabindex='0'>
                            <a href='/#/detail/${data.id}'>${data.name}</a>
                        </h1>
                        <div class='post-item_desc' tabindex='0'>${data.description.slice(0, 150)}...</div>
                    </div>
                </div>
                `;
            });
            document.querySelector('#tes').innerHTML = dataList;
        }
    },
};

export default Favorite;

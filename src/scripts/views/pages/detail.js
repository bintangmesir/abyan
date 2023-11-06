import UrlParser from '../../routes/url-parser';
import CONFIG from '../../globals/config';
import sourceData from '../../data/dicoding-source';
import LikeButtonPresenter from '../../utils/like-button-presenter';
import FavoriteIdb from '../../data/favorite-idb';

const Detail = {
  async render() {
    return `
        <section class='content'>
            <div class='latest'>
                <h1 id='restoName' tabindex='0'></h1>
                <div class='detail-content' id='detail' tabindex='0'></div>
                <div id='likeButtonContainer'></div>
            </div>
        </section>
    `;
  },

  async afterRender() {
    const url = UrlParser.parseActiveUrlWithoutCombiner();
    let dataDetail = '';
    let listCategory = '';
    let listMakanan = '';
    let listMinuman = '';
    let listReview = '';
    const data = await sourceData.detailResto(url.id);
    // eslint-disable-next-line no-shadow
    data.restaurant.categories.forEach((data) => {
      listCategory += `
                <div class='tag' tabindex='0'>${data.name}</div>
            `;
    });
    // eslint-disable-next-line no-shadow
    data.restaurant.menus.foods.forEach((data) => {
      listMakanan += `
                ${data.name},
            `;
    });
    // eslint-disable-next-line no-shadow
    data.restaurant.menus.drinks.forEach((data) => {
      listMinuman += `
                ${data.name},
            `;
    });
    if (Array.isArray(data.restaurant.customerReviews)) {
      data.restaurant.customerReviews.forEach((review) => {
        listReview += `
              <div class='review-card' tabindex='0'>
                  <p tabindex='0'>${review.name},</p>
                  <p tabindex='0'>${review.date},</p>
                  <p tabindex='0'>${review.review},</p>
              </div>
              `;
      });
    } else {
      listReview += '<p tabindex="0">No reviews available</p>';
    }
    dataDetail += `
          <div class="post-item">
              <img class="lazyload post-item_img" tabindex='0' src="${CONFIG.BASE_IMAGE_URL_SMALL + data.restaurant.pictureId}" alt="${data.restaurant.name}" title="${data.restaurant.name}">
              <div class="city" tabindex='0'>${data.restaurant.city}</div>
              <div class="post-item_content" style="text-align:left;">
                  <p class="post-item_rating" tabindex='0'>
                      Rating : ${data.restaurant.rating}
                  </p>
                  <h2 tabindex='0'>${data.restaurant.name}</h2>
                  <p class="alamat" tabindex='0'>${data.restaurant.address}</p>
                  <div class="post-item_desc_detail" tabindex='0'>${data.restaurant.description}</div>
                  <br>
                  <h2 tabindex='0'>Menu</h2>
                  <div style="margin-top:10px;margin-bottom:20px" tabindex='0'>${listCategory}</div>
                  <h3 tabindex='0'>Makanan</h3>
                  <div style="margin-top:10px;margin-bottom:20px" tabindex='0'>${listMakanan}</div>
                  <h3 tabindex='0'>Minuman</h3>
                  <div style="margin-top:10px;margin-bottom:20px" tabindex='0'>${listMinuman}</div>
                  <h2 tabindex='0'>Review</h2>
                  <p tabindex='0'>Apa kata mereka yang sudah pernah berkunjung ke sini?</p>
                  <div style="margin-top:-15px;margin-bottom:20px; padding-top:20px;padding-bottom:20px" tabindex='0'>${listReview}</div>
              </div>
          </div>
        `;
    document.querySelector('#restoName').innerHTML = 'DETAIL RESTORAN';
    document.querySelector('#detail').innerHTML = dataDetail;

    LikeButtonPresenter.init({
      likeButtonContainer: document.querySelector('#likeButtonContainer'),
      favoriteRestos: FavoriteIdb,
      data: {
        id: data.restaurant.id,
        name: data.restaurant.name,
        description: data.restaurant.description,
        rating: data.restaurant.rating,
        pictureId: data.restaurant.pictureId,
        city: data.restaurant.city,
      },
    });
  },
};

export default Detail;

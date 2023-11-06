import sourceData from '../../data/dicoding-source';
import CONFIG from '../../globals/config';

const Home = {
  async render() {
    return `
    <section class="content" id="content">
        <div class="latest">
            <h1 tabindex="0">Explore Restaurant</h1>
            <div class="posts" id="tes"></div>
        </div>
    </section>
    `;
  },

  async afterRender() {
    const resto = await sourceData.listResto();
    let dataList = '';
    resto.restaurants.forEach((data) => {
      dataList += `
            <div class='post-item'>
                <img class="lazyload post-item_thumb" tabindex='0' src="${CONFIG.BASE_IMAGE_URL_SMALL + data.pictureId}" alt="${data.name}" title="${data.name}">
    
                <div class='city' tabindex='0'>${data.city}</div>
                
                <div class='post-item_content'>
                    <p class='post-item_rating' tabindex='0'>
                        Rating : ${data.rating}
                    </p>
                    <h1 class='post-item_title'>
                      <a href='/#/detail/${data.id}'>${data.name}</a>
                    </h1>
                    <div class='post-item_desc' tabindex='0'>${data.description.slice(0, 150)}...</div>
                </div>
            </div>
            `;
    });
    document.querySelector('#tes').innerHTML = dataList;
  },
};

export default Home;

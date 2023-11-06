/* eslint-disable import/prefer-default-export */
import LikeButtonPresenter from '../../src/scripts/utils/like-button-presenter';
import FavoriteIdb from '../../src/scripts/data/favorite-idb';

const createLikeButtonPresenterWithResto = async (data) => {
  await LikeButtonPresenter.init({
    likeButtonContainer: document.querySelector('#likeButtonContainer'),
    favoriteRestos: FavoriteIdb,
    data,
  });
};

export { createLikeButtonPresenterWithResto };

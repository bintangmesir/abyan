/* eslint-disable no-undef */
import { itActsAsFavoriteRestoModel } from './contracts/favoriteRestoContract';
import FavoriteIdb from '../src/scripts/data/favorite-idb';

describe('Favorite Resto Idb Contract Test Implementation', () => {
  afterEach(async () => {
    (await FavoriteIdb.getAllFavorite()).forEach(async (data) => {
      await FavoriteIdb.deleteFavorite(data.id);
    });
  });

  itActsAsFavoriteRestoModel(FavoriteIdb);
});

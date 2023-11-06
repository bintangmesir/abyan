/* eslint-disable eqeqeq */
/* eslint-disable consistent-return */
/* eslint-disable no-undef */
import { itActsAsFavoriteRestoModel } from './contracts/favoriteRestoContract';

let favoriteRestos = [];

const FavoriteRestoArray = {
  getFavorite(id) {
    if (!id) {
      return;
    }

    return favoriteRestos.find((data) => data.id == id);
  },

  getAllFavorite() {
    return favoriteRestos;
  },

  putFavorite(data) {
    // eslint-disable-next-line no-prototype-builtins
    if (!data.hasOwnProperty('id')) {
      return;
    }

    // pastikan id ini belum ada dalam daftar favoriteRestos
    if (this.getFavorite(data.id)) {
      return;
    }

    favoriteRestos.push(data);
  },

  deleteFavorite(id) {
    // cara boros menghapus film dengan meng-copy film yang ada
    // kecuali film dengan id == id
    favoriteRestos = favoriteRestos.filter((data) => data.id != id);
  },
};

describe('Favorite Resto Array Contract Test Implementation', () => {
  afterEach(() => {
    favoriteRestos = [];
  });

  itActsAsFavoriteRestoModel(FavoriteRestoArray);
});

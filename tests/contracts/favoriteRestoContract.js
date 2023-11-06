/* eslint-disable no-undef */
const itActsAsFavoriteRestoModel = (favoriteResto) => {
  it('should return the resto that has been added', async () => {
    favoriteResto.putFavorite({ id: 1 });
    favoriteResto.putFavorite({ id: 2 });

    expect(await favoriteResto.getFavorite(1)).toEqual({ id: 1 });
    expect(await favoriteResto.getFavorite(2)).toEqual({ id: 2 });
    expect(await favoriteResto.getFavorite(3)).toEqual(undefined);
  });

  it('should refuse a resto from being added if it does not have the correct property', async () => {
    favoriteResto.putFavorite({ aProperty: 'property' });

    expect(await favoriteResto.getAllFavorite()).toEqual([]);
  });

  it('can return all of the resto that have been added', async () => {
    favoriteResto.putFavorite({ id: 1 });
    favoriteResto.putFavorite({ id: 2 });

    expect(await favoriteResto.getAllFavorite()).toEqual([{ id: 1 }, { id: 2 }]);
  });

  it('should remove favorite resto', async () => {
    favoriteResto.putFavorite({ id: 1 });
    favoriteResto.putFavorite({ id: 2 });
    favoriteResto.putFavorite({ id: 3 });

    await favoriteResto.deleteFavorite(1);

    expect(await favoriteResto.getAllFavorite()).toEqual([{ id: 2 }, { id: 3 }]);
  });

  it('should handle request to remove a resto even though the resto has not been added', async () => {
    favoriteResto.putFavorite({ id: 1 });
    favoriteResto.putFavorite({ id: 2 });
    favoriteResto.putFavorite({ id: 3 });

    await favoriteResto.deleteFavorite(4);

    expect(await favoriteResto.getAllFavorite()).toEqual([{ id: 1 }, { id: 2 }, { id: 3 }]);
  });
};

// eslint-disable-next-line import/prefer-default-export
export { itActsAsFavoriteRestoModel };

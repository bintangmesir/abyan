/* eslint-disable no-plusplus */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const assert = require('assert');

Feature('Liking Restos');

Before(({ I }) => {
  I.amOnPage('/#/like');
});

Scenario('showing empty liked restos', ({ I }) => {
  I.seeElement('.latest');
  I.see('Tidak ada Restoran Favorite untuk ditampilkan', '.resto-item__not__found');
});

Scenario('liking one resto', async ({ I }) => {
  I.see('Tidak ada Restoran Favorite untuk ditampilkan', '.resto-item__not__found');

  I.amOnPage('/');

  I.seeElement('.post-item_title a');
  const firstResto = locate('.post-item_title a').first();
  const firstRestoTitle = await I.grabTextFrom(firstResto);
  I.click(firstResto);

  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/like');
  I.seeElement('.post-item');
  const likedRestoTitle = await I.grabTextFrom('.post-item_title a');

  assert.strictEqual(firstRestoTitle, likedRestoTitle);
});

Scenario('unliking one resto', async ({ I }) => {
  I.see('Tidak ada Restoran Favorite untuk ditampilkan', '.resto-item__not__found');

  I.amOnPage('/');
  I.waitForElement('.post-item_title a', 5);
  I.seeElement('.post-item_title a');
  const firstRestoTitle = await I.grabTextFrom('.post-item_title a');
  I.click(firstRestoTitle);

  I.waitForElement('#likeButton', 5);
  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/like');
  I.seeElement('.post-item_title a');

  I.click(firstRestoTitle);
  I.waitForElement('#likeButton', 5);
  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('/#/like');
  I.see('Tidak ada Restoran Favorite untuk ditampilkan', '.resto-item__not__found');
});

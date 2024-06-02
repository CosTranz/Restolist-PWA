/* eslint-disable no-await-in-loop */
/* eslint-disable no-plusplus */
/* eslint-disable no-undef */
const assert = require('assert');

Feature('Unliking Restaurants');

Before(({ I }) => {
  I.amOnPage('#/favorite');
});

Scenario('unlike one restaurant', async ({ I }) => {
  I.see(
    'Tidak ada favorite restaurant yang ditampilkan',
    '.restaurant-item__not__found',
  );

  I.amOnPage('/#');

  I.waitForElement('.resto-item_name', 30);
  I.seeElement('.resto-item_name');

  const firstRestaurant = locate('.resto-item_name').first();
  const firstRestaurantName = await I.grabTextFrom(firstRestaurant);
  I.click(firstRestaurant);

  I.waitForElement('#likeButton', 30);
  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('#/favorite');
  I.waitForElement('.resto-item', 30);
  I.seeElement('.resto-item');

  const likedRestaurantName = await I.grabTextFrom('.resto-item_name');
  assert.strictEqual(firstRestaurantName, likedRestaurantName);

  I.seeElement('.resto-item_name');

  const firstRestaurantLiked = locate('.resto-item_name').first();
  I.click(firstRestaurantLiked);

  I.waitForElement('#likeButton', 30);
  I.seeElement('#likeButton');
  I.click('#likeButton');

  I.amOnPage('#/favorite');
  I.waitForElement('.restaurant-item__not__found', 30);
  I.see(
    'Tidak ada favorite restaurant yang ditampilkan',
    '.restaurant-item__not__found',
  );
});

import { module, test } from 'qunit';
import { setupRenderingTest } from 'super-rentals/tests/helpers';
import Service from '@ember/service';
import { find, render } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

const MOCK_URL = new URL('/foo/bar?baz=true#some-section', window.location.origin,);

class MockRouterService extends Service {
  get currentURL() {
    return '/foo/bar?baz=true#some-section';
  }
}

module('Integration | Component | share-button', function (hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function () {
    this.owner.register('service:router', MockRouterService);

    this.tweetParam = (param) => {
      let link = find('a');
      let url = new URL(link.href);

      return url.searchParams.get(param);
    }
  });

  test('basic usage', async function (assert) {
    await render(hbs`<ShareButton>Tweet this!</ShareButton>`);

    assert.dom('a').hasAttribute('target', '_blank')
    .hasAttribute('rel', 'external nofollow noopener noreferrer')
    .hasAttribute('href', /^https:\/\/twitter\.com\/intent\/tweet/)
    .hasClass('share')
    .hasClass('button')
    .containsText('Tweet this!');

    assert.strictEqual(this.tweetParam('url'), MOCK_URL.href);
  });

  test('it supports passing @text', async function (assert) {
    await render(hbs`
      <ShareButton @text="Hello Twitter!">
        Tweet this!
      </ShareButton>`);

    assert.strictEqual(this.tweetParam('text'), 'Hello Twitter!');
  });

  test('it supports passing @hashtags', async function (assert) {
    await render(hbs`
      <ShareButton @hashtags="foo,bar,baz">
      Tweet this!
      </ShareButton>`);

    assert.strictEqual(this.tweetParam('hashtags'), "foo,bar,baz");
  });

  test('it supports passing @via', async function (assert) {
    await render(hbs`
      <ShareButton @via="emberjs">
      Tweet this!
      </ShareButton>`);

    assert.strictEqual(this.tweetParam('via'), "emberjs");
  });

  test('it supports adding additional classes', async function (assert) {
    await render(hbs`
      <ShareButton class="extra class">
      Tweet this!
      </ShareButton>`);

    assert
      .dom('a')
      .hasClass('share')
      .hasClass('button')
      .hasClass('extra')
      .hasClass('class');
  });

  test('the target, rel, and href attributes cannot be overwritten', async function (assert) {
    await render(hbs`
      <ShareButton href="/" target="_self" rel="">
      Tweet this!
      </ShareButton>`);

    assert
      .dom('a')
      .hasAttribute('target', '_blank')
      .hasAttribute('href', /^https:\/\/twitter\.com\/intent\/tweet/)
      .hasAttribute('rel', 'external nofollow noopener noreferrer');
  });

});

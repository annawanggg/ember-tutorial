import { module, test } from 'qunit';
import { setupRenderingTest } from 'super-rentals/tests/helpers';
import { render, find } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import ENV from 'super-rentals/config/environment';

module('Integration | Component | map', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders a map image w the specified params', async function (assert) {
    
    await render(hbs`
      <Map
        @lat="37.7797"
        @lng="-122.4184"
        @zoom="10"
        @width="150"
        @height="120"
      />
    `);

    assert
      .dom('.map img')
      .exists()
      .hasAttribute('alt', 'Map image at coordinates 37.7797, -122.4184')
      .hasAttribute('src')
      .hasAttribute('width', '150')
      .hasAttribute('height', '120');

      let { src } = find('.map img');
      let token = encodeURIComponent(ENV.MAPBOX_ACCESS_TOKEN);

      assert.ok(
        src.startsWith('https://api.mapbox.com/'),
      'the src starts with "https://api.mapbox.com/"',
      );

      assert.ok(
        src.includes('-122.4184,37.7797,10', 'make sure src includes lat,long,zoom params')
      );

      assert.ok(
        src.includes('150x120@2x', 'make sure src includes widthxheight@2x params')
      );

      assert.ok(
        src.includes(`access_token=${token}`, 'make sure src includes access token')
      );
  });

  test('src gets updated when args change', async function (assert) {

    // setProperties API allows us to pass arbitrary values into our component
    this.setProperties({
      lat: 37.7749,
      lng: -122.4194,
      zoom: 10,
      width: 150,
      height: 120,
    });

    await render(hbs`<Map
      @lat={{this.lat}}
      @lng={{this.lng}}
      @zoom={{this.zoom}}
      @width={{this.width}}
      @height={{this.height}}
    />`);

    let img = find('.map img');

    assert.ok(
      img.src.includes('-122.4194,37.7749,10', 'make sure src includes lat,long,zoom params')
    );

    assert.ok(
      img.src.includes('150x120@2x', 'make sure src includes widthxheight@2x params')
    );

    this.setProperties({
      width: 300,
      height: 200,
      zoom: 12
    });

    assert.ok(
      img.src.includes('-122.4194,37.7749,12'),
      'the src should reflect updated zoom param',
    );

    assert.ok(
      img.src.includes('300x200@2x'),
      'the src should reflect updated height and width params',
    );

    this.setProperties({
      lat: 47.6062,
      lng: -122.3321,
    });

    assert.ok(
      img.src.includes('-122.3321,47.6062,12'),
      "src should reflect updates lng and lat params"
    );

    assert.ok(
      img.src.includes('300x200@2x'),
      'the src should include width, height, and 2x params',
    );
  });

  test('default alt attribute can be overwritten', async function (assert) {

    await render(hbs`
      <Map
        @lat="37.7797"
        @lng="-122.4184"
        @zoom="10"
        @width="150"
        @height="120"
        alt="Map image of San Francisco"
      />
    `);

    assert.dom('.map img').hasAttribute('alt', 'Map image of San Francisco');
  });

  test('src, width, height attributes cannot be overwrriten', async function (assert) {

        await render(hbs`
      <Map
        @lat="37.7797"
        @lng="-122.4184"
        @zoom="10"
        @width="150"
        @height="120"
        alt="Map image of San Francisco"
        src="/assets/images/teaching-tomster.png"
        width="200"
        height="300"
      />
    `);

    assert.dom('.map img')
    .hasAttribute('width', '150')
    .hasAttribute('height', '120')
    // has attribute supports using regex
    .hasAttribute('src', /^https:\/\/api\.mapbox\.com\//);
    
  });

});

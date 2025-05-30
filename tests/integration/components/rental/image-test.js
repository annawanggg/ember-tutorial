import { module, test } from 'qunit';
import { setupRenderingTest } from 'super-rentals/tests/helpers';
import { render, click } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';

module('Integration | Component | rental/image', function (hooks) {
  setupRenderingTest(hooks);

  test('it renders the given rental image', async function (assert) {
    await render(hbs`
      <Rental::Image
        src="/assets/images/teaching-tomster.png"
        alt="Teaching Tomster"
      />
    `);

    assert
      .dom('.image img')
      .exists()
      .hasAttribute('src', '/assets/images/teaching-tomster.png')
      .hasAttribute('alt', 'Teaching Tomster');
  });

  test('clicking on component toggles size', async function (assert) {
    await render(hbs`
      <Rental::Image
        src="/assets/images/teaching-tomster.png"
        alt="Teaching Tomster"
      />
    `);

    assert.dom('button.image').exists();

    assert.dom('button.image').doesNotHaveClass('large');
    assert.dom('button.image small').hasText('View Larger');

    await click('button.image');

    assert.dom('button.image').hasClass('large');
    assert.dom('button.image small').hasText('View Smaller');

    await click('button.image');

    assert.dom('button.image').doesNotHaveClass('large');
    assert.dom('button.image small').hasText('View Larger');
  });
});

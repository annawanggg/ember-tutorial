import Route from '@ember/routing/route';
import { service } from '@ember/service';
import { findRecord } from '@ember-data/json-api/request';

export default class RentalRoute extends Route {
  @service store;

  // params object passed into our model hook bc we are fetching from
  // /api/rentals/${id}.json endpoint, not just /api/rentals.json anymore
  // params object contains all dynamic segments from our URL, so we can access rental_id
  async model(params) {
    const { content } = await this.store.request(
      findRecord('rental', params.rental_id),
    );

    return content.data;
  }

  // // params object allows us to have access to the value of the /:rental_id dynamic segment
  // async model(params) {
  //     let response = await fetch(`/api/rentals/${params.rental_id}.json`);
  //     let { data } = await response.json();

  //     let { id, attributes } = data;
  //     let type;

  //     if (COMMUNITY_CATEGORIES.includes(attributes.category)) {
  //         type = 'Community';
  //     } else {
  //         type = 'Standalone';
  //     }

  //     return { id, type, ...attributes};
  // }
}

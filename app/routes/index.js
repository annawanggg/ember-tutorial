import Route from '@ember/routing/route';
import { service } from '@ember/service';
import { query } from '@ember-data/json-api/request';

export default class IndexRoute extends Route {
    @service store;

    // runs when index route "/" is visited
    async model() {
        // fetch rental records from store
        // query() creates a JSON:API query object for rental model
        // request sends request to server using query object
        const { content } = await this.store.request(query('rental'));
        return content.data;
    }
}
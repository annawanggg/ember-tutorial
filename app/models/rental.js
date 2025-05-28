import Model, { attr } from '@ember-data/model';

const COMMUNITY_CATEGORIES = ['Condo', 'Townhouse', 'Apartment'];

// when we fetch rental data from server, we want each listing to be represented by an instance of our RentalModel class
export default class RentalModel extends Model {
    // Attributes help convert JSON data from the server into model properties, 
    // and turn model properties back into data to send to the server.    
    // attributes in a model class should correspond directly with field we are expecting from server in its responses
    @attr title;
    @attr owner;
    @attr city;
    @attr location;
    @attr category;
    @attr bedrooms;
    @attr image;
    @attr description;

    get type() {
        if (COMMUNITY_CATEGORIES.includes(this.category)) {
            return 'Community';
        } else {
            return 'Standalone';
        }
    }
}

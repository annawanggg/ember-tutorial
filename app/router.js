import EmberRouter from '@ember/routing/router';
import config from 'super-rentals/config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('about');
  this.route('contact', { path: '/getting-in-touch' });
  // :rental_id is a dynamic segment; when routes are evaluates, will be substitued w id of the property we are trying to nav to 
  this.route('rental', { path: '/rentals/:rental_id' });
});

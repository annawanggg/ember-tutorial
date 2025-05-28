import Component from '@glimmer/component';
import ENV from 'super-rentals/config/environment';

const MAPBOX_API = 'https://api.mapbox.com/styles/v1/mapbox/streets-v11/static';

export default class Map extends Component {
  get src() {
    let { lng, lat, width, height, zoom } = this.args;

    let coords = `${lng},${lat},${zoom}`;
    let dims = `${width}x${height}`;
    let accessToken = `access_token=${this.token}`;

    return `${MAPBOX_API}/${coords}/${dims}@2x?${accessToken}`;
  }

  get token() {
    // url encode token in case there are any special chars that are not url safe
    return encodeURIComponent(ENV.MAPBOX_ACCESS_TOKEN);
  }
}

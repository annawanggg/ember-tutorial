import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class RentalImage extends Component {
  // can be achieved w much more concise syntax bc the pattern is so common, just isLarge = true
  // constructor(...args) {
  //     super(...args);
  //     this.isLarge = true;
  // }

  // tracked decorate tells ember to monitor the var for updates
  // when its value changes, ember will automatically rerender any templates depending on the value
  // in this specific case, ember will reeval the isLarge conditionals in image.hbs
  @tracked isLarge = false;

  // action decorator tells ember that we intend to use this method within the image template
  @action toggleSize() {
    this.isLarge = !this.isLarge;
  }
}

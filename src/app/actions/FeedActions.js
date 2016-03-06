import alt from '../alt';
import { generateAjaxActions } from '../utils/altUtil';

class FeedActions {
  constructor() {
    generateAjaxActions(this, ['getFeed']);
    this.generateActions('clearSelectedItem');
  }
}

export default alt.createActions(FeedActions);

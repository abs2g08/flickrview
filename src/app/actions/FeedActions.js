import alt from '../alt';
import { generateAjaxActions } from '../utils/altUtil';

class FeedActions {
  constructor() {
    generateAjaxActions(this, ['getFeed']);
  }
}

export default alt.createActions(FeedActions);

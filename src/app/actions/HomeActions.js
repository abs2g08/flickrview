import alt from '../alt';
import { generateAjaxActions } from '../utils/altUtil';

class HomeActions {
  constructor() {
    generateAjaxActions(this, ['getFeed']);
  }
}

export default alt.createActions(HomeActions);

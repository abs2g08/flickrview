import alt from '../alt';
import { HomeActions } from '../actions';
import { HomeSource } from '../sources';

import { loading } from '../utils/loadingUtil';
import { redirect403 } from '../utils/httpUtil';

class HomeStore {
  static findItemByIds(authorId, itemId, items) {
    return items.filter((item)=> {
      return (item.author_id === authorId && item.id === itemId);
    })[0];
  }

  constructor() {
    this.state = {
      items: [],

      loading: false,
      errorMsg: ''
    };

    this.registerAsync(HomeSource);
    this.bindActions(HomeActions);
  }

  onGetFeed(opts) {
    loading(this);

    this.opts = opts;

    this.getInstance().getFeed(opts);
  }

  onGetFeedSuccess(resp) {
    const data = resp.data;

    this.setState({
      items: data.items
    });

    this.opts = null;
    loading(this, false);
  }

  onGetFeedError(resp) {
    this.setState({
      errorMsg: resp.data
    });

    this.opts = null;
    loading(this, false);

    redirect403(resp.status);

    throw `onGetFeedError error: ${resp.errorMsg}`;
  }
}

export default alt.createStore(HomeStore);

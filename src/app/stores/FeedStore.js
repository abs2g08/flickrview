import alt from '../alt';
import { FeedActions } from '../actions';
import { FeedSource } from '../sources';
import { findItemByIds } from '../utils/storeUtil';
import { loading } from '../utils/loadingUtil';
import { redirect403 } from '../utils/httpUtil';

class FeedStore {
  constructor() {
    this.state = {
      items: [],
      item: {
        author: null,
        date_taken: null,
        description: null,
        published: null,
        media: { m: null },
        link: null,
        tags: '',
        title: null
      },
      loading: false,
      errorMsg: ''
    };

    this.registerAsync(FeedSource);
    this.bindActions(FeedActions);
  }

  lazyLoadItem(opts) {
    const authorId = opts.authorId;
    const itemId = opts.itemId;

    const item = findItemByIds(authorId, itemId, this.state.items);
    if(item) {
      this.setState({ item });
      return true;
    } else {
      return false;
    }
  }

  onGetFeed(opts) {
    loading(this);

    this.opts = opts;

    if(opts && opts.selectItem) {
      if(!this.lazyLoadItem(opts.selectItem)) {
        this.getInstance().getFeed(opts);
      }
    } else {
      this.getInstance().getFeed(opts);
    }
  }

  onGetFeedSuccess(resp) {
    const data = resp.data;
    const opts = this.opts;

    this.setState({
      items: data.items
    });

    if(opts && opts.selectItem) {
      this.lazyLoadItem(opts.selectItem);
    }

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

export default alt.createStore(FeedStore);

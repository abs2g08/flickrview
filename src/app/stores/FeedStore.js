import alt from '../alt';
import { FeedActions } from '../actions';
import { FeedSource } from '../sources';
import { findItemByIds, parseAuthorIdAndEmail } from '../utils/storeUtil';
import { loading } from '../utils/loadingUtil';
import { redirect403 } from '../utils/httpUtil';
import Immutable from 'seamless-immutable';
import { seamlessImmutable } from '../utils/altUtil';

const blankItem = {
  id: null,
  author: {
    email: '',
    name: ''
  },
  date_taken: null,
  description: null,
  published: null,
  media: { m: null },
  link: null,
  tags: '',
  title: null
};

@seamlessImmutable
class FeedStore {
  constructor() {
    this.state = Immutable({
      items: [],
      item: blankItem,
      loading: true,
      errorMsg: null
    });

    this.registerAsync(FeedSource);
    this.bindActions(FeedActions);
  }

  mergeState(obj) {
    this.setState(this.state.merge(obj));
  }

  lazyLoadItem(opts) {
    const authorId = opts.authorId;
    const itemId = opts.itemId;

    const item = findItemByIds(authorId, itemId, this.state.items);

    if(item) {
      this.mergeState({ item });
      loading(this, false);

      return true;
    } else {
      return false;
    }
  }

  formatData(data) {
    return data.map((item)=> {
      try {
        item.author = parseAuthorIdAndEmail(item.author);
      } catch(e) {
        item.author = { email: '', name: '' };
      }
      return item;
    });
  }

  onClearSelectedItem() {
    this.mergeState({
      item: blankItem
    });
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

    data.items = this.formatData(data.items);

    this.mergeState({
      items: data.items
    });

    if(opts && opts.selectItem) {
      this.lazyLoadItem(opts.selectItem);
    }

    this.opts = null;
    loading(this, false);
  }

  onGetFeedError(resp) {
    this.mergeState({
      errorMsg: resp.statusText
    });

    this.opts = null;
    loading(this, false);

    redirect403(resp.status);
  }
}

export default alt.createStore(FeedStore);

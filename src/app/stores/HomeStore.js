import alt from '../alt';
import { HomeActions } from '../actions';
import { HomeSource } from '../sources';

import { loading } from '../utils/loadingUtil';
import { redirect403 } from '../utils/httpUtil';

/*

  "title": "Root Vegetable & Feta Empanadas by Eva Kosmas Flores | Adventures in Cooking",
  "link": "https://www.flickr.com/photos/27787080@N07/25093301849/",
  "media": {"m":"https://farm2.staticflickr.com/1592/25093301849_24c375b538_m.jpg"},
  "date_taken": "2016-02-17T12:09:06-08:00",
  "description": " <p><a href=\"https://www.flickr.com/people/27787080@N07/\">Eva Kosmas Flores<\/a> posted a photo:<\/p> <p><a href=\"https://www.flickr.com/photos/27787080@N07/25093301849/\" title=\"Root Vegetable &amp; Feta Empanadas by Eva Kosmas Flores | Adventures in Cooking\"><img src=\"https://farm2.staticflickr.com/1592/25093301849_24c375b538_m.jpg\" width=\"160\" height=\"240\" alt=\"Root Vegetable &amp; Feta Empanadas by Eva Kosmas Flores | Adventures in Cooking\" /><\/a><\/p> <p><a href=\"http://www.adventuresincooking.com\" rel=\"nofollow\">www.adventuresincooking.com<\/a><\/p>",
  "published": "2016-03-03T05:11:04Z",
  "author": "nobody@flickr.com (Eva Kosmas Flores)",
  "author_id": "27787080@N07",
  "tags": "winter cheese recipe stuffed sweet vegetable yam potato homemade pastry beets onion appetizer easy root feta empanada"

*/

class HomeStore {
  constructor() {
    this.state = {
      feed: [],

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

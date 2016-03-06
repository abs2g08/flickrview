import { FeedActions } from '../actions';
import axios from 'axios';
import urls from '../const/urls';

const FeedSource = {
  getFeed: {
    remote(self, opts={}) {
      const url = urls.publicPhotoFeed('potato');
      return axios.get(url);
    },
    success: FeedActions.getFeedSuccess,
    error: FeedActions.getFeedError
  }
};

export default FeedSource;

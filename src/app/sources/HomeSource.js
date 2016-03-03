import { HomeActions } from '../actions';
import axios from 'axios';
import urls from '../const/urls';

const HomeSource = {
  getFeed: {
    remote(self, opts={}) {
      const url = urls.publicPhotoFeed('potato');
      return axios.get(url);
    },
    success: HomeActions.getFeedSuccess,
    error: HomeActions.getFeedError
  }
};

export default HomeSource;

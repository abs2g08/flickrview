import React from 'react';
import FeedItem from './FeedItem';
import { FeedActions } from '../actions';
import { genKey } from '../utils/commUtil';

export default class Feed extends React.Component {
  onFeedRefresh() {
    FeedActions.getFeed();
  }

  render() {
    const items = this.props.items || [];

    return (
      <section className='feed' key='feed-content'>
        <div className='feed-content'>
        {
          items.map((item, id) => {
            const key = genKey('feed-item', id);
            let feedItem;
            try {
              feedItem = <FeedItem item={item} key={key}/>;
            } catch(e) {
              feedItem = null;
            }
            return (feedItem);
          })
        }
        </div>
      </section>
    );
  }
}

Feed.propTypes = {
  items: React.PropTypes.array
};

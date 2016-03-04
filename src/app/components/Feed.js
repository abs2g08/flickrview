import React from 'react';
import FeedItem from './FeedItem';
import { HomeActions } from '../actions';
// import { genKey } from '../utils/commUtil';

export default class Feed extends React.Component {
  onFeedRefresh() {
    HomeActions.getFeed();
  }

  render() {
    const items = this.props.items || [];

    return (
      <section className='feed' key='feed-content'>
        <div className='feed-content'>
        {
          items.map((item) => {
            return (
              <FeedItem item={item}/>
            );
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

import React from 'react';
import { FeedStore } from '../stores';
import { Feed } from '../components';
import { FeedActions } from '../actions';
import connectToStores from 'alt/utils/connectToStores';
import classNames from 'classnames';

class HomeView extends React.Component {
  static getStores() {
    return [FeedStore];
  }

  static getPropsFromStores() {
    return {
      feedStore: FeedStore.getState()
    };
  }

  componentDidMount() {
    FeedActions.getFeed();
  }

  render() {
    const loading = this.props.feedStore.loading || false;
    const svgLoaderClass = classNames('svg-loader', { hidden: !loading });
    const items = this.props.feedStore.items;

    return (
      <div className='home-view'>
        <div>
          <Feed items={items}/>
        </div>
        <div className='home-loader'>
          <svg className={svgLoaderClass}></svg>
        </div>
      </div>
    );
  }
}

export default connectToStores(HomeView);

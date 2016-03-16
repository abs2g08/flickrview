import React from 'react';
import { FeedStore } from '../stores';
import { FeedActions } from '../actions';
import { Feed } from '../components';
import classNames from 'classnames';
import connectToStores from 'alt/utils/connectToStores';

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
    FeedActions.getFeed({ tag: 'potato' });
  }

  render() {
    const feedStore = this.props.feedStore.asMutable({ deep: true });
    const loading = feedStore.loading || false;
    const errorMsg = feedStore.errorMsg;
    const svgLoaderClass = classNames('svg-loader', { hidden: !loading });
    const errorMsgClass = classNames('error-msg', { hidden: !errorMsg});
    const items = feedStore.items;

    return (
      <div className='home-view' key={'home-view'}>
        <div>
          <Feed items={items} key={'feed'}/>
        </div>
        <div className={errorMsgClass}>Oops, something went wrong</div>
        <div className='home-loader'>
          <svg className={svgLoaderClass}></svg>
        </div>
      </div>
    );
  }
}

export default connectToStores(HomeView);

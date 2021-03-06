import React from 'react';
import { FeedStore } from '../stores';
import { FeedActions } from '../actions';
import { ItemDetail } from '../components';
import classNames from 'classnames';
import { isomorphicFix } from '../utils/commUtil';
import connectToStores from 'alt/utils/connectToStores';

class DetailView extends React.Component {
  static getStores() {
    return [FeedStore];
  }

  static getPropsFromStores() {
    return {
      feedStore: FeedStore.getState()
    };
  }

  componentDidMount() {
    isomorphicFix(() => {
      const params = this.props.params;
      const authorId = params.authorId;
      const itemId = params.itemId;

      FeedActions.getFeed({
        tag: 'potato',
        selectItem: {
          authorId,
          itemId
        }
      });
    });
  }

  componentWillUnmount() {
    FeedActions.clearSelectedItem();
  }

  render() {
    // @TODO: asMutable on render is a performance hit, needs refactoring
    const feedStore = this.props.feedStore.asMutable({ deep:true });
    const loading = feedStore.loading || false;
    const errorMsg = feedStore.errorMsg;
    const svgLoaderClass = classNames('svg-loader', { hidden: !loading });
    const errorMsgClass = classNames('error-msg', { hidden: !errorMsg});
    const item = feedStore.item;

    return (
      <div className='detail-view' key={'detail-view'}>
        {this.props.feedStore.test}
        <ItemDetail item={item} key={'item-detail'}/>
        <div className={errorMsgClass}>Oops, something went wrong</div>
        <div className='detail-loader'>
          <svg className={svgLoaderClass}></svg>
        </div>
      </div>
    );
  }
}

export default connectToStores(DetailView);

import React from 'react';
import { FeedStore } from '../stores';
import { FeedActions } from '../actions';
import { ItemDetail } from '../components';
import classNames from 'classnames';
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
    window.setTimeout(()=>{
      const params = this.props.params;
      const authorId = params.authorId;
      const itemId = params.itemId;

      FeedActions.getFeed({
        selectItem: {
          authorId,
          itemId
        }
      });
    },0);
  }

  componentWillUnmount() {
    FeedActions.clearSelectedItem();
  }

  render() {
    const loading = this.props.feedStore.loading || false;
    const svgLoaderClass = classNames('svg-loader', { hidden: !loading });
    const item = this.props.feedStore.item.asMutable({ deep:true });

    return (
      <div className='detail-view' key={'detail-view'}>
        {this.props.feedStore.test}
        <ItemDetail item={item} key={'item-detail'}/>
        <div className='detail-loader'>
          <svg className={svgLoaderClass}></svg>
        </div>
      </div>
    );
  }
}

export default connectToStores(DetailView);

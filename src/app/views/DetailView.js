import React from 'react';
import { FeedStore } from '../stores';
import { FeedActions } from '../actions';
import { ItemDetail } from '../components';
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

  render() {
    //const loading = this.props.homeStore.loading || false;
    const item = this.props.feedStore.item.asMutable({ deep:true });

    return (
      <div className='detail-view' key={'detail-view'}>
        {this.props.feedStore.test}
        <ItemDetail item={item} key={'item-detail'}/>
      </div>
    );
  }
}

export default connectToStores(DetailView);

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

  constructor(props) {
    super(props);

    const item = {
      author: null,
      date_taken: null,
      description: null,
      published: null,
      media: { m: null },
      link: null,
      tags: '',
      title: null
    };

    this.state = {
      item
    };
  }

  componentDidMount() {
    const items = this.props.feedStore.items;
    let item = {};

    if(!items.length > 0) {
      FeedActions.getFeed();
    } else {
      const params = this.props.params;
      item = FeedStore.findItemByIds(params.authorId, params.itemId, items);
    }

    this.setState({
      item
    });
  }

  render() {
    //const loading = this.props.homeStore.loading || false;
    let item = this.state.item;

    return (
      <div className='detail-view'>
        <ItemDetail item={item}/>
      </div>
    );
  }
}

export default connectToStores(DetailView);

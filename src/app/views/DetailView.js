import React from 'react';
import { HomeStore } from '../stores';
import { HomeActions } from '../actions';
import { ItemDetail } from '../components';
import connectToStores from 'alt/utils/connectToStores';

class DetailView extends React.Component {
  static getStores() {
    return [HomeStore];
  }

  static getPropsFromStores() {
    return {
      homeStore: HomeStore.getState()
    };
  }

  constructor(props) {
    super(props);

    const item = {
      author: null,
      date_taken: null,
      description: null,
      published: null,
      link: null,
      tags: '',
      title: null
    };

    this.state = {
      item
    };
  }

  componentDidMount() {
    const items = this.props.homeStore.items;
    let item = {};

    if(!items.length > 0) {
      HomeActions.getFeed();
    } else {
      const params = this.props.params;
      item = HomeStore.findItemByIds(params.authorId, params.itemId, items);
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

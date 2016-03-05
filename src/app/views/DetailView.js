import React from 'react';
import { HomeStore } from '../stores';
import { HomeActions } from '../actions';
import moment from 'moment';
import connectToStores from 'alt/utils/connectToStores';

/*

  author: "nobody@flickr.com (Grant is a Grant)"
  author_id: "29794819@N08"
  date_taken: "2016-02-27T13:25:39-08:00"
  description: " <p><a href="https://www.flickr.com/people/thegrantyouknow/">Grant is a Grant</a> posted a photo:</p> <p><a href="https://www.flickr.com/photos/thegrantyouknow/25377070522/" title="Depth of Potato Field"><img src="https://farm2.staticflickr.com/1680/25377070522_34611ff45a_m.jpg" width="240" height="159" alt="Depth of Potato Field" /></a></p> "
  link: "https://www.flickr.com/photos/thegrantyouknow/25377070522/"
  media: Object
  published: "2016-03-04T11:10:08Z"
  tags: "ca canada macro campus nikon novascotia potato greenhouse micro nikkor sweetpotato nscc kentville 105mm novascotiacommunitycollege kingstec nikond90 kcpc vsco 105mm28g vscofilm kingscountyphotoclub"
  title: "Depth of Potato Field"

*/

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
      tags: [],
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
    item.published = moment(item.published).format('DD[th] MMMM YYYY [at] HH:mm');

    return (
      <div className='detail-view'>
        <div className='published'>Published {item.published}</div>
        <div className='title'>
          <h1>{item.title}</h1>
        </div>
        <div className='description'>{item.description}</div>
        <div className='tags'>{item.tags}</div>
      </div>
    );
  }
}

export default connectToStores(DetailView);

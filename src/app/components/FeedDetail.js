import React from 'react';
import moment from 'moment';
// import urls from '../const/urls';
// import { genKey } from '../utils/commUtil';
//import classNames from 'classnames';

/*
  author: { email: "nobody@flickr.com", name: "Grant is a Grant" }
  author_id: "29794819@N08"
  date_taken: "2016-02-27T13:25:39-08:00"
  description: " <p><a href="https://www.flickr.com/people/thegrantyouknow/">..
  link: "https://www.flickr.com/photos/thegrantyouknow/25377070522/"
  media: Object
  published: "2016-03-04T11:10:08Z"
  tags: "ca canada macro campus nikon novascotia potato greenhouse..
  title: "Depth of Potato Field"
*/

export default class FeedDetail extends React.Component {
  render() {
    let item = this.props.item || {};
    item.published = moment(new Date(item.published)).format('DD MM');
    return (
      <article className='feed-item'>
        <div className='title'>
          <h1>{item.title}</h1>
        </div>
        <div className='meta'>
          <div className='author'>
            {item.author.name}
          </div>
          <div className='published'>
            {item.published}
          </div>
        </div>
      </article>
    );
  }
}

FeedItem.propTypes = {
  item: React.PropTypes.object
};

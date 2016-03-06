import React from 'react';
import moment from 'moment';
import { Link } from 'react-router';
import { genKey } from '../utils/commUtil';

/*

  author: "nobody@flickr.com (Grant is a Grant)"
  author_id: "29794819@N08"
  date_taken: "2016-02-27T13:25:39-08:00"
  description: " <p><a href="https://www.flickr.com/people/thegrantyouknow/">..
  link: "https://www.flickr.com/photos/thegrantyouknow/25377070522/"
  media: Object
  published: "2016-03-04T11:10:08Z"
  tags: "ca canada macro campus nikon novascotia potato greenhouse..
  title: "Depth of Potato Field"

*/

export default class FeedItem extends React.Component {
  render() {
    let item = this.props.item || {};
    const key = genKey('feed-item', item.id);

    const date = new Date(item.published);
    item.published = moment(date).format('DD[th] MMMM YYYY [at] HH:mm');

    return (
      <article className='feed-item fadeIn' key={key}>
        <figure>
          <Link to={`detail/${item.author_id}/${item.id}`}>
            <img src={item.media.m}/>
          </Link>
        </figure>
        <div className='meta'>
          <div className='title'>
            <h3>{item.title}</h3>
          </div>
          <div className='meta'>
            <div className='author'>
              {item.author}
            </div>
            <div className='published'>
              {item.published}
            </div>
            <div className='view-flicker'>

            </div>
          </div>
        </div>
      </article>
    );
  }
}

FeedItem.propTypes = {
  item: React.PropTypes.object
};

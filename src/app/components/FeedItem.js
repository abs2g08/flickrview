import React from 'react';
import moment from 'moment';
import { Link } from 'react-router';
import { genKey } from '../utils/commUtil';
import urls from '../const/urls';
import { CoverImage } from '../components';

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

export default class FeedItem extends React.Component {
  render() {
    const item = this.props.item || {};
    const key = genKey('feed-item', item.id);

    const date = new Date(item.published);
    item.published = moment(date).format('DD[th] MMMM YYYY [at] HH:mm');
    item.detailLink = urls.itemDetail(item.author_id, item.id);
    item.author.flink = urls.flickr.authorProfile(item.author_id, item.id);
    item.flink = urls.flickr.itemDetail(item.author_id, item.id);

    return (
      <article className='feed-item fadeIn clearfix' key={key}>
        <figure className='photo'>
          <Link to={item.detailLink}>
            <CoverImage src={item.media.m}/>
          </Link>
        </figure>
        <div className='info'>
          <h1 className='title'>{item.title}</h1>
          <div className='meta'>
            <span className='published small'>
              Published: {item.published}
            </span>
            <span className='author'>
              <a href={item.author.flink}>{item.author.name}</a>
            </span>
            <span className='published big'>
              Published: {item.published}
            </span>
            <span className='view-flicker'>
              <a href={item.flink}>view on flickr</a>
            </span>
          </div>
        </div>
      </article>
    );
  }
}

FeedItem.propTypes = {
  item: React.PropTypes.object
};

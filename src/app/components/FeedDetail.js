import React from 'react';
import moment from 'moment';
// import urls from '../const/urls';
// import { genKey } from '../utils/commUtil';
//import classNames from 'classnames';

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

export default class FeedDetail extends React.Component {
  render() {
    let item = this.props.item || {};
    item.published = moment(new Date(item.published)).format('DD MM');
    return (
      <article className='feed-item'>
        <div class='title'>
          <h1>{item.title}</h1>
        </div>
        <div className='meta'>
          <div className='author'>
            {item.author}
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

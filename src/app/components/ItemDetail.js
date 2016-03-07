import React from 'react';
import urls from '../const/urls';
import { Link } from 'react-router';
import { genKey } from '../utils/commUtil';
import moment from 'moment';
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

export default class ItemDetail extends React.Component {

  //TO-DO: check if functional
  formatTags(str) {
    return str.split(' ').map((tag)=> {
      const key = genKey('tag', tag);
      return(
        <a className='tag-link' href={urls.tagDetail(tag)} key={key}>
          {tag}
        </a>
      );
    });
  }

  //TO-DO: check if functional
  formatDesc(text) {
    let description = '';
    if(typeof(document) !== 'undefined') {
      const wrapper = document.createElement('div');
      wrapper.innerHTML = text;
      const tmpDom = wrapper.children[2];

      if(tmpDom) {
        description = tmpDom.innerHTML;
      }
    }
    return description;
  }

  render() {
    let item = this.props.item;
    const date = new Date(item.published);

    item.tags = this.formatTags(item.tags);
    item.description = this.formatDesc(item.description);
    item.published = moment(date).format('DD[th] MMMM YYYY [at] HH:mm');
    item.authLink = urls.authorProfile(item.author_id);

    return (
      <div className='item-detail dropIn' key={'detail-view'}>
        <div className='subnav-top single-row'>
          <div className='title'>
            <h3>{item.title}</h3>
          </div>
          <div className='back'>
            <Link to='/home'>Back</Link>
          </div>
        </div>
        <div className='subnav-bottom single-row'>
          <div className='author'>
            <a href={item.authLink}>{item.author}</a>
          </div>
          <div className='published'> | Published: {item.published}</div>
        </div>
        <div className='info row'>
          <figure className='photo small-4 columns'>
            <img src={item.media.m}/>
          </figure>
          <div className='description small-8 columns'>
            <span dangerouslySetInnerHTML={{__html: item.description}}/>
          </div>
        </div>
        <div className='tags single-row'>Tags: {item.tags}</div>
      </div>
    );
  }
}

ItemDetail.propTypes = {
  item: React.PropTypes.object
};

import React from 'react';
import urls from '../const/urls';
import { Link } from 'react-router';
import { genKey } from '../utils/commUtil';
import moment from 'moment';

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

export default class ItemDetail extends React.Component {

  //TO-DO: check if functional
  formatTags(str) {
    return str.split(' ').map((tag)=> {
      const key = genKey('tag', tag);
      return(
        <a className='tag-link' href={urls.flickr.tagDetail(tag)} key={key}>
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
    item.author.flink = urls.flickr.authorProfile(item.author_id);

    return (
      <div className='item-detail dropIn' key={'detail-view'}>
        <div className='subnav-top'>
          <div className='title'>
            <h3>{item.title}</h3>
          </div>
          <div className='back'>
            <Link to='/home'>Back</Link>
          </div>
        </div>
        <div className='subnav-bottom'>
          <div className='author'>
            <a href={item.author.flink}>{item.author.name}</a>
          </div>
          <div className='published'> | Published: {item.published}</div>
        </div>
        <seciton className='info'>
          <figure className='photo'>
            <img src={item.media.m}/>
          </figure>
          <div className='meta'>
            <div className='description'>
              <span dangerouslySetInnerHTML={{__html: item.description}}/>
            </div>
            <div className='tags'>Tags: {item.tags}</div>
          </div>
        </seciton>
      </div>
    );
  }
}

ItemDetail.propTypes = {
  item: React.PropTypes.object
};

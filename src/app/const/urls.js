const flickrRoot = 'https://www.flickr.com'

const urls = {
  publicPhotoFeed: (tags)=> { return `/publicPhotoFeed?tags=${tags}`; },
  itemDetail: (authorId, itemId)=> { return `detail/${authorId}/${itemId}` },
  flickr: {
    tagDetail: (tag)=> { return `${flickrRoot}/photos/tags/${tag}`; },
    authorProfile: (authorId)=> { return `${flickrRoot}/photos/${authorId}`; },
    itemDetail: (authorId, itemId)=> { return `${flickrRoot}/photos/${authorId}/${itemId}`; }
  }
}

export default urls;

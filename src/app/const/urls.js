const flikrRoot = 'https://www.flickr.com/'

const urls = {
  publicPhotoFeed: (tags)=> { return `/publicPhotoFeed?tags=${tags}`; },
  tagDetail: (tag)=> { return `${flikrRoot}/photos/tags/${tag}`; },
  authorProfile: (authorId) => { return `${flikrRoot}/photos/${authorId}`; }
}

export default urls;

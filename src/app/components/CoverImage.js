import React from 'react';

export default class CoverImage extends React.Component {
  render() {
    const src = this.props.src;

    const imageStyle = {
      background: `url(\'${src}\') no-repeat center center`,
      backgroundSize: 'cover'
    };

    return (
      <div className='img-cover' style={imageStyle}></div>
    );
  }
}

CoverImage.propTypes = {
  src: React.PropTypes.string
};

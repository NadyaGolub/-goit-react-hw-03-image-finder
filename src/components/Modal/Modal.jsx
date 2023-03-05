import React, { Component } from 'react';
import '../styles.css';

class Modal extends Component {
  state = {};

  componentDidMount() {
    window.addEventListener('keydown', this.keydownClick);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.keydownClick);
  }

  keydownClick = evt => {
    if (evt.code === 'Escape') {
      this.props.onClose();
    }
  };

  backdropClick = evt => {
    if (evt.target === evt.currentTarget) {
      this.props.onClose();
    }
  };

  render() {
    const {
      onClick,
      image: { alt, url },
    } = this.props;

    return (
      <div className="Overlay" onClick={this.backdropClick}>
        <div className="Modal">
          <img src={url} alt={alt} onClick={onClick} />
        </div>
      </div>
    );
  }
}

export default Modal;

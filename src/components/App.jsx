import React, { Component } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button } from './Button/Button';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Loader } from './Loader/Loader';
import Modal from './Modal/Modal';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGalleryItem } from './ImageGalleryItem/ImageGalleryItem';

axios.defaults.baseURL = 'https://pixabay.com/api/';

class App extends Component {
  state = {
    search: '',
    images: [],
    page: 1,
    loading: false,
    showModal: false,
    modal: {},
    totalImage: 0,
  };

  async componentDidUpdate(prevProps, prevState) {
    const prevSearch = prevState.search;
    const currentSearch = this.state.search;
    const prevPage = prevState.page;
    const currentPage = this.state.page;

    if (prevSearch !== currentSearch) {
      this.setState({ loading: true, page: 1, images: [] });
      
      const response = await this.Api();

      if (response.data.hits.length === 0) {
        return this.notificationError();
      }
      this.setState({
        images: response.data.hits,
        totalImage: response.data.totalHits,
      });
    }

    if (prevPage !== currentPage) {
      this.setState({ loading: true });

      const response = await this.Api();
      this.setState(prevState => {
        return {
          images: [...prevState.images, ...response.data.hits],
        };
      });
    }
  }

  Api = async () => {
    try {
      const response = await axios.get('', {
        params: {
          key: '32971749-6f722df3241990952229e902a',
          q: this.state.search,
          image_type: 'photo',
          orientation: 'horizontal',
          per_page: '12',
          page: this.state.page,
        },
      });
      return response;
    } catch (error) {
      console.log('error', error);
    } finally {
      this.setState({ loading: false });
    }
  };

  trackingSearch = evt => {
    evt.preventDefault();

    const form = evt.currentTarget;
    const searchValue = form.elements.search.value;

    if (searchValue.trim() === '') {
      return this.notificationInfo();
    }

    this.setState({ search: searchValue, page: 1, images: [] });

    form.reset();
  };

  openModal = evt => {
    this.setState({
      modal: { alt: evt.target.alt, url: evt.currentTarget.dataset.large },
    });

    this.setState({ showModal: true });
  };

  closeModal = evt => {
    this.setState({ showModal: false });
  };

  loadMoreImages = () => {
    this.setState(prevState => {
      return { page: prevState.page + 1 };
    });
  };

  notificationError = () =>
    toast.error('Nothing was found for your request. Try again!');
  notificationInfo = () => toast.info('Write something and we will find it!');

  render() {
    const { images, showModal, modal, loading, page, totalImage } = this.state;
    const maxPage = Math.ceil(totalImage / 12);
    const showButton = images.length > 0 && page < maxPage;

    return (
      <>
        <Searchbar onSubmit={this.trackingSearch} />
        <ImageGallery>
          {images.map(image => (
            <ImageGalleryItem
              key={image.id}
              image={image}
              onClick={this.openModal}
            />
          ))}
        </ImageGallery>
        {loading && <Loader />}
        {showButton && <Button onClick={this.loadMoreImages} />}
        {showModal && <Modal image={modal} onClose={this.closeModal} />}
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </>
    );
  }
}

export default App;

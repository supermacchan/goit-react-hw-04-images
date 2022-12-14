import { Component } from "react";
import { Searchbar } from "./Searchbar/Searchbar";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { ToastContainer } from 'react-toastify';


export class App extends Component {
  state = {
    value: '',
  }

  formSubmitHandler = ({ value }) => {
    this.setState({ value });
  };

  render() {
    return (
      <>
        <Searchbar onSubmit={this.formSubmitHandler} />
        <ImageGallery data={this.state.value} />

        <ToastContainer
          position="top-right"
          autoClose={3000}
          theme="colored"
        />
          
      </>
    );
  };
};

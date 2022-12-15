import { useState } from "react";
import { Searchbar } from "./Searchbar/Searchbar";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { ToastContainer } from 'react-toastify';


export const App = () => {
  const [value, setValue] = useState('');
  
    return (
      <>
        <Searchbar onSubmit={setValue} />
        <ImageGallery data={value} />

        <ToastContainer
          position="top-right"
          autoClose={3000}
          theme="colored"
        />
          
      </>
    );
};


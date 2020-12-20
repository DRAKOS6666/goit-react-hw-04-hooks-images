import React, { useState } from 'react';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';

function App() {
  const [query, setQuery] = useState('');
  return (
    <>
      <Searchbar onSubmit={setQuery} />
      {query && <ImageGallery query={query} />}
    </>
  );
}

export default App;

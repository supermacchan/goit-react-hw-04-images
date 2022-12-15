import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
import { animateScroll } from 'react-scroll';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import css from './ImageGallery.module.css';

import { ImageGalleryItem } from './ImageGalleryItem';
import { Loader } from 'components/Loader/Loader';
import { Button } from 'components/Button/Button';
import { imageAPI } from 'services/image-api';

export const ImageGallery = ({ data }) => {
    const [images, setImages] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showButton, setShowButton] = useState(false);
    const [pageNumber, setPageNumber] = useState(1);

    useEffect(() => {
        const fetchGallery = () => {
            const page = 1;
    
            imageAPI
                .fetchImages(data, page)
                .then(images => {
                    if (images.hits.length > 0 && images.totalHits <= 12) {
                        setImages(images.hits);
                        return;
                    } else if (images.hits.length > 0 && images.totalHits > 12) {
                        setImages(images.hits);
                        setShowButton(true);
                        setPageNumber(prevState => prevState + 1);
                        return;
                    }
                    toast.error('Oops! No matches found.');
                })
                .catch(error => toast.error(`${error.message}`))
                .finally(() => setLoading(false));
        };
    
        if (data === '') {
            return;
        }

        setLoading(true);
        setImages(null);
        setShowButton(false);
        setPageNumber(1);
        fetchGallery();
    }, [data]);

    const loadMoreClick = () => {
        setLoading(true);

        imageAPI
            .fetchImages(data, pageNumber)
            .then(images => {
                if (images.hits.length > 0) {
                    animateScroll.scrollToBottom();
                    setImages(prevState => {
                        return [...prevState, ...images.hits];
                    });
                    setPageNumber(prevState => prevState + 1);
                }
                
                if (images.hits.length < 12) {
                    setShowButton(false);
                    setPageNumber(1);
                    toast.info("Looks like you've reached the end of search results.");
                }
            })
            .catch(error => toast.error(`${error.message}`))
            .finally(() => setLoading(false));
    }

        return (
            <>
                <ul className={css.imageGallery}>
                    {images && images.map(image => {
                        return <ImageGalleryItem
                            key={image.id}
                            url={image.webformatURL}
                            alt={image.tags}
                            largeImage={image.largeImageURL}
                        />
                    })}
                </ul>
                {loading && <Loader />}
                {showButton && <Button onClick={loadMoreClick} />}
            </>
        );
    };


ImageGallery.propTypes = {
    data: PropTypes.string.isRequired,
};
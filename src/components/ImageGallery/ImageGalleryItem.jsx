import PropTypes from 'prop-types';
import { useState } from 'react';
import { Modal } from 'components/Modal/Modal';
import css from './ImageGalleryItem.module.css';

export const ImageGalleryItem = ({ url, alt, largeImage }) => {
    const [showModal, setShowModal] = useState(false);

    const toggleModal = () => {
        setShowModal(prevState => !prevState);
    };

        return (
            <>
                <li className={css.imageGalleryItem} >
                    <img
                        src={url}
                        alt={alt}
                        className={css.imageGalleryItemImg}
                        onClick={toggleModal}
                    />
                </li>
                
                {showModal &&
                    <Modal
                        largeImage={largeImage}
                        alt={alt}
                        onClose={toggleModal}
                    />
                }
            </>
        );
    };  

ImageGalleryItem.propTypes = {
    url: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    largeImage: PropTypes.string.isRequired,
};

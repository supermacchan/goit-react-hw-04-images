import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import css from './Modal.module.css';

export const Modal = ({ largeImage, alt, onClose }) => {
    useEffect(() => {
        const handleKeydown = event => {
            if (event.code === 'Escape') {
                onClose();
            };
        };

        window.addEventListener('keydown', handleKeydown);

        return () => {
            window.removeEventListener('keydown', handleKeydown);
        }
    }, [onClose]);

    const handleOverlayClick = event => {
        if (event.currentTarget === event.target) {
            onClose();
        }
    };

    const modalRoot = document.querySelector('#modal-root');
    
        return createPortal(
            <div className={css.overlay} onClick={handleOverlayClick}>
                <div className={css.modal}>
                    <img src={largeImage} alt={alt} />
                </div>
            </div>,
            modalRoot,
        );
    };

Modal.propTypes = {
    largeImage: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    onClose: PropTypes.func.isRequired,
};
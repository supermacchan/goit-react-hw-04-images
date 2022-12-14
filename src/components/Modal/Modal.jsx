import PropTypes from 'prop-types';
import { Component } from 'react';
import { createPortal } from 'react-dom';
import css from './Modal.module.css';

export class Modal extends Component {
    static propTypes = {
        largeImage: PropTypes.string.isRequired,
        alt: PropTypes.string.isRequired,
        onClose: PropTypes.func.isRequired,
    };

    componentDidMount() {
        window.addEventListener('keydown', this.handleKeydown);
    };

    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeydown);
    };

    handleKeydown = event => {
        if (event.code === 'Escape') {
            this.props.onClose();
        };
    };

    handleOverlayClick = event => {
        if (event.currentTarget === event.target) {
            this.props.onClose();
        }
    };

    render() {
        const { largeImage, alt } = this.props;
        const modalRoot = document.querySelector('#modal-root');
        
        return createPortal(
            <div className={css.overlay} onClick={this.handleOverlayClick}>
                <div className={css.modal}>
                    <img src={largeImage} alt={alt} />
                </div>
            </div>,
            modalRoot,
        );
    };
}
import PropTypes from 'prop-types';
import { Component } from 'react';
import { BsSearch } from 'react-icons/bs';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import css from './Searchbar.module.css';


export class Searchbar extends Component {
    static propTypes = {
        onSubmit: PropTypes.func.isRequired,
    };

    state = {
        value: '',
    }

    hadleInputChange = event => {
        this.setState({
            value: event.currentTarget.value.toLowerCase(),
        })
    }

    handleFormSubmit = event => {
        event.preventDefault();
        if (this.state.value.trim() === '') {
            toast.error('Enter search query.');
            this.reset();
            return;
        }
        this.props.onSubmit(this.state);
        this.reset();
    }

    reset = () => {
        this.setState({
            value: '',
        });
    }

    render() {
        return (
            <header className={css.searchbar}>
                <form
                    className={css.searchForm}
                    onSubmit={this.handleFormSubmit}
                >
                    <button type="submit" className={css.searchFormButton}>
                        <BsSearch />
                        <span className={css.searchFormButtonLabel}>Search</span>
                    </button>

                    <input
                        className={css.searchFormInput}
                        type="text"
                        autoComplete="off"
                        autoFocus
                        placeholder="Search images and photos"
                        value={this.state.value}
                        onChange={this.hadleInputChange}
                    />
                </form>
            </header>
        );
    }; 
};

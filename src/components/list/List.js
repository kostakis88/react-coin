import React from 'react';
import {handleResponse} from '../../helpers';
import {API_URL} from '../../config';
import Loading from '../common/Loading';
import Table from './Table';
import Pagination from './Pagination';

class List extends React.Component {
    constructor () {
        super();
        this.state = {
            loading: false,
            currencies: [],
            error: null,
            totalPages: 0,
            page: 1
        };

        this.handlePaginationClick = this.handlePaginationClick.bind(this);
    }

    componentDidMount() {
        this.fetchCurrencies();
    }

    fetchCurrencies() {
        this.setState({ loading: true });

        fetch(`${API_URL}/cryptocurrencies?page=${this.state.page}&perPage=20`)
            .then(handleResponse)
            .then((data) => {
  
                this.setState({ 
                    currencies: data.currencies,
                    totalPages: data.totalPages, 
                    loading: false 
                });

            })
            .catch((error) => {

                this.setState({ 
                    error: error.errorMessage, 
                    loading: false 
                });

            });
    }

    renderChangePercent(percent) {
        if (percent > 0) {
            return <span className="percent-raised">{percent}% &uarr;</span>
        } else if (percent < 0) {
            return <span className="percent-fallen">{percent}% &darr;</span>
        } else {
            return <span>{percent}</span>
        }
    }

    handlePaginationClick(direction) {
        let nextPage = this.state.page;

        nextPage = direction === 'next' ? nextPage + 1 : nextPage - 1;

        this.setState({ page: nextPage }, () => {
            this.fetchCurrencies();
        });
    }

    render() {
        //render only loading component, if loading is set to true
        if (this.state.loading) {
            return (
                <div className="loading-container">
                    <Loading />
                </div>
            );
        }
        //render only error message, if error occurs when fetching data
        if (this.state.error) {
            return <div className="error">{this.state.error}</div>
        }

        return (
            <div>
                <Table 
                    currencies = {this.state.currencies}
                    renderChangePercent = {this.renderChangePercent}
                />
                <Pagination 
                    totalPages = {this.state.totalPages}
                    page = {this.state.page}
                    handlePaginationClick = {this.handlePaginationClick}
                />
            </div>
        );
    }
}

export default List;
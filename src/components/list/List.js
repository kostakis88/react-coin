import React from 'react';
import {handleResponse} from '../../helpers';
import {API_URL} from '../../config';
import Loading from '../common/Loading';
import Table from './Table';

class List extends React.Component {
    constructor () {
        super();
        this.state = {
            loading: false,
            currencies: [],
            error: null
        };
    }

    componentDidMount() {

        this.setState({ loading: true });

        fetch(`${API_URL}/cryptocurrencies?page=1&perPage=20`)
            .then(handleResponse)
            .then((data) => {

                this.setState({ 
                    currencies: data.currencies, 
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
           <Table 
                currencies = {this.state.currencies}
                renderChangePercent = {this.renderChangePercent}
           />
        );
    }
}

export default List;
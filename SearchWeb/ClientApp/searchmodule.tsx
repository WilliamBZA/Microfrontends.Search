import * as React from 'react';
import { RouteComponentProps } from 'react-router';

import { Thumbnail } from './Thumbnail';

export class SearchInput extends React.Component<any, any> {
    constructor(props: any) {
        super(props);

        fetch('api/Data/?search=')
            .then(response => response.json())
            .then(data => {
                this.setState({
                    loading: false,
                    movies: data.SearchResults
                });
            });

        this.state = {
            searchFilter: '',
            loading: true
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event: any) {
        this.setState({ searchFilter: event.target.value });
    }

    handleSubmit(event: any) {
        fetch('api/Data/?search=' + this.state.searchFilter)
            .then(response => response.json())
            .then(data => {
                this.setState({
                    loading: false,
                    movies: data.SearchResults
                });
            });

        event.preventDefault();
    }

    public render() {
        if (this.state.loading) {
            return <div>Loading...</div>;
        }

        let movies = this.state.movies;
        let tripleMovies = [];
        for (let i = 0; i < movies.length; i += 3) {
            tripleMovies.push(movies.slice(i, i + 3));
        }

        return <span><form onSubmit= { this.handleSubmit }>
            <input type="text" name="searchText" value={this.state.searchFilter} onChange={this.handleChange} />
            <input type="submit" value="Search" />
        </form>
        <hr />
        {tripleMovies.map((row, index) => {
            return <div key={"row" + index} className="row">
                {row.map((movie: any) => {
                    return <div key={movie.title} className="col-lg-4">
                        <Thumbnail movieSummary={movie} />
                    </div>
                })}
            </div>
        })}</span>;
    }
}
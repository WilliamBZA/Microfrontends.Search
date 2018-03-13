import * as React from 'react';
import { RouteComponentProps } from 'react-router';

export class Thumbnail extends React.Component<any, any> {
    movieSummary: any;

    constructor(props: any) {
        super(props);

        this.movieSummary = props.movieSummary;
    }

    public render() {
        let thumbnail = 'http://placehold.it/400x250/000/fff';
        if (this.movieSummary.thumbnail && this.movieSummary.thumbnail.length) {
            thumbnail = this.movieSummary.thumbnail;
        }

        return <div className="thumbnail">
            <img className="group list-group-image" src={thumbnail} alt="" />
            <div className="caption">
                <h4 className="group inner list-group-item-heading"><a href={"/movie/" + this.movieSummary.title}>{this.movieSummary.title}</a></h4>
                <hr />
                <p className="group inner list-group-item-text">{this.movieSummary.description}</p>
                <div className="row">
                    <div className="col-xs-12 col-md-4">
                        <p className="lead">{this.movieSummary.price}</p>
                    </div>
                    <div className="col-xs-12 col-md-2">
                        <button className="btn btn-success">
                            Trailer
                            </button>
                    </div>
                    <div className="col-xs-12 col-md-5 col-md-offset-1">
                        <button className="btn btn-success">
                            Add to cart
                            </button>
                    </div>
                </div>
            </div>
        </div>;
    }
}

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
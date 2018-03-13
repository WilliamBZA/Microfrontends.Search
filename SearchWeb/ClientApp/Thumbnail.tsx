import * as React from 'react';

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
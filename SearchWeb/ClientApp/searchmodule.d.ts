import * as React from 'react';
export declare class Thumbnail extends React.Component<any, any> {
    movieSummary: any;
    urlProvider: (movieTitle: string) => string;
    constructor(props: any);
    render(): JSX.Element;
}
export declare class SearchInput extends React.Component<any, any> {
    urlProvider: (movieTitle: string) => string;
    constructor(props: any);
    handleChange(event: any): void;
    handleSubmit(event: any): void;
    render(): JSX.Element;
}

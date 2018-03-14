import * as React from 'react';
import { RouteComponentProps } from 'react-router';

import { SearchInput } from '../searchmodule';

export class Home extends React.Component<RouteComponentProps<{}>, {}> {
    public render() {
        var meowProvider = function (movieTitle: string) {
            return '/Home/MovieDetails/' + movieTitle;
        }

        return <div>
            <h1>Wanna work on your search stuff??</h1>
            <SearchInput urlProvider={meowProvider} />
        </div>;
    }
}

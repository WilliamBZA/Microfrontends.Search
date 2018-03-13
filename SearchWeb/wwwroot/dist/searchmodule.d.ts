import * as React from 'react';
import { RouteComponentProps } from 'react-router';

declare module 'microfrontends.search' {
    export class SearchInput extends React.Component<RouteComponentProps<{}>, {}> {
        public render(): JSX.Element;
    }
}
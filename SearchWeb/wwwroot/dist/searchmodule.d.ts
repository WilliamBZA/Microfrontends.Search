import * as React from 'react';

declare module 'microfrontends.search' {
    export class SearchInput extends React.Component<{}, {}> {
        public render(): JSX.Element;
    }
}
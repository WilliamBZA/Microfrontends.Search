import * as React from 'react';

declare module 'microfrontends.search' {
    export class SearchInput extends React.Component<{}, {}> {
        public render() {
            return <div>Search mutha fucka</div>;
        }
    }
}
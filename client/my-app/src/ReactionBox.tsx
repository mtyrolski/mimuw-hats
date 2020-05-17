import * as React from 'react';
import {Post} from './Post';

interface Props {
    post: Post;
}

export class ReactionBox extends React.Component<Props> {
    render() {
        return (
            <div>
                tutaj będą reakcje
            </div>
        )
    }
}

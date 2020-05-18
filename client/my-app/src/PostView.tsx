import * as React from 'react';
import {Post} from './Post';
import {Divider} from "antd";
import {ReactionBox} from "./ReactionBox";

interface Props {
    post: Post;
}

export class PostView extends React.Component<Props> {
    render() {
        return (
            <div className="site-layout-background" style={{ padding: 24, margin: 24 }}>
                <b>{this.props.post.poster.email}</b>
                <p>{this.props.post.metadata}</p>
                <br />
                <img style={{width: '100%'}} alt={this.props.post.hat.name} src={this.props.post.hat.imageUrl} />
                <Divider />
                <ReactionBox post={this.props.post} />
            </div>
        )
    }
}

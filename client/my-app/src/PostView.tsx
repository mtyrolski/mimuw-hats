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
                <b>{this.props.post.user.name}</b>
                <p>{this.props.post.description}</p>
                <Divider />
                <img style={{width: '100%'}} alt={this.props.post.imageID} src={"/images/" + this.props.post.imageID} />
                <Divider />
                <ReactionBox post={this.props.post} />
            </div>
        )
    }
}

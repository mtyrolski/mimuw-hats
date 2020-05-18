import * as React from 'react';
import {Post} from './Post';
import {Avatar, Divider} from "antd";
import {ReactionBox} from "./ReactionBox";
import {getName} from "./User";
import moment from 'moment';

interface Props {
    post: Post;
}

export class PostView extends React.Component<Props> {
    render() {
        return (
            <div className="site-layout-background" style={{ padding: 24, margin: 24 }}>
                <p style={{float: 'right', color: '#aaaaaa'}}>{moment(new Date(this.props.post.date)).fromNow()}</p>
                <div style={{marginBottom: '1em'}}>
                    <Avatar size='large' src={this.props.post.poster.photoUrl} />
                    <b style={{marginLeft: '1em'}} >{getName(this.props.post.poster)}</b>
                </div>
                <p>{this.props.post.metadata}</p>
                <img style={{width: '100%'}} alt={this.props.post.hat.name} src={this.props.post.hat.imageUrl} />
                <br />
                <br />
                <ReactionBox post={this.props.post} />
            </div>
        )
    }
}

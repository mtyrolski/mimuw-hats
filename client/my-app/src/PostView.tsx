import * as React from 'react';
import {Post} from './Post';
import {Avatar, Divider} from "antd";
import {ReactionBox} from "./ReactionBox";
import {getName} from "./User";
import moment from 'moment';
import {HatView} from "./HatView";

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
                <HatView hat={this.props.post.hat} size={20} footerVisibility={false}/>
                <ReactionBox post={this.props.post} />

            </div>
        )
    }
}

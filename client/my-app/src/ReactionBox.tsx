import * as React from 'react';
import {Post} from './Post';
import {Reaction} from "./Reaction";
import {Badge} from "antd";

interface Props {
    post: Post;
}

export interface PostReactionWrapper {
    post: Post;
    reaction: Reaction;
    count: number;
    fromCurrentUser: boolean;
}

export function getPostReactions(post: Post): Array<PostReactionWrapper> {
    return [];
    // let map: Map<Reaction, PostReactionWrapper> = new Map();

    // if (!post.reactions) return [];

    // for (let reactionInstance of post.reactions) {
    //     let instance = map.get(reactionInstance.reaction);
    //     if (!instance) {
    //         instance = {
    //             count: 0,
    //             fromCurrentUser: false,
    //             post: post,
    //             reaction: reactionInstance.reaction
    //         };
    //         map.set(reactionInstance.reaction, instance);
    //     }

    //     instance.count++;
    //     // TODO
    //     // if (reactionInstance.user == currentUser) {
    //     //     instance.fromCurrentUser = true;
    //     // }
    // }

    // return Array.from(map.values());
}

export class ReactionBox extends React.Component<Props> {
    render() {
        return (
            <div>reactions</div>
            // <div>
            //     {
            //         getPostReactions(this.props.post).map(
            //             (reactionWrapper: PostReactionWrapper) =>
            //                 <Badge count={reactionWrapper.count}>
            //                     <img style={{height: '2em'}} alt={reactionWrapper.reaction.name} src={"/images/" + reactionWrapper.reaction.imageID} />
            //                 </Badge>
            //         )
            //     }
            // </div>
        )
    }
}

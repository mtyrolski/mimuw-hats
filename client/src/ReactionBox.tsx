import * as React from 'react';
import {Post} from './Post';
import {Reaction, reactions} from "./Reaction";
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
    let map: Map<number, PostReactionWrapper> = new Map();

    reactions.forEach((value: Reaction, key: number) => {
        map.set(key, {
            count: 0,
            fromCurrentUser: false,
            post: post,
            reaction: value
        })
    })


    if (post.reactions) {
        for (let reactionInstance of post.reactions) {
            let instance = map.get(reactionInstance.id)!;

            instance.count++;
            // TODO
            // if (reactionInstance.user == currentUser) {
            //     instance.fromCurrentUser = true;
            // }
        }
    }

    return Array.from(map.values());
}

export class ReactionBox extends React.Component<Props> {
    state = {
        reactions: []
    }

    componentDidMount() {
        this.setState({reactions: getPostReactions(this.props.post)});
    }

    toggleReaction(reactionWrapper: PostReactionWrapper) {
        if (reactionWrapper.fromCurrentUser) {
            reactionWrapper.count--;
            reactionWrapper.fromCurrentUser = false;
        } else {
            reactionWrapper.count++;
            reactionWrapper.fromCurrentUser = true;
        }
        this.forceUpdate();
        // TODO make request, also forceUpdate bad
    }

    render() {
        /*<div style={{display: 'flex', justifyContent: 'space-around'}}>*/
        return (
            <div>
                {
                    this.state.reactions.map(
                        (reactionWrapper: PostReactionWrapper) => {
                            return <a style={{marginLeft: '1em'}} onClick={() => this.toggleReaction(reactionWrapper)}>
                                    <Badge count={reactionWrapper.count}>
                                    <img style={{height: '2em'}} alt={reactionWrapper.reaction.name}
                                         src={'/images/' + reactionWrapper.reaction.imageID}/>
                                </Badge>
                            </a>;
                        }
                    )
                }
            </div>
        );
    }
}

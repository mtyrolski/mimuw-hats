import {User} from './User'

export interface Post {
    user: User;
    id: number;
    description: string;
    imageID: string;
    reactions: Array<ReactionInstance>;
}
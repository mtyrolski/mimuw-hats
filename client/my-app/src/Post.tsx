import {User} from './User'
import {ReactionInstance} from "./Reaction";

export interface Post {
    user: User;
    id: number;
    description: string;
    imageID: string;
    // TODO dates and JSON
    // date: Date;
    reactions: Array<ReactionInstance>;
}
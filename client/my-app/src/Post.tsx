import {User} from './User'
import {Hat} from "./Hat";
import {ReactionInstance} from "./Reaction";

export interface Post {
    id: string;
    poster: User;
    date: string;
    hat: Hat;
    metadata: string;
    reactions: ReactionInstance[];
}
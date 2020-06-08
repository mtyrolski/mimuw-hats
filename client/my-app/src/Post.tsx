import {User} from './User'
import {Hat} from "./Hat";
import {ReactionInstance} from "./Reaction";

export interface Post {
    id: string;
    eventType: string;
    poster: User;
    date: string;
    hat: Hat;
    textContent: string;
    reactions: ReactionInstance[];
}
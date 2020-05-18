import {User} from './User'
import {Hat} from "./Hat";

export interface Post {
    id: string;
    poster: User;
    date: string;
    hat: Hat;
    metadata: string;
}
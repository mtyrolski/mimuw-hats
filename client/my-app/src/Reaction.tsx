import { User } from './Post';

export interface Reaction {
    imageID: string;
    name: string;
}

export interface ReactionInstance {
    reaction: Reaction;
    user: User;
}

import { User } from './User';

export interface Reaction {
    imageID: string;
    name: string;
    id: number;
}

export interface ReactionInstance {
    id: number;
    user: User;
}

let reactions: Reaction[];
export async function getReactions() {
    if (reactions) return reactions;

    reactions = await fetch('http://localhost:2137/reactions')
        .then(response => response.json());
    return reactions;
}


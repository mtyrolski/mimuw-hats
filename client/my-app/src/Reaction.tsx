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

// let reactions: Map<number, Reaction>;
// export async function getReactions(): Promise<Map<number, Reaction>> {
//     if (reactions) return reactions;
//
//     reactions = new Map();
//     // TODO handle error
//     await fetch('http://localhost:2137/reactions')
//         .then(response => response.json())
//         .then(json => json.map((reaction: Reaction) => {
//             reactions.set(reaction.id, reaction);
//         }))
//
//     return reactions;
// }
//

export const reactions: Map<number, Reaction> = new Map([
    [0, {
        imageID: 'hamt.png',
        name: 'cheems',
        id: 0
    }],
    [1, {
        imageID: 'tso.png',
        name: 'tso',
        id: 1
    }],
    [2, {
        imageID: 'papiez.png',
        name: 'papiez',
        id: 2
    }]
]);

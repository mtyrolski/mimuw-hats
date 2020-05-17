export interface User {
    name: string;
}

export interface Post {
    user: User;
    id: number;
    description: string;
    imageID: string;
}
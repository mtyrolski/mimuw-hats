export interface User {
    email: string;
    id: string;
    pictureUrl: string;
}

export function getName(user: User): string {
    return user.email.split('@')[0];
}

import {Hat} from './Hat'

export interface User {
    email: string;
    photoUrl: string;
}

export function getName(user: User): string {
    return user.email.split('@')[0];
}

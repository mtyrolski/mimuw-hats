import {Hat} from './Hat'

export interface User {
    id: number;
    name: string;
    hats: Array<Hat>;
}

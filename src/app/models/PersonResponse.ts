import { Person } from "./Person";

export interface PersonResponse {
    message: string;
    data: Person;
}
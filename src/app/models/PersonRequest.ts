export class PersonRequest {
    firstName;
    lastName;
    birthDate;

    constructor(firstName: string, lastName: string, birthDate: string) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.birthDate = birthDate
    }
}
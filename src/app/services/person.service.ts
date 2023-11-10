import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Person } from '../models/Person';
import { PersonResponseArray } from '../models/PersonResponseArray';
import { PersonRequest } from '../models/PersonRequest';
import { PersonResponse } from '../models/PersonResponse';

@Injectable({
  providedIn: 'root'
})
export class PersonService {
  API_URL = `api/v1/`
  constructor(private http: HttpClient) { }

  getPerson(): Observable<PersonResponseArray> {
    return this.http.get<PersonResponseArray>(this.API_URL + 'getPeople');
  }

  createPerson(person: Person): Observable<PersonResponse> {
    let pReq:PersonRequest = new PersonRequest(person.firstName, person.lastName, person.birthDate)
    return this.http.post<PersonResponse>(this.API_URL + 'createPerson', pReq);
  }

  deletePerson(id: number): Observable<any> {
    return this.http.delete<any>(this.API_URL + 'deletePerson/' + id);
  }

  updatePerson(person: Person): Observable<PersonResponse> {
    return this.http.put<PersonResponse>(this.API_URL + 'updatePerson/' + person.id, person);
  }
}

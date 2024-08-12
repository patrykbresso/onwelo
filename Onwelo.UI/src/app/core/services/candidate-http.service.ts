import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Candidate } from '../models/candidate';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

export type AddCandidateRequest = {
  fullname: string;
};

@Injectable({ providedIn: 'root' })
export class CandidateHttpService {
  readonly apiUrl = environment.apiUrl;

  constructor(private readonly _httpClient: HttpClient) {}

  getCandidates(): Observable<Candidate[]> {
    return this._httpClient.get<Candidate[]>(`${this.apiUrl}/candidates`);
  }

  addCandidate(request: AddCandidateRequest): Observable<string> {
    return this._httpClient.post<string>(`${this.apiUrl}/candidates`, request);
  }
}

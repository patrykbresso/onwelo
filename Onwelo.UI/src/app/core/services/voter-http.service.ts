import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Voter } from '../models/voter';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

export type AddVoterRequest = {
  fullname: string;
};

export type PlaceVoteRequest = {
  voterId: string;
  candidateId: string;
};

@Injectable({ providedIn: 'root' })
export class VoterHttpService {
    readonly apiUrl = environment.apiUrl;

    constructor(private readonly _httpClient: HttpClient) {}

    getVoters(): Observable<Voter[]> {
        return this._httpClient.get<Voter[]>(`${this.apiUrl}/voters`);
    }

    addVoter(request: AddVoterRequest): Observable<string> {
        return this._httpClient.post<string>(`${this.apiUrl}/voters`, request);
    }

    placeVote(request: PlaceVoteRequest): Observable<void> {
        return this._httpClient.put<void>(`${this.apiUrl}/voters`, request);
    }
}

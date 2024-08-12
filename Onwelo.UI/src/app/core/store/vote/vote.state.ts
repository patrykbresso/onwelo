import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Observable, tap } from 'rxjs';
import { VoteStateActions } from './vote-state.actions';
import { Voter } from '../../models/voter';
import { Candidate } from '../../models/candidate';
import { patch, updateItem } from '@ngxs/store/operators';
import { ToastrService } from 'ngx-toastr';
import { CandidateHttpService } from '../../services/candidate-http.service';
import { VoterHttpService } from '../../services/voter-http.service';

type VoteStateModel = {
  voters: Voter[];
  candidates: Candidate[];
};

const DEFAULT_STATE: VoteStateModel = {
  voters: [],
  candidates: []
};

@State<VoteStateModel>({
  name: 'voteState',
  defaults: DEFAULT_STATE,
})
@Injectable()
export class VoteState {
  @Selector()
  static voters(state: VoteStateModel): Voter[] {
    return state.voters;
  }

  @Selector()
  static votersWithoutVote(state: VoteStateModel): Voter[] {
    return state.voters.filter((voter: Voter) => !voter.hasVoted)
  }  

  @Selector()
  static candidates(state: VoteStateModel): Candidate[] {
    return state.candidates;
  }

  constructor(
    private readonly _toastrService: ToastrService,
    private readonly _voterHttpService: VoterHttpService,
    private readonly _candidateHttpService: CandidateHttpService
  ) {}

  @Action(VoteStateActions.GetVoters)
  getVoters(ctx: StateContext<VoteStateModel>): Observable<any> {
    return this._voterHttpService.getVoters().pipe(
      tap((voters: Voter[]) => {
        ctx.patchState({
          voters: voters
        });
      })
    );
  }
  
  @Action(VoteStateActions.GetCandidates)
  getCandidates(ctx: StateContext<VoteStateModel>): Observable<any> {
    return this._candidateHttpService.getCandidates()
      .pipe(
        tap((candidates: Candidate[]) => {
          ctx.patchState({
            candidates: candidates
          })
        })
      )
  }

  @Action(VoteStateActions.AddCandidate)
  addCandidate(ctx: StateContext<VoteStateModel>,  action: VoteStateActions.AddCandidate): Observable<any> {
    return this._candidateHttpService.addCandidate({ fullname: action.payload.fullname })
      .pipe(
        tap((candidateId: string) => {
          const newCandidate: Candidate = {
            id: candidateId,
            fullname: action.payload.fullname,
            numberOfVotes: 0
          }

          ctx.patchState({
            candidates: [...ctx.getState().candidates, newCandidate]
          })

          this._toastrService.success('Candidate added');
        })
      )
  }

  @Action(VoteStateActions.AddVoter)
  addVoter(ctx: StateContext<VoteStateModel>,  action: VoteStateActions.AddVoter): Observable<any> {
    return this._voterHttpService.addVoter({ fullname: action.payload.fullname })
      .pipe(
        tap((candidateId: string) => {
          const newVoter: Voter = {
            id: candidateId,
            fullname: action.payload.fullname,
            hasVoted: false
          }

          ctx.patchState({
            voters: [...ctx.getState().voters, newVoter]
          })

          this._toastrService.success('Voter added');
        })
      )
  }

  @Action(VoteStateActions.PlaceVote)
  placeVote(ctx: StateContext<VoteStateModel>,  action: VoteStateActions.PlaceVote): Observable<any> {
    return this._voterHttpService.placeVote(
      { 
        voterId: action.payload.voterId,
        candidateId: action.payload.candidateId
      })
      .pipe(
        tap(() => {
          ctx.setState(
            patch<VoteStateModel>({
              voters: updateItem((x) => x.id === action.payload.voterId, patch({ hasVoted: true })),
              candidates: updateItem((x) => x.id === action.payload.candidateId, patch({ numberOfVotes: (currentVotes) => currentVotes + 1 }))
            })
          );

          this._toastrService.success('Vote was correctly placed');
        })
      )
  }
}

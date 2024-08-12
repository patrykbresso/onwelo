import { ChangeDetectionStrategy, Component, computed, DestroyRef, OnInit, Signal, signal, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Actions, ofActionSuccessful, select, Store } from '@ngxs/store';
import { VoteState } from '../../../../core/store/vote/vote.state';
import { Candidate } from '../../../../core/models/candidate';
import { Voter } from '../../../../core/models/voter';
import { VoteStateActions } from '../../../../core/store/vote/vote-state.actions';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

type VotingForm = {
  voterId: FormControl<string | null>;
  candidateId: FormControl<string | null>;
};

@Component({
  selector: 'app-take-vote',
  templateUrl: './take-vote.component.html',
  styleUrl: './take-vote.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class TakeVoteComponent implements OnInit {
  voters = select(VoteState.votersWithoutVote);
  voterOptions = computed(() => 
    this.voters().map((voter: Voter) => ({
      label: voter.fullname,
      value: voter.id
    }))
  );

  candidates = select(VoteState.candidates);
  candidateOptions = computed(() => 
    this.candidates().map((candidate: Candidate) => ({
      label: candidate.fullname,
      value: candidate.id
    }))
  );

  votingForm: Signal<FormGroup<VotingForm>> = signal(
    new FormGroup<VotingForm>({
      voterId: new FormControl<string | null>(null, [Validators.required]),
      candidateId: new FormControl<string | null>(null, [Validators.required])
    })
  );

  constructor(
    private readonly _store: Store,
    private readonly _actions: Actions,
    private readonly _destroyRef: DestroyRef,
  ) {}

  ngOnInit(): void {
    this._actions
      .pipe(
        ofActionSuccessful(VoteStateActions.PlaceVote),
        takeUntilDestroyed(this._destroyRef),
      )
      .subscribe(() => {
        this.votingForm().setValue({
          candidateId: null,
          voterId: null
        });
      })
  }

  onVoteButtonClick(): void {
    this._store.dispatch(new VoteStateActions.PlaceVote({
      voterId: this.votingForm().value.voterId!,
      candidateId: this.votingForm().value.candidateId!
    }))
  }
}


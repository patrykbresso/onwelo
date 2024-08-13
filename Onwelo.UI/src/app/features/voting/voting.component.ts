import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngxs/store';
import { VoteStateActions } from '../../core/store/vote/vote-state.actions';

@Component({
  selector: 'app-voting',
  templateUrl: './voting.component.html',
  styleUrl: './voting.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class VotingComponent implements OnInit {
  constructor(private readonly _store: Store) {}
  ngOnInit(): void {
    this._store.dispatch(new VoteStateActions.GetVoters());
    this._store.dispatch(new VoteStateActions.GetCandidates());
  }
}

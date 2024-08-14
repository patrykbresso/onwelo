import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { select, Store } from '@ngxs/store';
import { VoteStateActions } from '../../../../core/store/vote/vote-state.actions';
import { VoteState } from '../../../../core/store/vote/vote.state';
import { TableColumn } from '../../../../core/models/table-column';
import { UiAddParticipantComponent } from '../../../../shared/components/ui-add-participant/ui-add-participant.component';
import { MatDialog } from '@angular/material/dialog';
import { filter, Observable } from 'rxjs';

@Component({
  selector: 'app-vote-info',
  templateUrl: './vote-info.component.html',
  styleUrl: './vote-info.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class VoteInfoComponent implements OnInit {
  voters = select(VoteState.voters);
  candidates = select(VoteState.candidates);

  readonly votersColumns: TableColumn[] = [
    {
      title: 'Name',
      name: 'fullname' 
    },
    {
      title: 'Has voted',
      name: 'hasVoted'
    } 
  ] as TableColumn[]

  readonly candidatesColumns: TableColumn[] = [
    {
      title: 'Name',
      name: 'fullname' 
    },
    {
      title: 'Votes',
      name: 'numberOfVotes'
    } 
  ] as TableColumn[]

  private readonly _addVoterTitle = "Add Voter";
  private readonly _addCandidateTitle = "Add Candidate";
  private readonly _dialogWidthInPx = "500px";

  constructor(
    private readonly _store: Store,
    private readonly dialog: MatDialog
  ) { }

  ngOnInit(): void {
      this._store.dispatch(new VoteStateActions.GetVoters());
      this._store.dispatch(new VoteStateActions.GetCandidates());
  }

  onAddVoter(): void {
    this.openAddParticipantDialog(this._addVoterTitle)
      .pipe(
        filter((name) => name != null)
      )
      .subscribe((name) => {
        this._store.dispatch(new VoteStateActions.AddVoter({ fullname: name }))
      })
  }

  onAddCandidate(): void {
    this.openAddParticipantDialog(this._addCandidateTitle)
      .pipe(
        filter((name) => name != null)
      )
      .subscribe((name) => {
        this._store.dispatch(new VoteStateActions.AddCandidate({ fullname: name }))
      })
  }

  private openAddParticipantDialog(title: string): Observable<any> {
    const dialogRef = this.dialog.open(UiAddParticipantComponent, {
      width: this._dialogWidthInPx,
      data: { title }
    });

    return dialogRef.afterClosed()
  }
}

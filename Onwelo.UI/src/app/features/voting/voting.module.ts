import { NgModule } from '@angular/core';
import { VotingComponent } from './voting.component';
import { VotingRoutingModule } from './voting-routing.module';
import { VoteInfoComponent } from './components/vote-info/vote-info.component';
import { TakeVoteComponent } from './components/take-vote/take-vote.component';
import { UiTableComponent } from '../../shared/components/ui-table/ui-table.component';
import { UiDropdownInputComponent } from '../../shared/components/ui-dropdown-input/ui-dropdown-input.component';
import { MatDialogModule } from '@angular/material/dialog';
import { UiAddParticipantComponent } from '../../shared/components/ui-add-participant/ui-add-participant.component';
import { MatButton } from '@angular/material/button';

@NgModule({
  imports: [
    VotingRoutingModule,
    UiTableComponent,
    UiDropdownInputComponent,
    MatDialogModule,
    UiAddParticipantComponent,
    MatButton
  ],
  exports: [VotingComponent],
  declarations: [
    VotingComponent,
    VoteInfoComponent,
    TakeVoteComponent
  ]
})
export class VotingModule {}

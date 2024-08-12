import { RouterModule } from '@angular/router';
import { VotingComponent } from './voting.component';

export const VotingRoutingModule = RouterModule.forChild([
    {
      path: '',
      component: VotingComponent,
    }
]);
  
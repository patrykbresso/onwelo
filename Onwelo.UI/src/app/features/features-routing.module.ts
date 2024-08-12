import { Routes } from '@angular/router';

export const featuresRouting: Routes = [
  {
    path: '',
    loadChildren: () => import('./voting/voting.module').then(m => m.VotingModule)
  },
  {
    path: '**',
    redirectTo: '/login-alert'
  }
];

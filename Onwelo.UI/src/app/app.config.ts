import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { ToastrModule } from 'ngx-toastr';
import { NgxsModule } from '@ngxs/store';
import { VoteState } from './core/store/vote/vote.state';
import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { requestErrorInterceptor } from './core/interceptors/request-error.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes),
    provideAnimations(),
    provideHttpClient(withInterceptors([requestErrorInterceptor])),
    importProvidersFrom(
      ToastrModule.forRoot(),
      NgxsModule.forRoot([VoteState]),
      HttpClient    
    ),
  ]
};

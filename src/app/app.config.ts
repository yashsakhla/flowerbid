import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { provideCountdown } from "ngx-countdown";
import { provideToastr } from 'ngx-toastr';


import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './services/interceptor/auth.interceptor';


export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideAnimations(), provideCountdown(), BrowserAnimationsModule, provideRouter(routes), importProvidersFrom(FontAwesomeModule,CarouselModule), provideHttpClient(withInterceptors([authInterceptor])), provideToastr()]
};

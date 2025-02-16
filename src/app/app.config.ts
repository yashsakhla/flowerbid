import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { provideCountdown } from "ngx-countdown";


import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';


export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideAnimations(), provideCountdown(), BrowserAnimationsModule, provideRouter(routes), importProvidersFrom(FontAwesomeModule,CarouselModule), provideHttpClient()]
};

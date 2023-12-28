import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { RouterModule, provideRouter } from '@angular/router';
import { routerOptions, routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';

import { ShortenerService } from './services/shortener.service';
import { LocalStorageService } from './services/local-storage.service';
import { UrlService } from './services/url.service';

export const appConfig: ApplicationConfig = {
  providers: [
    // provideRouter(routes),
    importProvidersFrom(RouterModule.forRoot(routes, routerOptions)),
    provideHttpClient(),
    ShortenerService,
    LocalStorageService,
    UrlService,
  ],
};

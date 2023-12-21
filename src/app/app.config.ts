import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';

import { ShortenerService } from './services/shortener.service';
import { LocalStorageService } from './services/local-storage.service';
import { UrlService } from './services/url.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    ShortenerService,
    LocalStorageService,
    UrlService
  ],
};

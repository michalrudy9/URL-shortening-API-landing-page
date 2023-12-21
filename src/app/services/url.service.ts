import {
  Injectable,
  Signal,
  WritableSignal,
  inject,
  signal,
} from '@angular/core';

import { Url } from '../models/url.model';
import { LocalStorageService } from './local-storage.service';

@Injectable()
export class UrlService {
  private localStorageService = inject(LocalStorageService);
  private urls: WritableSignal<Url[]>;

  constructor() {
    this.urls = signal<Url[]>([]);
  }

  // In the future will be: () => Signal<ErrorMessage>
  getUrls(): Signal<Url[]> {
    // In the future will be: return this.urls.asReadonly;
    return this.urls;
  }

  updateUrls(shortenedUrl: Url) {
    this.urls.update((elements: Url[]) => [...elements, shortenedUrl]);
    this.localStorageService.saveData('urls', this.urls());
  }
}

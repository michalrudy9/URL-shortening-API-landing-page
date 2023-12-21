import { Injectable, Signal, WritableSignal, signal } from '@angular/core';

import { Url } from '../models/url.model';

@Injectable()
export class UrlService {
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
  }
}

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, Signal, inject, signal } from '@angular/core';
import { catchError, map, throwError } from 'rxjs';

import { PostData } from '../models/post-data.model';
import { Url } from '../models/url.model';
import { ErrorMessage } from '../models/error-message.model';

@Injectable()
export class ShortenerService {
  private http = inject(HttpClient);
  private urls = signal<Url[]>([]);
  private errorMessage = signal<ErrorMessage>({ status: 0, statusText: '' });

  // In the future will be: () => Signal<ErrorMessage>
  getUrls(): Signal<Url[]> {
    // In the future will be: return this.urls.asReadonly;
    return this.urls;
  }

  // In the future will be: () => Signal<ErrorMessage>
  getErrorMessage(): Signal<ErrorMessage> {
    // In the future will be: return this.errorMessage.asReadonly;
    return this.errorMessage;
  }

  shortenUrl(url: string) {
    const body = { url: url };
    this.http
      .post<PostData>('/api/v1/shorten', body)
      .pipe(
        map((postData: PostData) => this.getShortenedUrlModel(url, postData)),
        catchError((error: HttpErrorResponse) => this.handleError(error))
      )
      .subscribe((shortenedUrl: Url) =>
        this.urls.update((elements: Url[]) => [...elements, shortenedUrl])
      );
  }

  private getShortenedUrlModel(baseUrl: string, postData: PostData): Url {
    return { baseUrl: baseUrl, shortenedUrl: postData.result_url };
  }

  private handleError(error: HttpErrorResponse) {
    const errorMessage: ErrorMessage = {
      status: error.status,
      statusText: 'Something bad happened, please try again later.',
    };
    this.errorMessage.set(errorMessage);
    return throwError(
      () => new Error('Something bad happened, please try again later.')
    );
  }
}

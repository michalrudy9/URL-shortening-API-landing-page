import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {
  Injectable,
  Signal,
  WritableSignal,
  inject,
  signal,
} from '@angular/core';
import { catchError, map, throwError } from 'rxjs';

import { PostData } from '../models/post-data.model';
import { Url } from '../models/url.model';
import { ErrorMessage } from '../models/error-message.model';
import { UrlService } from './url.service';

@Injectable()
export class ShortenerService {
  private http = inject(HttpClient);
  private urlService = inject(UrlService);

  private errorMessage: WritableSignal<ErrorMessage>;
  private isRequest: WritableSignal<boolean>;

  constructor() {
    this.errorMessage = signal<ErrorMessage>({ status: 0, statusText: '' });
    this.isRequest = signal<boolean>(false);
  }

  // In the future will be: () => Signal<ErrorMessage>
  getErrorMessage(): Signal<ErrorMessage> {
    // In the future will be: return this.errorMessage.asReadonly;
    return this.errorMessage;
  }

  setRequestBoolean(state: boolean) {
    this.isRequest.set(state);
  }

  getRequestBoolean(): Signal<boolean> {
    return this.isRequest;
  }

  shortenUrl(url: string) {
    if (this.urlService.existUrl(url)) {
      this.setErrorMessage(-1, 'This Url exist on the list!');
    } else {
      this.setRequestBoolean(true);
      const body = { url: url };
      this.http
        .post<PostData>('/api/v1/shorten', body)
        .pipe(
          map((postData: PostData) => this.getShortenedUrlModel(url, postData)),
          catchError((error: HttpErrorResponse) => this.handleError(error))
        )
        .subscribe((shortenedUrl: Url) => {
          this.urlService.updateUrls(shortenedUrl);
          this.setRequestBoolean(false);
        });
    }
  }

  private getShortenedUrlModel(baseUrl: string, postData: PostData): Url {
    return { baseUrl: baseUrl, shortenedUrl: postData.result_url };
  }

  private handleError(error: HttpErrorResponse) {
    this.setRequestBoolean(false);
    this.setErrorMessage(
      error.status,
      'Something bad happened, please try again later.'
    );
    return throwError(
      () => new Error('Something bad happened, please try again later.')
    );
  }

  private setErrorMessage(status: number, statusText: string) {
    const errorMessage: ErrorMessage = {
      status: status,
      statusText: statusText,
    };
    this.errorMessage.set(errorMessage);
  }
}

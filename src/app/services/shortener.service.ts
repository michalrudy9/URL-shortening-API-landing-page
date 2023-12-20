import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { PostData } from '../models/post-data.model';
import { catchError, map, throwError } from 'rxjs';
import { ShortenedUrl } from '../models/shortened-url.model';
import { ErrorMessage } from '../models/error-message.model';

@Injectable()
export class ShortenerService {
  private http = inject(HttpClient);
  shortenedUrl = signal<ShortenedUrl>({ url: '' });
  errorMessage = signal<ErrorMessage>({ status: 0, statusText: '' });

  shortenUrl(url: string) {
    const body = { url: url };
    this.http
      .post<PostData>('/api/v11/shorten', body)
      .pipe(
        map((postData: PostData) => this.getShortenedUrlModel(postData)),
        catchError((error: HttpErrorResponse) => this.handleError(error))
      )
      .subscribe((shortenedUrl: ShortenedUrl) =>
        this.shortenedUrl.set(shortenedUrl)
      );
  }

  private getShortenedUrlModel(postData: PostData): ShortenedUrl {
    return { url: postData.result_url };
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

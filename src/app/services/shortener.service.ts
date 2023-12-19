import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class ShortenerService {
  constructor(private http: HttpClient) {}

  shortenUrl(url: string) {
    const body = { url: url };
    this.http
      .post('/api/v1/shorten', body)
      .subscribe((response) => console.log(response));
  }
}

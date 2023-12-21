import { Component, OnInit, Signal, inject } from '@angular/core';

import { ShortenerService } from '../services/shortener.service';
import { Url } from '../models/url.model';

@Component({
  selector: 'app-shortened-links',
  standalone: true,
  imports: [],
  templateUrl: './shortened-links.component.html',
  styleUrl: './shortened-links.component.scss',
})
export class ShortenedLinksComponent implements OnInit {
  private shortenerService = inject(ShortenerService);
  protected urls!: Signal<Url[]>;

  ngOnInit(): void {
    this.urls = this.shortenerService.getUrls();
  }
}

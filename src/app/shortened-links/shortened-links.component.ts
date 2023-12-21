import { Component, OnInit, Signal, inject } from '@angular/core';

import { Url } from '../models/url.model';
import { UrlService } from '../services/url.service';

@Component({
  selector: 'app-shortened-links',
  standalone: true,
  imports: [],
  templateUrl: './shortened-links.component.html',
  styleUrl: './shortened-links.component.scss',
})
export class ShortenedLinksComponent implements OnInit {
  private urlService = inject(UrlService);
  protected urls!: Signal<Url[]>;

  ngOnInit(): void {
    this.urls = this.urlService.getUrls();
  }
}

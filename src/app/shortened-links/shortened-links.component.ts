import { Component, inject } from '@angular/core';
import { ShortenerService } from '../services/shortener.service';

@Component({
  selector: 'app-shortened-links',
  standalone: true,
  imports: [],
  templateUrl: './shortened-links.component.html',
  styleUrl: './shortened-links.component.scss',
})
export class ShortenedLinksComponent {
  private shortenerService = inject(ShortenerService);
  protected urls = this.shortenerService.getUrls();
}

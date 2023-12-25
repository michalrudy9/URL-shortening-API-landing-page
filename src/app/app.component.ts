import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

import { NavigationComponent } from './navigation/navigation.component';
import { JumbotronComponent } from './jumbotron/jumbotron.component';
import { ShortenUrlComponent } from './shorten-url/shorten-url.component';
import { ShortenedLinksComponent } from './shortened-links/shortened-links.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { GetStartedComponent } from './get-started/get-started.component';
import { FooterComponent } from './footer/footer.component';
import { UrlService } from './services/url.service';
import { LocalStorageService } from './services/local-storage.service';
import { Url } from './models/url.model';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  imports: [
    CommonModule,
    RouterOutlet,
    NavigationComponent,
    JumbotronComponent,
    ShortenUrlComponent,
    ShortenedLinksComponent,
    StatisticsComponent,
    GetStartedComponent,
    FooterComponent,
  ],
})
export class AppComponent implements OnInit {
  private urlService = inject(UrlService);
  private localStorageService = inject(LocalStorageService);

  ngOnInit(): void {
    const urlsFromStorage = this.localStorageService.getData('urls') as Url[];
    if (urlsFromStorage.length !== 0) {
      urlsFromStorage.forEach((url) => this.urlService.updateUrls(url));
    }
  }
}

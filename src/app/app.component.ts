import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';

import { NavigationComponent } from './navigation/navigation.component';
import { JumbotronComponent } from './jumbotron/jumbotron.component';
import { ShortenUrlComponent } from './shorten-url/shorten-url.component';
import { ShortenedLinksComponent } from './shortened-links/shortened-links.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { GetStartedComponent } from './get-started/get-started.component';
import { FooterComponent } from './footer/footer.component';

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
export class AppComponent {
  title = 'URL-shortening-API-landing-page';
}

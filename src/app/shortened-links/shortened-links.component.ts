import {
  Component,
  ElementRef,
  OnInit,
  QueryList,
  Renderer2,
  Signal,
  ViewChildren,
  inject,
} from '@angular/core';
import { ClipboardModule } from '@angular/cdk/clipboard';

import { Url } from '../models/url.model';
import { UrlService } from '../services/url.service';

@Component({
  selector: 'app-shortened-links',
  standalone: true,
  imports: [ClipboardModule],
  templateUrl: './shortened-links.component.html',
  styleUrl: './shortened-links.component.scss',
})
export class ShortenedLinksComponent implements OnInit {
  private urlService = inject(UrlService);
  private renderer = inject(Renderer2);
  protected urls!: Signal<Url[]>;
  @ViewChildren('cb', { read: ElementRef })
  private copyButtons!: QueryList<ElementRef>;

  ngOnInit(): void {
    this.urls = this.urlService.getUrls();
  }

  onCopy(clickedButton: HTMLElement) {
    this.copyButtons.forEach((copyButton) => {
      this.renderer.removeClass(
        copyButton.nativeElement,
        'neutral-very-dark-blue-background-color'
      );
      this.renderer.addClass(
        copyButton.nativeElement,
        'primary-cyan-background-color'
      );
      this.renderer.setProperty(
        copyButton.nativeElement,
        'textContent',
        'Copy'
      );
    });
    clickedButton.classList.replace(
      'primary-cyan-background-color',
      'neutral-very-dark-blue-background-color'
    );
    clickedButton.innerText = 'Copied!';
  }
}

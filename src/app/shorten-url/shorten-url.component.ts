import { Component, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { ShortenerService } from '../services/shortener.service';

@Component({
  selector: 'app-shorten-url',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './shorten-url.component.html',
  styleUrl: './shorten-url.component.scss',
})
export class ShortenUrlComponent implements OnInit {
  protected form!: FormGroup;
  private shortenerService = inject(ShortenerService);
  protected errorMessage = this.shortenerService.getErrorMessage();

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      url: this.formBuilder.control(null, Validators.required),
    });
  }

  protected onSubmit() {
    const userUrl = this.form.value['url'];
    const preparedUrl = this.prepareUrl(userUrl);
    this.shortenerService.shortenUrl(preparedUrl);
    this.form.reset();
  }

  private prepareUrl(url: string): string {
    let urlWithoutStartEndWhiteSpacesCharacters = '';

    if (/^\s/.test(url)) {
      urlWithoutStartEndWhiteSpacesCharacters = url.trimStart();
    } else if (/\s$/.test(url)) {
      urlWithoutStartEndWhiteSpacesCharacters = url.trimEnd();
    } else {
      urlWithoutStartEndWhiteSpacesCharacters = url;
    }
    return urlWithoutStartEndWhiteSpacesCharacters;
  }
}

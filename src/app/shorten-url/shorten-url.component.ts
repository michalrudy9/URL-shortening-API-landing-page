import { Component, OnInit, Signal, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

import { ShortenerService } from '../services/shortener.service';
import { ErrorMessage } from '../models/error-message.model';

@Component({
  selector: 'app-shorten-url',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './shorten-url.component.html',
  styleUrl: './shorten-url.component.scss',
})
export class ShortenUrlComponent implements OnInit {
  private shortenerService = inject(ShortenerService);
  private formBuilder = inject(FormBuilder);
  protected form!: FormGroup;
  protected errorMessage!: Signal<ErrorMessage>;

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      url: this.formBuilder.control(null, Validators.required),
    });
    this.errorMessage = this.shortenerService.getErrorMessage();
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

import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-shorten-url',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './shorten-url.component.html',
  styleUrl: './shorten-url.component.scss',
})
export class ShortenUrlComponent implements OnInit {
  protected form!: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      url: this.formBuilder.control(null, Validators.required),
    });
  }

  onSubmit() {
    const userUrl = this.form.value['url'];
  }
}

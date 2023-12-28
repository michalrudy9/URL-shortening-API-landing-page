import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';

import AOS from 'aos';

@Component({
  selector: 'app-jumbotron',
  standalone: true,
  imports: [],
  templateUrl: './jumbotron.component.html',
  styleUrl: './jumbotron.component.scss',
})
export class JumbotronComponent implements OnInit {
  private router = inject(Router);

  ngOnInit(): void {
    AOS.init({
      duration: 1200,
    });
  }

  protected onScrollGetStarted() {
    this.router.navigateByUrl('#boost-link');
  }
}

import { Component, OnInit } from '@angular/core';

import AOS from 'aos';

@Component({
  selector: 'app-get-started',
  standalone: true,
  imports: [],
  templateUrl: './get-started.component.html',
  styleUrl: './get-started.component.scss',
})
export class GetStartedComponent implements OnInit {
  ngOnInit(): void {
    AOS.init();
  }
}

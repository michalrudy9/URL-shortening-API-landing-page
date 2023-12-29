import { Component, OnInit } from '@angular/core';

import AOS from 'aos';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent implements OnInit {
  ngOnInit(): void {
    AOS.init();
  }
}

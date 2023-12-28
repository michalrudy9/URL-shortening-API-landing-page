import { Component, OnInit } from '@angular/core';
import AOS from 'aos';

@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [],
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.scss',
})
export class StatisticsComponent implements OnInit {
  ngOnInit(): void {
    AOS.init();
  }
}

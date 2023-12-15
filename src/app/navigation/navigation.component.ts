import { NgClass } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [NgClass],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss',

})
export class NavigationComponent {
  protected isMenuCollapsed: boolean = true;

  protected onAnimateCollapse() {
    this.isMenuCollapsed = !this.isMenuCollapsed
  }
}

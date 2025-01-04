import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-home',
  standalone: true,
    imports: [
        RouterLink
    ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  public yesterday(): String {
    const date = new Date();
    date.setDate(date.getDate() - 1);
    return date.toISOString().split('T')[0]
  }
}

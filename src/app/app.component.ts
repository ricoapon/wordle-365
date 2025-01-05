import {Component, OnInit} from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {VERSION} from "../version";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'wordle-365';

  async ngOnInit() {
    console.log(VERSION)
    const { default: dictionaryNL } = await import('dictionary-nl');
    console.log(dictionaryNL)
  }
}

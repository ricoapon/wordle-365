import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, RouterLink} from "@angular/router";

@Component({
  selector: 'app-wordle',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './wordle.component.html',
  styleUrl: './wordle.component.css'
})
export class WordleComponent implements OnInit {
  protected date: Date | undefined;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    const dateParam = this.route.snapshot.queryParams['date'];
    if (dateParam) {
      this.date = new Date(dateParam);
    }
  }
}

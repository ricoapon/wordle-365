import {Component, OnInit} from '@angular/core';
import {RouterLink} from "@angular/router";
import {NgForOf, NgIf} from "@angular/common";
import {StorageService} from "../backend/storage-service";
import {WordleSingleDay} from "../backend/wordle-single-day";
import {DateUtilService} from "../backend/date-util-service";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterLink,
    NgForOf,
    NgIf
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  public dataWithoutToday: WordleSingleDay[]
  public today: WordleSingleDay | undefined;
  private readonly todayDate: String;

  constructor(private storageService: StorageService, dateUtilService: DateUtilService) {
    this.todayDate = dateUtilService.today();
  }

  ngOnInit(): void {
    this.today = this.storageService.getForDate(this.todayDate);
    // We reverse the data, so that the newest games are always shown on top.
    this.dataWithoutToday = this.storageService.getAll()
      .reverse()
      .filter(w => w != this.today)
  }
}

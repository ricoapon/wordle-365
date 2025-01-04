import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";
import {NgForOf} from "@angular/common";
import {StorageService} from "../backend/storage-service";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterLink,
    NgForOf
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  constructor(storageService: StorageService) {
    console.log(storageService.getAll());
  }

  public yesterday(): String {
    const date = new Date();
    date.setDate(date.getDate() - 1);
    return date.toISOString().split('T')[0]
  }
}

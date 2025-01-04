import { Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {WordleComponent} from "./wordle/wordle.component";

export const routes: Routes = [
  {path: 'wordle', component: WordleComponent},
  {path: '**', component: HomeComponent},
];

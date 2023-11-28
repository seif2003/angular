import { Component } from '@angular/core';
import {CATS} from "../mock-cats";
import * as _ from 'lodash';
import { Cat } from '../cats';

@Component({
  selector: 'app-cats',
  templateUrl: './cats.component.html',
  styleUrls: ['./cats.component.css']
})
export class CatsComponent {
  cats = CATS;
}
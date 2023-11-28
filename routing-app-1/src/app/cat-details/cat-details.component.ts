import { Component,Input,OnInit } from '@angular/core';
import { Cat } from '../cats';
import * as _ from 'lodash';
import {CATS} from '../mock-cats';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-cat-details',
  templateUrl: './cat-details.component.html',
  styleUrls: ['./cat-details.component.css']
})

export class CatDetailsComponent {
  cats = CATS;
  cat: Cat;
  idFromRoute : Number= +this.route.snapshot.paramMap.get('id');
  constructor(private route: ActivatedRoute) {
  }  
  ngOnInit() {
    const idFromRoute = +this.route.snapshot.paramMap.get('id');
    this.getCatById(idFromRoute);
  }    
  getCatById(id) {
    let index = _.findIndex(this.cats, (c: Cat) => {
    return c.id === id
    });
    this.cat = this.cats[index];
  }
}

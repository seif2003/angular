import { Component,Input,OnInit } from '@angular/core';
import { Dog } from '../dogs';
import * as _ from 'lodash';
import {DOGS} from '../mock-dogs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dogs-details',
  templateUrl: './dogs-details.component.html',
  styleUrls: ['./dogs-details.component.css']
})

export class DogDetailsComponent {
  dogs = DOGS;
  dog: Dog;
  idFromRoute : Number= +this.route.snapshot.paramMap.get('id');
  constructor(private route: ActivatedRoute) {
  }  
  ngOnInit() {
    const idFromRoute = +this.route.snapshot.paramMap.get('id');
    this.getCatById(idFromRoute);
  }    
  getCatById(id) {
    let index = _.findIndex(this.dogs, (c: Dog) => {
    return c.id === id
    });
    this.dog = this.dogs[index];
  }
}

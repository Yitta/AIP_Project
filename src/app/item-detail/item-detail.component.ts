import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';


@Component({
    selector: 'item-detail',
    templateUrl: './item-detail.component.html',
    styleUrls: ['./item-detail.component.css']
})
export class ItemDetailComponent {
   movies = [
{
  "model": "movie",
  "keys": ["id"],
  "data": {
    "id": 3,
    "title": "It",
    "releaseDate": "2017-09-08",
    "duration": 135,
    "synopsis": "In the Town of Derry, the local kids are disappearing one by one, leaving behind bloody remains. In a place known as 'The Barrens', a group of seven kids are united by their horrifying and strange encounters with an evil clown and their determination to kill It.",
    "genre": ["drama", "horror"]
  }
}]

  activeMovie;

  selectMovie(movie) {
    this.activeMovie = movie;
    console.log(this.activeMovie);
  }
 }
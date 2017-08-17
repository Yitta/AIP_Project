import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {
  movies = [{
  "model": "movie",
  "keys": ["id"],
  "data": {
    "id": 1,
    "title": "Dunkirk",
    "releaseDate": "2017-07-21",
    "duration": "50%",
    "synopsis": "The film depicts the dramatic and true story of the Dunkirk evacuations from a war torn beach and harbour in France, following the seemingly doomed plight of allied soldiers in World War II. As the enemy forces close in it seems the troops have nowhere to go, but help is at hand and a fierce battle ensues.",
    "genre": ["action", "drama", "history"]
  }
}, {
  "model": "movie",
  "keys": ["id"],
  "data": {
    "id": 2,
    "title": "The Emoji Movie",
    "releaseDate": "2017-08-04",
    "duration": "15%",
    "synopsis": "The Emoji Movie unlocks the never-before-seen secret world inside your smartphone. Hidden within the messaging app is Textopolis, a bustling city where all your favorite emojis live, hoping to be selected by the phone's user. In this world, each emoji has only one facial expression - except for Gene, an exuberant emoji who was born without a filter and is bursting with multiple expressions. Determined to become \"normal\" like the other emojis, Gene enlists the help of his handy best friend Hi-5 and the notorious code breaker emoji Jailbreak. Together, they embark on an epic \"app-venture\" through the apps on the phone, each its own wild and fun world, to find the Code that will fix Gene. But when a greater danger threatens the phone, the fate of all emojis depends on these three unlikely friends who must save their world before it's deleted forever.",
    "genre": ["animation", "adventure", "comedy"]
  }
}, {
  "model": "movie",
  "keys": ["id"],
  "data": {
    "id": 3,
    "title": "It",
    "releaseDate": "2017-09-08",
    "duration": "25%",
    "synopsis": "In the Town of Derry, the local kids are disappearing one by one, leaving behind bloody remains. In a place known as 'The Barrens', a group of seven kids are united by their horrifying and strange encounters with an evil clown and their determination to kill It.",
    "genre": ["drama", "horror"]
  }
}, {
  "model": "movie",
  "keys": ["id"],
  "data": {
    "id": 4,
    "title": "The Dark Tower",
    "releaseDate": "2017-08-18",
    "duration": "10%",
    "synopsis": "The last Gunslinger, Roland Deschain, has been locked in an eternal battle with Walter O'Dim, also known as the Man in Black, determined to prevent him from toppling the Dark Tower, which holds the universe together. With the fate of the worlds at stake, good and evil will collide in the ultimate battle as only Roland can defend the Tower from the Man in Black.",
    "genre": ["action", "adventure", "fantasy"]
  }
}, {
  "model": "movie",
  "keys": ["id"],
  "data": {
    "id": 5,
    "title": "Atomic Blonde",
    "releaseDate": "2017-08-09",
    "duration": "5%",
    "synopsis": "An undercover MI6 agent is sent to Berlin during the Cold War to investigate the murder of a fellow agent and recover a missing list of double agents.",
    "genre": ["action", "mystery", "thriller"]
  }
}]

  activeMovie;

  selectMovie(movie) {
    this.activeMovie = movie;
    console.log(this.activeMovie);
  }
}
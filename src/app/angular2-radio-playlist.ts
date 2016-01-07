import {Component, Inject} from 'angular2/core';
import {Song} from './model/song';
import {SongService} from './services/songservice/songservice';


@Component({
  selector: 'angular2-radio-playlist-app',
  providers: [],
  templateUrl: 'app/angular2-radio-playlist.html',
  directives: [],
  pipes: []
})
export class Angular2RadioPlaylistApp {
  defaultMeaning: number = 42;
  songs: Song[];

  constructor(songService: SongService) {
    songService.find().subscribe(
      songs => this.songs = songs,
      err => console.log(err)
    );
  }

  meaningOfLife(meaning) {
    return `The meaning of life is ${meaning || this.defaultMeaning}`;
  }
}

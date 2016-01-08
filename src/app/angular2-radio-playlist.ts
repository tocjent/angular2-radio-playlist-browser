import {Component, Inject, Input} from 'angular2/core';
import {Song} from './model/song';
import {SongService} from './services/songservice/songservice';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';


class SearchForm {
  title = '';
}


@Component({
  selector: 'angular2-radio-playlist-app',
  providers: [],
  templateUrl: 'app/angular2-radio-playlist.html',
  directives: [],
  pipes: []
})
export class Angular2RadioPlaylistApp {
  songs: Song[];
  form = new SearchForm();
  formUpdates = new Subject<SearchForm>();

  constructor(songService: SongService) {

    Observable.combineLatest<[SearchForm, Song[]]>(
      this.formUpdates,
      songService.find()
    ).subscribe(
      ([form, songs]) => this.songs = songs.filter(
        song => song.title.toLowerCase().indexOf(form.title.toLowerCase()) > -1
      )
    );

    this.update();
  }

  update() {
    this.formUpdates.next(this.form);
  }
}

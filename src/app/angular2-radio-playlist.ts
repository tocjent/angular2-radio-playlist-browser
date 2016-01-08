import {Component, Inject, Input} from 'angular2/core';
import {Song} from './model/song';
import {SongService} from './services/songservice/songservice';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';


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
  form = {
    title: ''
  };
  formUpdates = new Subject();

  constructor(songService: SongService) {

    Observable.combineLatest(
      this.formUpdates,
      songService.find()
    ).subscribe(
      v => {
        var form = v[0];
        var songs = v[1];
        this.songs = songs.filter(
          song => song.title.toLowerCase().indexOf(form.title.toLowerCase()) > -1
        )
      }
    );

    this.update();
  }

  update() {
    this.formUpdates.next(this.form);
  }
}

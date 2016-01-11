import {Component, Input} from 'angular2/core';
import {Observable} from 'rxjs/Observable';
import {Song as SongModel} from '../../model/song';


@Component({
  selector: 'radio-song',
  templateUrl: 'app/components/song/song.html',
  styleUrls: ['app/components/song/song.css'],
  providers: [],
  directives: [],
  pipes: []
})
export class Song {
  @Input() songObservable: Observable<SongModel[]>;
  song: SongModel;

  constructor() {}

  ngOnInit() {
    this.songObservable.subscribe(
      songs => {
        console.log('binding song', songs);
        return this.song = songs[0];
      }
    );
  }
}

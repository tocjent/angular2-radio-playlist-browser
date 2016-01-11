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
  isFlipped = false;

  constructor() {}

  ngOnInit() {
    const __this = this;
    this.songObservable.subscribe(
      songs => {
        this.isFlipped = true;
        setTimeout(() => {
          this.isFlipped = false;
          this.song = songs[0];
        }, 500);
      }
    );
  }
}

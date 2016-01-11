import {Component, Inject, Input} from 'angular2/core';
import {Song} from './model/song';
import {SongService} from './services/songservice/songservice';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';


class SearchParams {
  station = '';
  author = '';
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
  searchParams = new SearchParams();
  searchParamsUpdates = new Subject<SearchParams>();

  constructor(songService: SongService) {
    const validSong = (sp: SearchParams) => (song: Song) => {
      const validAttr = attrName => {
        const songAttr = song[attrName].toLowerCase();
        const paramAttr = sp[attrName].toLowerCase();
        return songAttr.indexOf(paramAttr) > -1;
      };
      return ["station", "author", "title"]
        .reduce((acc, el) => acc && validAttr(el), true);
    };

    Observable.combineLatest<[SearchParams, Song[]]>(
      this.searchParamsUpdates,
      songService.currentlyPlaying()
    ).subscribe(
      ([searchParams, songs]) => Object.assign(this, {
        songs: songs.filter(validSong(searchParams))
      })
    );
    this.update();
  }

  update() {
    this.searchParamsUpdates.next(this.searchParams);
  }
}

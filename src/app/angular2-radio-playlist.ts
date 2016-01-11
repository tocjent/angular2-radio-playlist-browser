import {Component, Inject, Input} from 'angular2/core';
import {Song} from './model/song';
import {Song as SongComponent} from './components/song/song';
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
  directives: [SongComponent],
  pipes: []
})
export class Angular2RadioPlaylistApp {
  songs: Observable<Song[]>[];
  searchParams = new SearchParams();
  searchParamsUpdates = new Subject<SearchParams>();

  constructor(songService: SongService) {
    const songFilter = (sp: SearchParams) => (song: Song) => {
      const validAttr = attrName => {
        const songAttr = song[attrName].toLowerCase();
        const paramAttr = sp[attrName].toLowerCase();
        return songAttr.indexOf(paramAttr) > -1;
      };
      return ["station", "author", "title"]
        .reduce((acc, el) => acc && validAttr(el), true);
    };
    
    this.songs = songService.currentlyPlaying().map(
      songsObservable => Observable.combineLatest<[SearchParams, Song[]]>(
        this.searchParamsUpdates,
        songsObservable
      ).map(
        ([searchParams, songs]) => songs.filter(songFilter(searchParams))
      ).distinctUntilChanged(
        (res1, res2) => res1.join() == res2.join()
      )
    );

    setTimeout(this.update.bind(this), 0);
  }

  update() {
    this.searchParamsUpdates.next(this.searchParams);
  }
}

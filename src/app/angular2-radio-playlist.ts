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
    
    var validSong = (sp: SearchParams) => (song: Song) => {
        if(song.station.toLowerCase().indexOf(sp.station.toLowerCase()) == -1) return false;
        if(song.author.toLowerCase().indexOf(sp.author.toLowerCase()) == -1) return false;
        if(song.title.toLowerCase().indexOf(sp.title.toLowerCase()) == -1) return false;
        return true;
    };

    Observable.combineLatest<[SearchParams, Song[]]>(
      this.searchParamsUpdates,
      songService.currentlyPlaying()
    ).subscribe(
      ([searchParams, songs]) => this.songs = songs.filter(validSong(searchParams))
    );

    this.update();
  }

  update() {
    this.searchParamsUpdates.next(this.searchParams);
  }
}

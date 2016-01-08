import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';
import {Song} from '../../model/song';
import {Observable} from 'rxjs/Observable';


@Injectable()
export class SongService {

  constructor(private http: Http) {}

  find(): Observable<Song[]> {
    return Observable.combineLatest(
      this.localFileSongs(),
      this.tubaPl(1),
      this.tubaPl(2),
      this.tubaPl(3),
      this.tubaPl(4),
      this.tubaPl(5),
      this.tubaPl(6),
      this.tubaPl(7),
      this.tubaPl(8),
      this.tubaPl(9),
      this.tubaPl(10)
    ).map(all => [].concat.apply([], all));
  }
  
  private localFileSongs() {
    return this.http.get('/data/songs.json')
      .map(res => res.json().songs.map(Song.fromObject))
      .catch(err => Observable.of([]));
  }
  
  private tubaPl(stationId: number) {
    return this.http.get('http://static.fm.tuba.pl/api3/onStation?id=' + stationId + '&limit=20')
      .map(res => res.json().map(
        r => new Song(
          r.artist_name,
          r.song_title
        )
      ))
      .catch(err => Observable.of([]));
  }
}

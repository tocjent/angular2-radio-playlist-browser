import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';
import {Song} from '../../model/song';
import 'rxjs/Rx';
import {Observable} from 'rxjs/Observable';


@Injectable()
export class SongService {

  constructor(private http: Http) {}

  find(): Observable<Song[]> {
    return this.http.get('/data/songs.json')
      .map(res => res.json().songs.map(Song.fromObject));
  }
}

import {Injectable} from 'angular2/core';
import {Http} from 'angular2/http';
import {Song} from '../../model/song';
import {Observable} from 'rxjs/Observable';
import {Json} from 'angular2/src/facade/lang';


@Injectable()
export class SongService {

  constructor(private http: Http) {}

  currentlyPlaying(): Observable<Song[]> {
    return Observable.combineLatest(
      this.localFileSongs(),
      this.tubaPl('Zlote przeboje', 9),
      this.tubaPl('Rock Radio', 8),
      this.tubaPl('Radio Blue FM', 3),
      this.tubaPl('Radio Tok FM', 10),
      this.eurozetPl('Radio ZET', 'radiozet'),
      this.eurozetPl('Radio ZET Chilli', 'zetchilli'),
      this.eurozetPl('Radio ZET Gold', 'zetgold'),
      this.eurozetPl('AntyRadio', 'antyradio'),
      this.eurozetPl('Planeta FM', 'planeta'),
      this.radioFaMa('Radio FaMa Kielce', 'kielce')
    ).map(all => [].concat.apply([], all));
  }
  
  private localFileSongs(): Observable<Song[]> {
    return this.http.get('/data/songs.json')
      .map(res => res.json().songs.slice(0, 1).map(Song.fromObject))
      .catch(this.logErrorAndReturnEmpty);
  }
  
  private tubaPl(stationName: string, stationId: number): Observable<Song[]> {
    return this.http.get('http://static.fm.tuba.pl/api3/onStation?id=' + stationId + '&limit=1')
      .map(res => res.json().slice(0, 1).map(
        r => new Song(
          stationName,
          r.artist_name,
          r.song_title
        )
      ))
      .catch(this.logErrorAndReturnEmpty);
  }
  
  private eurozetPl(stationName: string, stationId: string): Observable<Song[]> {
    return this.http.get('http://cors.io/?u=http://rds.eurozet.pl/reader/var/' + stationId + '.json')
      .map(res => {
        var firstParenPos = res.text().indexOf('(') + 1;
        var jsonText = res.text().slice(firstParenPos, -1);
        var json = <{now: {artist: string, title: string}}>Json.parse(jsonText);
        return [new Song(
          stationName,
          json.now.artist,
          json.now.title
        )];
      })
      .catch(this.logErrorAndReturnEmpty);
  }
  
  private radioFaMa(stationName: string, stationId: string): Observable<Song[]> {
    return this.http.get('http://cors.io/?u=http://radiofama.com.pl/rdsk/' + stationId + '.txt')
      .map(res => {
        var lines = res.text().split('<br />\n');
        var current = lines.filter(line => line.indexOf('gramy: ') === 0).slice(0, 1);
        return current.map(line => {
          var artistAndTitle = line.slice('gramy: '.length, -1).split('-');
          return new Song(
            stationName,
            artistAndTitle[0],
            artistAndTitle[1]
          );
        });
      })
      .catch(this.logErrorAndReturnEmpty);
  }
  
  private logErrorAndReturnEmpty(err) {
    console.log('err', err);
    return Observable.of([]);
  }
}

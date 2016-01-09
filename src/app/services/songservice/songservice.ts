import {Injectable} from 'angular2/core';
import {Http, Response} from 'angular2/http';
import {Song} from '../../model/song';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
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
      this.radioFaMa('Radio FaMa Kielce', 'kielce'),
      this.radioFaMa('Radio FaMa Tomaszów Mazowiecki', 'tomaszow'),
      this.radioFaMa('Radio FaMa Wolomin', 'wolomin'),
      this.radioFaMa('Radio FaMa Slupsk', 'slupsk')
    ).map(all => [].concat.apply([], all));
  }
  
  private localFileSongs(): Observable<Song[]> {
    return this.http.get('/data/songs.json')
      .map(res => res.json().songs.slice(0, 1).map(Song.fromObject))
      .catch(this.logErrorAndReturnEmpty);
  }
  
  private tubaPl(stationName: string, stationId: number): Observable<Song[]> {
    return this.repeatedGet('http://static.fm.tuba.pl/api3/onStation?id=' + stationId + '&limit=1', 20)
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
    return this.repeatedGet('http://cors.io/?u=http://rds.eurozet.pl/reader/var/' + stationId + '.json', 20)
      .map(res => {
        let firstParenPos = res.text().indexOf('(') + 1;
        let jsonText = res.text().slice(firstParenPos, -1);
        let json = <{now: {artist: string, title: string}}>Json.parse(jsonText);
        return [new Song(
          stationName,
          json.now.artist,
          json.now.title
        )];
      })
      .catch(this.logErrorAndReturnEmpty);
  }
  
  private radioFaMa(stationName: string, stationId: string): Observable<Song[]> {
    return this.repeatedGet('http://cors.io/?u=http://radiofama.com.pl/rdsk/' + stationId + '.txt', 20)
      .map(res => {
        let lines = res.text().split('<br />\n');
        let current = lines.filter(line => line.indexOf('gramy: ') === 0).slice(0, 1);
        return current.map(line => {
          let artistAndTitle = line.slice('gramy: '.length, -1).split('-');
          return new Song(
            stationName,
            artistAndTitle[0],
            artistAndTitle[1]
          );
        });
      })
      .catch(this.logErrorAndReturnEmpty);
  }
  
  private repeatedGet(url: string, intervalSeconds: number): Observable<Response> {
      let sub = new Subject();
      let getUrl = () => {
        this.http.get(url).subscribe(res => {
          sub.next(res);
          setTimeout(getUrl, intervalSeconds * 1000);
        });
      };
      getUrl();
      return sub;
  }
  
  private logErrorAndReturnEmpty(err) {
    console.log('err', err);
    return Observable.of([]);
  }
}

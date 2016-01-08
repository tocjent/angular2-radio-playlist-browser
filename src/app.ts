import {bootstrap} from 'angular2/platform/browser';
import {HTTP_BINDINGS} from 'angular2/http';
import {Angular2RadioPlaylistApp} from './app/angular2-radio-playlist';
import {SongService} from './app/services/songservice/songservice';
import 'rxjs/Rx';


bootstrap(Angular2RadioPlaylistApp, [
  HTTP_BINDINGS,
  SongService
]);

import {bootstrap} from 'angular2/platform/browser';
import {Angular2RadioPlaylistApp} from './app/angular2-radio-playlist';
import {SongService} from './app/services/songservice/songservice'


bootstrap(Angular2RadioPlaylistApp, [
  SongService
]);

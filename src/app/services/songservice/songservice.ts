import {Injectable} from 'angular2/core';
import {Song} from '../../model/song';


@Injectable()
export class SongService {

  constructor() {}

  find() {
    return [
      new Song('Akcent', 'Przekorny los'),
      new Song('Duo Night', 'Ekologiczna dziewczyna'),
      new Song('Medium', 'Każda laska')
    ];
  }
}

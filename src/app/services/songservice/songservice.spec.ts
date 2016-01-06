import {
  it,
  iit,
  describe,
  ddescribe,
  expect,
  inject,
  injectAsync,
  TestComponentBuilder,
  beforeEachProviders
} from 'angular2/testing';
import {provide} from 'angular2/core';
import {SongService} from './songservice';


describe('Songs Service', () => {

  beforeEachProviders(() => [SongService]);


  it('should return songs', inject([SongService], (service:SongService) => {

  }));

});

import {describe, it, expect, beforeEachProviders, inject} from 'angular2/testing';
import {Angular2RadioPlaylistApp} from '../app/angular2-radio-playlist';

beforeEachProviders(() => [Angular2RadioPlaylistApp]);

describe('App: Angular2RadioPlaylist', () => {
  it('should have the `defaultMeaning` as 42', inject([Angular2RadioPlaylistApp], (app) => {
    expect(app.defaultMeaning).toBe(42);
  }));

  describe('#meaningOfLife', () => {
    it('should get the meaning of life', inject([Angular2RadioPlaylistApp], (app) => {
      
    }));
  });
});

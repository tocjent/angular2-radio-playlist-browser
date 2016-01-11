System.register(['angular2/core', './components/song/song', './services/songservice/songservice', 'rxjs/Observable', 'rxjs/Subject'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, song_1, songservice_1, Observable_1, Subject_1;
    var SearchParams, Angular2RadioPlaylistApp;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (song_1_1) {
                song_1 = song_1_1;
            },
            function (songservice_1_1) {
                songservice_1 = songservice_1_1;
            },
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            },
            function (Subject_1_1) {
                Subject_1 = Subject_1_1;
            }],
        execute: function() {
            SearchParams = (function () {
                function SearchParams() {
                    this.station = '';
                    this.author = '';
                    this.title = '';
                }
                return SearchParams;
            })();
            Angular2RadioPlaylistApp = (function () {
                function Angular2RadioPlaylistApp(songService) {
                    var _this = this;
                    this.searchParams = new SearchParams();
                    this.searchParamsUpdates = new Subject_1.Subject();
                    var songFilter = function (sp) { return function (song) {
                        var validAttr = function (attrName) {
                            var songAttr = song[attrName].toLowerCase();
                            var paramAttr = sp[attrName].toLowerCase();
                            return songAttr.indexOf(paramAttr) > -1;
                        };
                        return ["station", "author", "title"]
                            .reduce(function (acc, el) { return acc && validAttr(el); }, true);
                    }; };
                    this.songs = songService.currentlyPlaying().map(function (songsObservable) { return Observable_1.Observable.combineLatest(_this.searchParamsUpdates, songsObservable).map(function (_a) {
                        var searchParams = _a[0], songs = _a[1];
                        return songs.filter(songFilter(searchParams));
                    }).distinctUntilChanged(function (res1, res2) { return res1.join() == res2.join(); }); });
                    setTimeout(this.update.bind(this), 0);
                }
                Angular2RadioPlaylistApp.prototype.update = function () {
                    this.searchParamsUpdates.next(this.searchParams);
                };
                Angular2RadioPlaylistApp = __decorate([
                    core_1.Component({
                        selector: 'angular2-radio-playlist-app',
                        providers: [],
                        templateUrl: 'app/angular2-radio-playlist.html',
                        directives: [song_1.Song],
                        pipes: []
                    }), 
                    __metadata('design:paramtypes', [songservice_1.SongService])
                ], Angular2RadioPlaylistApp);
                return Angular2RadioPlaylistApp;
            })();
            exports_1("Angular2RadioPlaylistApp", Angular2RadioPlaylistApp);
        }
    }
});
//# sourceMappingURL=../../../app/angular2-radio-playlist.js.map
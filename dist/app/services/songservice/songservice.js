System.register(['angular2/core', 'angular2/http', '../../model/song', 'rxjs/Observable', 'angular2/src/facade/lang'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, http_1, song_1, Observable_1, lang_1;
    var SongService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (song_1_1) {
                song_1 = song_1_1;
            },
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            },
            function (lang_1_1) {
                lang_1 = lang_1_1;
            }],
        execute: function() {
            SongService = (function () {
                function SongService(http) {
                    this.http = http;
                }
                SongService.prototype.currentlyPlaying = function () {
                    return [
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
                    ];
                };
                SongService.prototype.localFileSongs = function () {
                    return this.http.get('/data/songs.json')
                        .map(function (res) { return res.json().songs.slice(0, 1).map(song_1.Song.fromObject); })
                        .catch(this.logErrorAndReturnEmpty);
                };
                SongService.prototype.tubaPl = function (stationName, stationId) {
                    return this.repeatedGet('http://static.fm.tuba.pl/api3/onStation?id=' + stationId + '&limit=1', 10)
                        .map(function (res) { return res.json().slice(0, 1).map(function (r) { return new song_1.Song(stationName, r.artist_name, r.song_title); }); })
                        .catch(this.logErrorAndReturnEmpty);
                };
                SongService.prototype.eurozetPl = function (stationName, stationId) {
                    return this.repeatedGet('http://cors.io/?u=http://rds.eurozet.pl/reader/var/' + stationId + '.json', 10)
                        .map(function (res) {
                        var firstParenPos = res.text().indexOf('(') + 1;
                        var jsonText = res.text().slice(firstParenPos, -1);
                        var json = lang_1.Json.parse(jsonText);
                        return [new song_1.Song(stationName, json.now.artist, json.now.title)];
                    })
                        .catch(this.logErrorAndReturnEmpty);
                };
                SongService.prototype.radioFaMa = function (stationName, stationId) {
                    return this.repeatedGet('http://cors.io/?u=http://radiofama.com.pl/rdsk/' + stationId + '.txt', 10)
                        .map(function (res) {
                        var lines = res.text().split('<br />\n');
                        var current = lines.filter(function (line) { return line.indexOf('gramy: ') === 0; }).slice(0, 1);
                        return current.map(function (line) {
                            var artistAndTitle = line.slice('gramy: '.length).split('-');
                            return new song_1.Song(stationName, artistAndTitle[0], artistAndTitle[1]);
                        });
                    })
                        .catch(this.logErrorAndReturnEmpty);
                };
                SongService.prototype.repeatedGet = function (url, intervalSeconds) {
                    var _this = this;
                    return Observable_1.Observable
                        .interval(intervalSeconds * 1000)
                        .startWith(0)
                        .flatMap(function () { return _this.http.get(url); })
                        .distinctUntilChanged(function (res1, res2) { return res1.text() == res2.text(); });
                };
                SongService.prototype.logErrorAndReturnEmpty = function (err) {
                    console.log('err', err);
                    return Observable_1.Observable.of([]);
                };
                SongService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http])
                ], SongService);
                return SongService;
            })();
            exports_1("SongService", SongService);
        }
    }
});
//# sourceMappingURL=../../../../../app/services/songservice/songservice.js.map
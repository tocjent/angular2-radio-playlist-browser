System.register(['angular2/core', 'rxjs/Observable'], function(exports_1) {
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, Observable_1;
    var Song;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            }],
        execute: function() {
            Song = (function () {
                function Song() {
                    this.isFlipped = false;
                }
                Song.prototype.ngOnInit = function () {
                    var _this = this;
                    this.songObservable.subscribe(function (songs) {
                        _this.isFlipped = true;
                        setTimeout(function () {
                            _this.isFlipped = false;
                            _this.song = songs[0];
                        }, 300);
                    });
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', Observable_1.Observable)
                ], Song.prototype, "songObservable", void 0);
                Song = __decorate([
                    core_1.Component({
                        selector: 'radio-song',
                        templateUrl: 'app/components/song/song.html',
                        styleUrls: ['app/components/song/song.css'],
                        providers: [],
                        directives: [],
                        pipes: []
                    }), 
                    __metadata('design:paramtypes', [])
                ], Song);
                return Song;
            })();
            exports_1("Song", Song);
        }
    }
});
//# sourceMappingURL=../../../../../app/components/song/song.js.map
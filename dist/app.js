System.register(['angular2/platform/browser', 'angular2/http', './app/angular2-radio-playlist', './app/services/songservice/songservice', 'rxjs/Rx'], function(exports_1) {
    var browser_1, http_1, angular2_radio_playlist_1, songservice_1;
    return {
        setters:[
            function (browser_1_1) {
                browser_1 = browser_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (angular2_radio_playlist_1_1) {
                angular2_radio_playlist_1 = angular2_radio_playlist_1_1;
            },
            function (songservice_1_1) {
                songservice_1 = songservice_1_1;
            },
            function (_1) {}],
        execute: function() {
            browser_1.bootstrap(angular2_radio_playlist_1.Angular2RadioPlaylistApp, [
                http_1.HTTP_PROVIDERS,
                songservice_1.SongService
            ]);
        }
    }
});
//# sourceMappingURL=../../app.js.map
System.register(['../node_modules/angular2/testing', '../app/angular2-radio-playlist'], function(exports_1) {
    var testing_1, angular2_radio_playlist_1;
    return {
        setters:[
            function (testing_1_1) {
                testing_1 = testing_1_1;
            },
            function (angular2_radio_playlist_1_1) {
                angular2_radio_playlist_1 = angular2_radio_playlist_1_1;
            }],
        execute: function() {
            testing_1.beforeEachProviders(function () { return [angular2_radio_playlist_1.Angular2RadioPlaylistApp]; });
            testing_1.describe('App: Angular2RadioPlaylist', function () {
                testing_1.describe('#meaningOfLife', function () {
                    testing_1.it('should get the meaning of life', testing_1.inject([angular2_radio_playlist_1.Angular2RadioPlaylistApp], function (app) {
                    }));
                });
            });
        }
    }
});
//# sourceMappingURL=../../../app/angular2-radio-playlist.spec.js.map
System.register(['angular2/testing', './song'], function(exports_1) {
    var testing_1, song_1;
    return {
        setters:[
            function (testing_1_1) {
                testing_1 = testing_1_1;
            },
            function (song_1_1) {
                song_1 = song_1_1;
            }],
        execute: function() {
            testing_1.describe('Song Component', function () {
                testing_1.beforeEachProviders(function () { return []; });
                testing_1.it('should ...', testing_1.injectAsync([testing_1.TestComponentBuilder], function (tcb) {
                    return tcb.createAsync(song_1.Song).then(function (fixture) {
                        fixture.detectChanges();
                    });
                }));
            });
        }
    }
});
//# sourceMappingURL=../../../../../app/components/song/song.spec.js.map
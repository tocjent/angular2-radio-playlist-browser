System.register(['angular2/testing', './songservice'], function(exports_1) {
    var testing_1, songservice_1;
    return {
        setters:[
            function (testing_1_1) {
                testing_1 = testing_1_1;
            },
            function (songservice_1_1) {
                songservice_1 = songservice_1_1;
            }],
        execute: function() {
            testing_1.describe('Songs Service', function () {
                testing_1.beforeEachProviders(function () { return [songservice_1.SongService]; });
                testing_1.it('should return songs', testing_1.inject([songservice_1.SongService], function (service) {
                }));
            });
        }
    }
});
//# sourceMappingURL=../../../../../app/services/songservice/songservice.spec.js.map
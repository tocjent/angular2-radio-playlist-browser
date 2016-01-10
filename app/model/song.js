System.register([], function(exports_1) {
    var Song;
    return {
        setters:[],
        execute: function() {
            Song = (function () {
                function Song(station, author, title) {
                    this.station = station;
                    this.author = author;
                    this.title = title;
                    this.station = this.station || "";
                    this.author = this.author || "";
                    this.title = this.title || "";
                }
                Song.prototype.toString = function () {
                    return this.author + ' - ' + this.title;
                };
                Song.fromObject = function (o) {
                    return new Song(o.station, o.author, o.title);
                };
                return Song;
            })();
            exports_1("Song", Song);
        }
    }
});
//# sourceMappingURL=../../../../app/model/song.js.map
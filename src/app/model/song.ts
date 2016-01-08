export class Song {
  constructor(
    public station: string,
    public author: string,
    public title: string
  ) {
      this.station = this.station || "";
      this.author = this.author || "";
      this.title = this.title || "";
  }

  toString() {
    return this.author + ' - ' + this.title;
  }

  static fromObject(o) {
    return new Song(o.station, o.author, o.title);
  }
}

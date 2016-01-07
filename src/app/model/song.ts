export class Song {
  constructor(
    public author: string,
    public title: string
  ) {}

  toString() {
    return this.author + ' - ' + this.title;
  }

  static fromObject(o) {
    return new Song(o.author, o.title);
  }
}

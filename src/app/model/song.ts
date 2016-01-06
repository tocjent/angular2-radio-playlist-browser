export class Song {
  constructor(
    public author: string,
    public title: string
  ) {}

  toString() {
    return this.author + ' - ' + this.title;
  }
}

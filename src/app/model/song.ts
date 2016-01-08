export class Song {
  constructor(
    public author: string,
    public title: string
  ) {
      this.author = this.author || "";
      this.title = this.title || "";
  }

  toString() {
    return this.author + ' - ' + this.title;
  }

  static fromObject(o) {
    return new Song(o.author, o.title);
  }
}

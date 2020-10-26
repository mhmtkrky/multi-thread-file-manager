export class PartionFile {
  fileName = "";
  fileSize = 0;
  numberOfThread = 0;
  currenctPosition = 0;
  EOF = () => this.currenctPosition > this.fileSize;
  incrementThreadSize = () => this.numberOfThread++;
  decrementThreadSize = () => this.numberOfThread--;
  incrementPosition = (bufferSize) => (this.currenctPosition += bufferSize);
  constructor(fileName, fileSize) {
    this.fileName = fileName;
    this.currenctPosition = 0;
    this.fileSize = fileSize;
  }
  static getPartionFile(file, fileName, fileSize) {
    return file !== undefined && file !== null
      ? file
      : new PartionFile(fileName, fileSize);
  }
}

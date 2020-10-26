const controlledFiles = [];
const zippedFiles = [];
const zipFiles = [];
const workingFiles = {};

export class FileManager {
  static get controlledFiles() {
    return controlledFiles;
  }
  static get zippedFiles() {
    return zippedFiles;
  }
  static get zipFiles() {
    return zipFiles;
  }
  static get workingFiles() {
    return workingFiles;
  }

  static getZipFileName(outputFilePath, parentName) {
    let sameZipFiles = zipFiles.filter((x) => x.indexOf(parentName) !== -1);
    let max = sameZipFiles.length;
    zipFiles.push(parentName + "_" + max + ".zip");
    return outputFilePath + "/" + parentName + "_" + max + ".zip"
  }
}

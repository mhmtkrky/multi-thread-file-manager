import JSZip from 'jszip';
import fs from 'fs';


export class ZipManager {
  config = null;
  fileManager = null;
  constructor(config, fileManager) {
    this.config = config;
    this.fileManager = fileManager;
  }
  createZipFile(parentName, fileNames) {
    var zip = new JSZip();

    var folder = zip.folder();
    fileNames.forEach((element) => {
      let buffer = fs.readFileSync(this.config.outputFilePath + "/" + element);
      folder.file(element, buffer, { base64: true });
      this.fileManager.zippedFiles.push(element);
      fs.unlink(this.config.outputFilePath + "/" + element, () => console.log);
    });
    let zipFileName = this.fileManager.getZipFileName(
      this.config.outputFilePath,
      parentName
    );

    zip.generateAsync({ type: "nodebuffer" }).then(function (content) {
      fs.writeFile(zipFileName, content, function (err) {
        if (err) return console.log(err);
      });
    });
  }
}

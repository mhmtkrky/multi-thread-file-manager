import * as fs from "fs";
import { FileManager } from "../api/file-manager.js";
import { ZipManager } from "../api/zip-manager.js";

export class OutputFolderListener {
  zipManager = null;
  config = null;
  constructor(config) {
    this.config = config;
    this.zipManager = new ZipManager(this.config, FileManager);
    fs.watch(this.config.outputFilePath, (eventType, filename) => {
      var fileCount = 0;
      fs.readdir(this.config.outputFilePath, (err, files) => {
        if (err) throw err;
        files = files.filter(
          (x) =>
            x.indexOf(".zip") === -1 &&
            FileManager.zippedFiles.indexOf(x) === -1
        );
        fileCount = files.length;

        let uniqueFiles = [
          ...new Set(files.map((x) => x.slice(0, x.lastIndexOf("_")))),
        ];
        console.log(uniqueFiles);
        for (let i = 0; i < uniqueFiles.length; i++) {
          let ended = false;
          let relatedFiles = files.filter(
            (x) => x.indexOf(uniqueFiles[i]) !== -1
          );
          // console.log(relatedFiles);
          for (let j = 0; relatedFiles.length > 0 && !ended; j++) {
            if (relatedFiles.length < config.zipFilesCount) {
              ended = true;
              break;
            }
            this.zipManager.createZipFile(
              uniqueFiles[i],
              relatedFiles.splice(0, config.zipFilesCount)
            );
          }
        }
      });
    });
  }
}

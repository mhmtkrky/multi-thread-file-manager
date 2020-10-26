import * as fs from "fs";
import { FileManager } from "../api/file-manager.js";
import { PartionFile } from "../api/partion-file.js";

export class InputFolderListener {
  config = null;
  constructor(config) {
    this.config = config;
    fs.watch(this.config.inputFilePath, (eventType, filename) =>
      this.watchInputFolderChanges()
    );
  }
  watchInputFolderChanges() {
    fs.readdir(this.config.inputFilePath, (err, files) => {
      if (err) throw err;

      let uncontrolledFiles = files.filter(
        (x) => FileManager.controlledFiles.indexOf(x) === -1
      );
      if (uncontrolledFiles.length >= this.config.startTransactionNumber()) {
        for (let i = 0; i < this.config.maxTransactionSize; i++) {
          FileManager.controlledFiles.push(uncontrolledFiles[i]);
          this.readFileFromInputFileFolder(uncontrolledFiles[i]);
        }
      }
    });
  }

  readFileFromInputFileFolder(fileName) {
    fs.stat(this.config.inputFilePath + "/" + fileName, (err, stats) => {
      const fileSize = stats.size;
      fs.open(
        this.config.inputFilePath + "/" + fileName,
        "r",
        (errOpen, fd) => {
          this.readAndControl(fd, fileSize, fileName);
        }
      );
    });
  }

  readAndControl(fd, fileSize, fileName) {
    FileManager.workingFiles[fileName] = PartionFile.getPartionFile(
      FileManager.workingFiles[fileName],
      fileName,
      fileSize
    );

    while (
      FileManager.workingFiles[fileName].numberOfThread <
      this.config.currentTransactionSize &&
      !FileManager.workingFiles[fileName].EOF()
    ) {
      FileManager.workingFiles[fileName].incrementThreadSize();

      fs.read(
        fd,
        Buffer.alloc(this.config.bufferSize),
        0,
        this.config.bufferSize,
        FileManager.workingFiles[fileName].currenctPosition,
        (errRead, bufferSize, buffer) => {
          this.createNewFile(
            fd,
            fileSize,
            buffer,
            fileName,
            FileManager.workingFiles[fileName].currenctPosition / bufferSize
          );
          FileManager.workingFiles[fileName].incrementPosition(bufferSize);
        }
      );
    }
  }

  createNewFile(fd, fileSize, buffer, fileName, position) {
    let str = fileName.slice(0, fileName.lastIndexOf(".")) + "_" + position;
    fs.writeFile(this.config.outputFilePath + "/" + str, buffer, (err) => {
      if (err) return console.log(err);
      FileManager.workingFiles[fileName].decrementThreadSize();
      this.readAndControl(fd, fileSize, fileName);
    });
  }
}

export class Config {
  bufferSize = 2048 * 1024;
  port = 3001;
  inputFilePath = "./input_file";
  outputFilePath = "./output_file";
  maxTransactionSize = 3;
  currentTransactionSize = 4;
  zipFilesCount = 5;
  startTransactionNumber = () => this.currentTransactionSize * 1;

  constructor(
    port = 3001,
    bufferSize = 2048 * 1024,
    inputFilePath = "./input_file",
    outputFilePath = "./output_file",
    maxTransactionSize = 3,
    currentTransactionSize = 4,
    zipFilesCount = 5
  ) {
    this.port = port;
    this.bufferSize = bufferSize;
    this.inputFilePath = inputFilePath;
    this.outputFilePath = outputFilePath;
    this.maxTransactionSize = maxTransactionSize;
    this.currentTransactionSize =
      currentTransactionSize >= 4 ? currentTransactionSize : 4;
    this.zipFilesCount = zipFilesCount;
  }
};

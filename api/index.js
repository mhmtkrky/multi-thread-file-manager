import { Config } from '../api/config.js';
import { HttpController } from '../api/http-controller.js';
import { InputFolderListener } from './input-folder-listener.js';
import { OutputFolderListener } from './output-folder-listener.js';


const config = new Config();

const inputFolderListener = new InputFolderListener(config);
const outputFolderListener = new OutputFolderListener(config);
const httpController = new HttpController(config);

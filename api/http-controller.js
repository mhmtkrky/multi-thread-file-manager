import express from 'express';
import cors from 'cors';
import multer from 'multer';

const app = express();
app.use(cors());

export class HttpController {
  constructor(config) {

    var storage = multer.diskStorage({
      destination: function (req, file, cb) {
        cb(null, './input_file')
      },
      filename: function (req, file, cb) {
        cb(null, file.originalname)
      }
    });

    var upload = multer({ storage: storage }).single('file');

    app.post('/add', function (req, res) {
      upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
          return res.status(500).json(err)
        } else if (err) {
          return res.status(500).json(err)
        }
        if (req.file.mimetype === "video/mp4") {
          return res.status(200).send(req.file)
        }
        return res.status(500).json("Farklı dosya turu");
      })
    });

    app.listen(config.port, function () { console.log('App running on port ' + config.port); });
  }
}

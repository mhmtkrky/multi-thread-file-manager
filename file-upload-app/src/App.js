import './App.css';
import axios from 'axios';
import React, { Component } from 'react';
class App extends Component {

  state = {
    selectedFile: null,
    uploadDis: true,
    fileChoseDis: false
  };

  onFileChange = event => {
    this.state.uploadDis = false;
    if (event?.target?.files[0]?.type === "video/mp4") {
      console.log("Basari ile yuklendi.");
      this.setState(
        {
          selectedFile: event.target.files[0],
          fileChoseDis: true,
          uploadDis: false
        }
      );
    }
    else {
      this.setState(
        {
          selectedFile: null,
          fileChoseDis: false,
          uploadDis: true
        }
      );
    }
  };
  onFileUpload = () => {
    if (this.state.selectedFile != null && this.state.selectedFile.type === "video/mp4") {
      const formData = new FormData();
      formData.append(
        "file",
        this.state.selectedFile,
        this.state.selectedFile.name
      );

      axios.post("http://localhost:3001/add", formData, {
      })
        .then(res => {
          console.log("Status Kodu : " + res.statusText);
          this.setState(
            {
              selectedFile: null,
              fileChoseDis: false,
              uploadDis: true
            }
          );
        })
    }
  }
  fileData = () => {

    if (this.state.selectedFile) {

      return (
        <div>
          <h2>File Details:</h2>
          <p>File Name: {this.state.selectedFile.name}</p>
          <p>File Type: {this.state.selectedFile.type}</p>
          <p>
            Last Modified:{" "}
            {this.state.selectedFile.lastModifiedDate.toDateString()}
          </p>
        </div>
      );
    } else {
      return (
        <div>
          <br />
          <h4>Choose before Pressing the Upload button</h4>
        </div>
      );
    }
  };

  render() {
    return (
      <div>
        <h1>
          File Manager
          </h1>
        <h3>
          File Upload!
          </h3>
        <div>
          <input disabled={this.state.fileChoseDis} type="file" onChange={this.onFileChange} />
          <button disabled={this.state.uploadDis} onClick={this.onFileUpload}>
            Yükle!
              </button>

        </div>
        {this.fileData()}
      </div>
    );
  }
}

export default App; 

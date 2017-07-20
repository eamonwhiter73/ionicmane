import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';
import { Crop } from '@ionic-native/crop';
import { File } from '@ionic-native/file';
import { Http } from '@angular/http';
import { Transfer, TransferObject } from '@ionic-native/transfer';
import firebase from 'firebase';
import { AngularFireDatabaseModule, AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';



@Injectable()
export class CameraService {
  username: string;
  items: FirebaseListObservable<any>;
  
  constructor(public transfer: Transfer, public http: Http, public platform: Platform, public camera: Camera, public crop: Crop, public file: File, af: AngularFireDatabaseModule) {
    this.http = http;
    this.username = "jackson";
  }

  getFileEntryRead(fileURI, square) {

    let fileName = fileURI.substring(fileURI.lastIndexOf("/") + 1, fileURI.length);
    let filePath = fileURI.substring(8, fileURI.lastIndexOf("/"));

    this.file.listDir('file:///',
      filePath).then(
        (files) => {
          console.log(fileName);
          
          for(let i = 0; i < files.length; i++) {
            if(files[i]['name'] == fileName) {
              this.readFile(files[i], square);
            }
          }
        }
      ).catch(
        (err) => {
          console.log(JSON.stringify(err));
        }
      );
  }

  readFile(fileEntry, square) {
    console.log('in readfile')
    let self = this;

    fileEntry.file(function (file) {
      //var reader = new FileReader();
      var reader = new FileReader();

      reader.onload = (e) => {
        var dataURL = reader.result;

        let image       : string  = 'profile_' + self.username + '_' + square + '.jpg',
          storageRef  : any,
          parseUpload : any;

        return new Promise((resolve, reject) => {
          storageRef       = firebase.storage().ref('/profile/' + self.username + '/' + image);
          parseUpload      = storageRef.putString(dataURL, 'data_url');

          parseUpload.on('state_changed', (_snapshot) => {
              // We could log the progress here IF necessary
              console.log('snapshot progess ' + _snapshot);
            },
            (_err) => {
               reject(_err);
               console.log(_err);
            },
            (success) => {
               resolve(parseUpload.snapshot); 
            })
          }).then(value => {
            //this.af.list('/profile/' + self.username).push({ pic: image });
          }).catch(function(error) {
            console.log(error.message);
          });

        //console.log(dataURL);
        //this.uploadImage(dataURL);
        //console.log(dataURL + ": in reader");

        /*var url = "http://192.168.1.131:8888/maneappback/storeimagetool.php";
        var targetPath = dataURL;
        var filename = 'file.jpg';
        var options = {
          fileKey: "file",
          fileName: filename,
          chunkedMode: false,
          mimeType: "multipart/form-data",
          params : {
            "base": targetPath
          }
        };
        
        const fileTransfer: TransferObject = self.transfer.create();
        fileTransfer.upload(targetPath, url, options).then(data => {
          console.log(JSON.stringify(data['response']));
        }, err => {
          console.log(JSON.stringify(err));
        });*/
      }

      reader.readAsDataURL(file);
    });
  };

  

  // Return a promise to catch errors while loading image
  getMedia(options, square): Promise<any> {
    // Get Image from ionic-native's built in camera plugin
    return this.camera.getPicture(options)
      .then((fileUri) => {
        // op Image, on android this returns something like, '/storage/emulated/0/Android/...'
        // Only giving an android example as ionic-native camera has built in cropping ability
        if (this.platform.is('ios')) {
          return this.crop.crop(fileUri, { quality: 75 });
        } else if (this.platform.is('android')) {
          // Modify fileUri format, may not always be necessary
          fileUri = 'file://' + fileUri;

          /* Using cordova-plugin-crop starts here */
          return this.crop.crop(fileUri, { quality: 75 });
        }
      })
      .then(newPath => {
        this.getFileEntryRead(newPath, square);
        return newPath;
      });
  }
  
}   
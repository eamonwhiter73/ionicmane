import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';
import { Crop } from '@ionic-native/crop';
import { File } from '@ionic-native/file';
import { Http } from '@angular/http';
import { Transfer, TransferObject } from '@ionic-native/transfer';
import firebase from 'firebase';
import { AngularFireDatabaseModule, AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';
//import { Ng2ImgMaxService } from 'ng2-img-max';
//import { Ng2ImgToolsModule } from 'ng2-img-tools'; // <-- import the module
import { Storage } from '@ionic/storage';

@Injectable()
export class CameraService {
  username: string;
  items: FirebaseListObservable<any>;
  
  constructor(public storage: Storage, public transfer: Transfer, public http: Http, public platform: Platform, public camera: Camera, public crop: Crop, public file: File, af: AngularFireDatabaseModule) {
    this.http = http;
    this.storage.get('username').then((val) => {this.username = val; console.log(val + "        getting username")});
    //console.log(JSON.stringify(compress));
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

  dataURItoBlob(dataURI, callback): Promise<any> {
    return new Promise((resolve, reject) => {
      let byteString = atob(dataURI);
      //console.log(byteString);

      // separate out the mime component
      //let mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]

      // write the bytes of the string to an ArrayBuffer
      let ab = new ArrayBuffer(byteString.length);
      let ia = new Uint8Array(ab);
      for (let i = 0; i < byteString.length; i++) {
          ia[i] = byteString.charCodeAt(i);
      }

      // write the ArrayBuffer to a blob, and you're done
      let bb = new Blob([ab], {type: 'image/jpeg'});
      resolve(bb);  

    })
    // convert base64 to raw binary data held in a string
    // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
    
  }

  readFile(fileEntry, square) {
    console.log('in readfile')
    let self = this;
    let compressed;

    fileEntry.file(function (file) {

      var reader = new FileReader();

      reader.onload = (e) => {
        var dataURL = reader.result;

        let image       : string  = 'profile_' + self.username + '_' + square + '.png',
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
               console.log(_err.messsage);
            },
            (success) => {
               resolve(parseUpload.snapshot); 
            })
          }).then(value => {
            //this.af.list('/profile/' + self.username).push({ pic: image });
          }).catch(function(error) {
            console.log(error.message);
          });
      }

      reader.readAsDataURL(file);


    });

      
      

      
      

      //self.ng2ImgToolsService.compress([file], 1, false, false).subscribe(result => {

        //console.log(result + "this is result");
        
        /*var reader = new FileReader();

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
                 console.log(_err.messsage);
              },
              (success) => {
                 resolve(parseUpload.snapshot); 
              })
            }).then(value => {
              //this.af.list('/profile/' + self.username).push({ pic: image });
            }).catch(function(error) {
              console.log(error.message);
            });
        }

        reader.readAsDataURL(file);*/
      /*}, error => {
          //something went wrong 
          console.log(JSON.stringify(error));
          //use result.compressedFile or handle specific error cases individually
      });*/

      /*console.log(JSON.stringify(file));

      console.log(file.name + 'filename');

      var readerFirst = new FileReader();

      readerFirst.onload = (e) => {
        let data = readerFirst.result;

        console.log(file.name + "filename in readerfirst");

        // Construct a file
        //var newFile = this.file.writeFile(this.file.tempDirectory, file.name, strImage, true);

        /**/

        //let f = new File([""], file.name, {type:"image/jpeg", lastModifiedDate: file.lastModifiedDate});
    
    //readerFirst.readAsDataURL(file);
      
  };

  // Return a promise to catch errors while loading image
  getMedia(options, square): Promise<any> {

    // Get Image from ionic-native's built in camera plugin
    return this.camera.getPicture(options)
      .then((fileUri) => {
        
        // op Image, on android this returns something like, '/storage/emulated/0/Android/...'
        // Only giving an android example as ionic-native camera has built in cropping ability
        if (this.platform.is('ios')) {

          return this.crop.crop(fileUri, { quality: 10 });
        } else if (this.platform.is('android')) {
          // Modify fileUri format, may not always be necessary
          fileUri = 'file://' + fileUri;

          /* Using cordova-plugin-crop starts here */
          return this.crop.crop(fileUri, { quality: 10 });
        }
      })
      .then(newPath => {
        console.log(newPath);
        if(newPath) {
        let fileName = newPath.substring(newPath.lastIndexOf("/") + 1, newPath.length);
        let filePath = newPath.substring(0, newPath.lastIndexOf("/"));
        this.file.readAsDataURL(filePath, fileName).then(data =>{
          //let strImage = data.replace(/^data:image\/[a-z]+;base64,/, "");
          //this.file.writeFile(this.file.tempDirectory, "image.jpg", strImage);
          //let blob = dataURItoBlob(data);

          //let file

          //this.getFileEntryRead(this.file.tempDirectory + '/image.jpg', square);
          var dataURL = data;

          let image       : string  = 'profile_' + this.username + '_' + square + '.png',
            storageRef  : any,
            parseUpload : any;

          return new Promise((resolve, reject) => {
            storageRef       = firebase.storage().ref('/profile/' + this.username + '/' + image);
            parseUpload      = storageRef.putString(dataURL, 'data_url');

            parseUpload.on('state_changed', (_snapshot) => {
                // We could log the progress here IF necessary
                console.log('snapshot progess ' + _snapshot);
              },
              (_err) => {
                 reject(_err);
                 console.log(_err.messsage);
              },
              (success) => {
                 resolve(parseUpload.snapshot); 
              })
            }).then(value => {
              //this.af.list('/profile/' + self.username).push({ pic: image });
            }).catch(function(error) {
              console.log(error.message);
            });

          
        })
        }
      });

      
  }

  // Return a promise to catch errors while loading image
  getMediaFormulas(options, square): Promise<any> {

    // Get Image from ionic-native's built in camera plugin
    return this.camera.getPicture(options)
      .then((fileUri) => {
        
        // op Image, on android this returns something like, '/storage/emulated/0/Android/...'
        // Only giving an android example as ionic-native camera has built in cropping ability
        if (this.platform.is('ios')) {

          return this.crop.crop(fileUri, { quality: 10 });
        } else if (this.platform.is('android')) {
          // Modify fileUri format, may not always be necessary
          fileUri = 'file://' + fileUri;

          /* Using cordova-plugin-crop starts here */
          return this.crop.crop(fileUri, { quality: 10 });
        }
      })
      .then(newPath => {
        console.log(newPath);
        if(newPath) {
        let fileName = newPath.substring(newPath.lastIndexOf("/") + 1, newPath.length);
        let filePath = newPath.substring(0, newPath.lastIndexOf("/"));
        this.file.readAsDataURL(filePath, fileName).then(data =>{
          //let strImage = data.replace(/^data:image\/[a-z]+;base64,/, "");
          //this.file.writeFile(this.file.tempDirectory, "image.jpg", strImage);
          //let blob = dataURItoBlob(data);

          //let file

          //this.getFileEntryRead(this.file.tempDirectory + '/image.jpg', square);
          var dataURL = data;

          let image       : string  = 'formula_' + this.username + '_' + new Date() + '.png',
            storageRef  : any,
            parseUpload : any;

          return new Promise((resolve, reject) => {
            storageRef       = firebase.storage().ref('/formulas/' + this.username + '/' + image);
            parseUpload      = storageRef.putString(dataURL, 'data_url');

            parseUpload.on('state_changed', (_snapshot) => {
                // We could log the progress here IF necessary
                console.log('snapshot progess ' + _snapshot);
              },
              (_err) => {
                 reject(_err);
                 console.log(_err.messsage);
              },
              (success) => {
                storageRef.getDownloadURL().then(url => {
                  console.log(url);
                  resolve(url); 
                });
              })
            }).catch(function(error) {
              console.log(error.message);
            });

          
        })
        }
        
        /*let source_img = new Image(300, 300);

        source_img.src = newPath;
        //(NOTE: see the examples/js/demo.js file to understand how this object could be a local image 
        //from your filesystem using the File API)

        //An Integer from 0 to 100
        let quality =  50,
        // output file format (jpg || png)
        output_format = 'jpg', 
        //This function returns an Image Object 
        snuffle = new Image(300, 300);
        console.log(JSON.stringify(jic));*/
        //snuffle.src = jic.compress(source_img,quality,output_format).src;

        //console.log(snuffle.src);

        //this.getFileEntryRead(newPath, square);
        //return newPath;
      });

      
  }

  //mAKE ANOTHER FUNCTION that
  
}   
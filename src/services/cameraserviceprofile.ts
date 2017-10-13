import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';
import { Crop } from '@ionic-native/crop';
import { File } from '@ionic-native/file';
import { Http } from '@angular/http';
import { Transfer } from '@ionic-native/transfer';
import firebase from 'firebase';
//import { Ng2ImgMaxService } from 'ng2-img-max';
//import { Ng2ImgToolsModule } from 'ng2-img-tools'; // <-- import the module
import CanvasCompress from 'canvas-compress';
import { Storage } from '@ionic/storage';


@Injectable()
export class CameraServiceProfile {
  username: string;  
  dataURL;
  constructor(public storage: Storage, public transfer: Transfer, public http: Http, public platform: Platform, public camera: Camera, public crop: Crop, public file: File) {
    this.http = http;
    
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
  getMedia(options, square, username): Promise<any> {
    //this.storage.get('username').then((val) => {this.username = val; console.log(this.username + "        getting usern34433245555555ame")});

    // Get Image from ionic-native's built in camera plugin
    return this.camera.getPicture(options)
      .then((fileUri) => {
        
        // op Image, on android this returns something like, '/storage/emulated/0/Android/...'
        // Only giving an android example as ionic-native camera has built in cropping ability
        if (this.platform.is('ios')) {

          return this.crop.crop(fileUri, { quality: 2 });
        } else if (this.platform.is('android')) {
          // Modify fileUri format, may not always be necessary
          fileUri = 'file://' + fileUri;

          /* Using cordova-plugin-crop starts here */
          return this.crop.crop(fileUri, { quality: 2 });
        }
      })
      .then(newPath => {
        console.log(newPath);
        if(newPath) {
          let fileName = newPath.substring(newPath.lastIndexOf("/") + 1, newPath.length);
          let filePath = newPath.substring(0, newPath.lastIndexOf("/"));
          this.file.readAsDataURL(filePath, fileName).then(data => {
            //let strImage = data.replace(/^data:image\/[a-z]+;base64,/, "");
            //this.file.writeFile(this.file.tempDirectory, "image.jpg", strImage);
            //let blob = dataURItoBlob(data);
            var dataURL = data;

            console.log(username + "    this is passed usernameeeeeeeeee    ==");

              let image       : string  = 'profilepicture.png',
              storageRef  : any,
              parseUpload : any;

              return new Promise((resolve, reject) => {
                storageRef       = firebase.storage().ref('/settings/' + username + '/' + image);
                parseUpload      = storageRef.putString(dataURL, 'data_url');

                console.log(username + "     username in promise  !!!!!!");

                console.log("got to storageref after");
                parseUpload.on('state_changed', (_snapshot) => {
                    // We could log the progress here IF necessary
                    console.log('snapshot progess ' + _snapshot);
                    for(let r in _snapshot) {
                      console.log(r + '           snapshot 6666665555555');
                    }
                  },
                  (_err) => {
                     reject(_err);
                     console.log(_err.messsage);
                  },
                  (success) => {
                    console.log(' was     a      suc    cesssssss');
                     resolve(parseUpload.snapshot); 
                  })
                }).then(value => {
                  //this.af.list('/profile/' + self.username).push({ pic: image });
                }).catch(function(error) {
                  console.log(error.message);
                });
            
            //let file
           });
          }
        });
 
  }

}   
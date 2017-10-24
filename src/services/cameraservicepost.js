var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Camera } from '@ionic-native/camera';
import { Crop } from '@ionic-native/crop';
import { File } from '@ionic-native/file';
import { Http } from '@angular/http';
import { Storage } from '@ionic/storage';
import { Transfer } from '@ionic-native/transfer';
import firebase from 'firebase';
var CameraServicePost = /** @class */ (function () {
    function CameraServicePost(storage, transfer, http, platform, camera, crop, file) {
        var _this = this;
        this.storage = storage;
        this.transfer = transfer;
        this.http = http;
        this.platform = platform;
        this.camera = camera;
        this.crop = crop;
        this.file = file;
        this.http = http;
        this.storage.get('username').then(function (val) { _this.username = val; console.log(val + "        getting username"); });
        //console.log(JSON.stringify(compress));
    }
    CameraServicePost.prototype.getFileEntryRead = function (fileURI, square) {
        var _this = this;
        var fileName = fileURI.substring(fileURI.lastIndexOf("/") + 1, fileURI.length);
        var filePath = fileURI.substring(8, fileURI.lastIndexOf("/"));
        this.file.listDir('file:///', filePath).then(function (files) {
            console.log(fileName);
            for (var i = 0; i < files.length; i++) {
                if (files[i]['name'] == fileName) {
                    _this.readFile(files[i], square);
                }
            }
        }).catch(function (err) {
            console.log(JSON.stringify(err));
        });
    };
    CameraServicePost.prototype.dataURItoBlob = function (dataURI, callback) {
        return new Promise(function (resolve, reject) {
            var byteString = atob(dataURI);
            //console.log(byteString);
            // separate out the mime component
            //let mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]
            // write the bytes of the string to an ArrayBuffer
            var ab = new ArrayBuffer(byteString.length);
            var ia = new Uint8Array(ab);
            for (var i = 0; i < byteString.length; i++) {
                ia[i] = byteString.charCodeAt(i);
            }
            // write the ArrayBuffer to a blob, and you're done
            var bb = new Blob([ab], { type: 'image/jpeg' });
            resolve(bb);
        });
        // convert base64 to raw binary data held in a string
        // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
    };
    CameraServicePost.prototype.readFile = function (fileEntry, square) {
        console.log('in readfile');
        var self = this;
        fileEntry.file(function (file) {
            var reader = new FileReader();
            reader.onload = function (e) {
                var dataURL = reader.result;
                var image = 'profile_' + self.username + '_' + square + '.png', storageRef, parseUpload;
                return new Promise(function (resolve, reject) {
                    storageRef = firebase.storage().ref('/profile/' + self.username + '/' + image);
                    parseUpload = storageRef.putString(dataURL, 'data_url');
                    parseUpload.on('state_changed', function (_snapshot) {
                        // We could log the progress here IF necessary
                        console.log('snapshot progess ' + _snapshot);
                    }, function (_err) {
                        reject(_err);
                        console.log(_err.messsage);
                    }, function (success) {
                        resolve(parseUpload.snapshot);
                    });
                }).then(function (value) {
                    //this.af.list('/profile/' + self.username).push({ pic: image });
                }).catch(function (error) {
                    console.log(error.message);
                });
            };
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
    ;
    // Return a promise to catch errors while loading image
    CameraServicePost.prototype.getMedia = function (options) {
        var _this = this;
        // Get Image from ionic-native's built in camera plugin
        return this.camera.getPicture(options)
            .then(function (fileUri) {
            // op Image, on android this returns something like, '/storage/emulated/0/Android/...'
            // Only giving an android example as ionic-native camera has built in cropping ability
            if (_this.platform.is('ios')) {
                return _this.crop.crop(fileUri, { quality: 2 });
            }
            else if (_this.platform.is('android')) {
                // Modify fileUri format, may not always be necessary
                fileUri = 'file://' + fileUri;
                /* Using cordova-plugin-crop starts here */
                return _this.crop.crop(fileUri, { quality: 2 });
            }
        })
            .then(function (newPath) {
            return new Promise(function (resolve, reject) {
                var fileName = newPath.substring(newPath.lastIndexOf("/") + 1, newPath.length);
                var filePath = newPath.substring(0, newPath.lastIndexOf("/"));
                _this.file.readAsDataURL(filePath, fileName).then(function (data) {
                    console.log("readasdataurl                " + data);
                    resolve(data);
                });
            });
        }).catch(function (e) {
            console.log(e);
        });
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
    };
    CameraServicePost = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [Storage, Transfer, Http, Platform, Camera, Crop, File])
    ], CameraServicePost);
    return CameraServicePost;
}());
export { CameraServicePost };
//# sourceMappingURL=cameraservicepost.js.map
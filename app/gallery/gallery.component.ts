import {GalleryService} from '../_services/index';
import { Gallery } from '../_models/index';
import {Component, Input, Output, EventEmitter} from '@angular/core';
class FileHolder {
  public serverResponse: any;
  public pending: boolean = false;
  constructor(private src: string, public file: File) { }
}
@Component({
    moduleId: module.id,
    selector: 'gallery',
    templateUrl: 'gallery.component.html',
    styleUrls:['gallery.component.css']
})

export class GalleryComponent {
           images: Gallery[] = [];
      @Input() max: number = 100;
  @Input() url: string;
  @Input() preview: boolean = true;
  private files: FileHolder[] = [];

  private fileCounter: number = 0;
  private pendingFilesCounter: number = 0;

  private isFileOver:boolean = false;

  @Input()
  private buttonCaption: string = "Select Images";
  @Input()
  private dropBoxMessage: string = "Drop your images here!";
  constructor(private galleryService: GalleryService) {
        //this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    }


  fileChange(files:any) {
    let remainingSlots = this.countRemainingSlots();
    let filesToUploadNum = files.length > remainingSlots ? remainingSlots : files.length;

    if (this.url && filesToUploadNum != 0) {
     // this.isPending.emit(true);
    }

    this.fileCounter += filesToUploadNum;

    this.uploadFiles(files, filesToUploadNum);
  }

  private uploadFiles(files:any, filesToUploadNum:any) {
    for (let i = 0; i < filesToUploadNum; i++) {
      let file = files[i];


      let img = document.createElement('img');
      img.src = window.URL.createObjectURL(file);

      let reader = new FileReader();
      reader.addEventListener('load', (event: any) => {
        let fileHolder: FileHolder = new FileHolder(event.target.result, file);

        fileHolder.serverResponse = `good boy: ${i}`;

        //this.uploadSingleFile(fileHolder);

        this.files.push(fileHolder);

      }, false);


      reader.readAsDataURL(file);
    }
  }

  private countRemainingSlots() {
    return this.max - this.fileCounter;
  }


  get value(): any[] {
    return this.files;
}

    ngOnInit() {
        this.loadAllUsers();
    }
    private loadAllUsers() {
        this.galleryService.getGallery().subscribe(images=>{this.images=images}
        
        );
        
       // this.userService.getAll().subscribe(users => { this.users = users; });
    }

    upload(){
      
          this.galleryService.addGallery(this.files)
            .subscribe(
                data => {
                            console.log("data submitted");                        
                        },
                err => console.log(err),
                () =>{
                     console.log('Authentication Complete');                    

                });
      }
}




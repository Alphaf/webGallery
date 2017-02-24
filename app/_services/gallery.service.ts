import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

 @Injectable()
 export class GalleryService {

     constructor(private http: Http) {} 

     getGallery() {
         return this.http.get('/api/gallery')
                    .map(response => response.json());
     }

     addGallery(gallery:any) {
        var headers = new Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post("/api/gallery", JSON.stringify(gallery), { headers: headers }) .map(response => response.json());
     }

 }
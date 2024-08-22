import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  private uploadUrl = 'http://localhost:3000/api/photos/upload';
  vehicleUrl='http://localhost:3000/api/photos/vehicle'
  filesUrl= "http://localhost:3000/api/photos/uploads";


  constructor(private http: HttpClient) { }


  uploadedFile():Observable<any>{
    return this.http.post<any[]>(`${this.uploadUrl}`,"")
  }


  uploadFile(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('uploads', file, file.name);
    console.log('file uploaded',file.name)

    return this.http.post<any[]>(`${this.filesUrl}`, file.name).pipe(
      catchError(this.handleError)
    );


  }
  saveImagePath(filePath: string): Observable<any> {
    const body = { path: filePath };
    console.log('file uploaded',filePath)

    return this.http.post<any>(this.filesUrl, body).pipe(
      
      catchError(this.handleError)
      
    );
    
  }

  private handleError(error: HttpErrorResponse) {
    return throwError(error.message || 'Server Error');
  }
  uploadVehicleDoc(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('photo', file, file.name);

    return this.http.post(this.vehicleUrl, formData).pipe(
      catchError(this.handleError)
    );
  }
  
}

import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatListModule } from '@angular/material/list';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { ImageUploadService } from '../../services/imageuploader/image-upload.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-image-uploader',
  standalone: true,
  imports: [
    MatCardModule,
    MatToolbarModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatProgressBarModule,
    MatListModule,
    CommonModule,
  ],
  templateUrl: './image-uploader.component.html',
  styleUrl: './image-uploader.component.scss',
})
export class ImageUploaderComponent implements OnInit {
  selectedFiles?: FileList;
  @Input() initialImage?: string; // Receive logo URL
  @Output() fileSizeError = new EventEmitter<string>(); // Emit error message
  @Output() imageChanged = new EventEmitter<string>();
  @Output() imageSelected = new EventEmitter<File>(); // Emit valid image
  @Output() imageName = new EventEmitter<string>(); // Emit
  selectedFileName = '';
  selectedFileNames: string[] = [];

  progressInfos: any[] = [];
  message: string[] = [];

  previews: string[] = [];
  imageInfos?: Observable<any>;
  constructor(private uploadService: ImageUploadService) {}
  ngOnInit(): void {
    if (this.initialImage) {
      this.previews[0] = this.initialImage; // Show existing logo if provided
    }
  }
  selectFiles(event: any): void {
    this.message = [];
    this.progressInfos = [];
    this.selectedFileNames = [];
    this.selectedFiles = event.target.files;

    this.previews = [];
    if (this.selectedFiles && this.selectedFiles[0]) {
      const numberOfFiles = this.selectedFiles.length;

      for (let i = 0; i < numberOfFiles; i++) {
        const file = this.selectedFiles[i];
        if (!file.type.startsWith('image/')) {
          this.fileSizeError.emit('Only image files are allowed.');

          return;
        }
        if (file.size > 1 * 1024 * 1024) {
          this.fileSizeError.emit(`File "${file.name}" exceeds 10MB.`); // Emit error message
          continue;
        }
        const reader = new FileReader();

        reader.onload = (e: any) => {
          console.log(e.target.result);
          this.previews.push(e.target.result);
        };

        reader.readAsDataURL(this.selectedFiles[i]);

        this.selectedFileNames.push(this.selectedFiles[i].name);
        this.imageName.emit(this.selectedFileNames[0]);
      }
    }
  }

  upload(idx: number, file: File): void {
    this.progressInfos[idx] = { value: 0, fileName: file.name };

    if (file) {
      this.uploadService.upload(file).subscribe(
        (event: any) => {
          if (event.type === HttpEventType.UploadProgress) {
            this.progressInfos[idx].value = Math.round(
              (100 * event.loaded) / event.total
            );
          } else if (event instanceof HttpResponse) {
            const msg = 'Uploaded the file successfully: ' + file.name;
            this.message.push(msg);
          }
        },
        (err: any) => {
          this.progressInfos[idx].value = 0;
          const msg = 'Could not upload the file: ' + file.name;
          this.message.push(msg);
        }
      );
    }
  }
  // uploadFiles(): void {
  //   this.message = [];
  //   console.log('UPLOAD');

  //   if (this.selectedFiles) {
  //     for (let i = 0; i < this.selectedFiles.length; i++) {
  //       this.upload(i, this.selectedFiles[i]);
  //     }
  //   }
  // }
  uploadFiles(): Observable<string[]> {
    const uploadedImageNames: string[] = [];

    if (!this.selectedFiles) {
      return new Observable((observer) => {
        observer.next(uploadedImageNames);
        observer.complete();
      });
    }

    const uploadObservables: Observable<string>[] = [];

    for (let i = 0; i < this.selectedFiles.length; i++) {
      uploadObservables.push(
        new Observable<string>((observer) => {
          this.uploadService.upload(this.selectedFiles![i]).subscribe(
            (event: any) => {
              if (event instanceof HttpResponse) {
                const imageName = this.selectedFiles![i].name;
                uploadedImageNames.push(imageName);
                observer.next(imageName);
                observer.complete();
              }
            },
            (error) => {
              console.error('Upload failed for:', this.selectedFiles![i].name);
              observer.error(error);
            }
          );
        })
      );
    }

    return new Observable((observer) => {
      let completedUploads = 0;
      uploadObservables.forEach((uploadObservable) => {
        uploadObservable.subscribe({
          next: (imageName) => {
            uploadedImageNames.push(imageName);
          },
          complete: () => {
            completedUploads++;
            if (completedUploads === uploadObservables.length) {
              observer.next(uploadedImageNames);
              observer.complete();
            }
          },
          error: (err) => observer.error(err),
        });
      });
    });
  }
}

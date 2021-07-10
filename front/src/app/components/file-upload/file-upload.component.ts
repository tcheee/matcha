import { Component, OnInit, Input, HostListener, ElementRef } from '@angular/core';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
})
export class FileUploadComponent {
  
  public file: File | null = null;

  @HostListener('change', ['$event.target.files']) emitFiles( event: FileList ) {
    const file = event && event.item(0);
    this.file = file;
  }

  constructor( private host: ElementRef<HTMLInputElement> ) {
  }
}
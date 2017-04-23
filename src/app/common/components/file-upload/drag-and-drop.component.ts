import {Component, Output, Input, EventEmitter} from '@angular/core';

@Component({
  selector: 'app-drag-and-drop',
  template: `
    <input type="file" class="hidden" id="collectionImage" (change)="onInputChanged($event)">
    <label class="drag-and-drop"
           for="collectionImage"
           (drop)="onDrop($event)"
           (dragover)="dragover($event)">
      <img *ngIf="img" [image]="img">
      <div>Browse image<br>on your computer<br>or drag and drop<br>here</div>
    </label>
  `
})
export class DragAndDropComponent {
  @Input() img = '';
  @Output('fileChanged') fileChanged: EventEmitter<File> = new EventEmitter();

  constructor() {
  }

  onDrop(e) {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files[0];
    this.onFileChanged(file);
  }

  dragover(e) {
    e.preventDefault();
    e.stopPropagation();
  }

  onInputChanged(event) {
    const file = event.target.files[0];
    this.onFileChanged(file);
  }

  onFileChanged(file) {
    if (file) {
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        this.img = reader.result;
      }, false);
      reader.readAsDataURL(file);
      this.fileChanged.emit(file);
    } else {
      this.fileChanged.emit(null);
    }
  }
}

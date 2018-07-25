import { Component, OnInit, Output, EventEmitter, Input, SimpleChanges } from '@angular/core';
import { LocalStorageService } from 'angular-2-local-storage';
import { SaveFile } from '../../resume-data';

@Component({
  selector: 'app-saved-files',
  templateUrl: './saved-files.component.html',
  styleUrls: ['./saved-files.component.css']
})
export class SavedFilesComponent implements OnInit {

  savedFiles: SaveFile[];
  @Output() closeFileClicked = new EventEmitter<boolean>();
  @Output() openFileEmitter = new EventEmitter<string>();
  @Output() needsUpdatedEmitter = new EventEmitter<boolean>();
  @Input() needsUpdate: boolean;

  constructor(private localStorageService: LocalStorageService) { }

  ngOnInit() {
    this.getExistingResumes();
  }

  getExistingResumes() {
    console.log('getting resumes...');
    this.savedFiles = this.localStorageService.get('existingResumes');
  }

  closeDialog() {
    this.closeFileClicked.emit(true);
  }

  openFile(fileName: string) {
    this.openFileEmitter.emit(fileName);
  }

}

import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { LocalStorageService } from 'angular-2-local-storage';
import { Section, Subsection, Resume, SaveFile } from '../../resume-data';
import { isNgTemplate } from '@angular/compiler';
import * as demo from '../../assets/cookiemonster.json';

@Component({
  selector: 'app-builder',
  templateUrl: './builder.component.html',
  styleUrls: ['./builder.component.css']
})
export class BuilderComponent implements OnInit, OnChanges {

  @Input() resumeForm: FormGroup;
  @Input() existingFileName: string;
  printMode = false;
  displayPrintModeMessage = false;
  existingResume = null;
  @Output() openFileClicked = new EventEmitter<boolean>();
  deleteButtonEnabled = false;

  constructor(private fb: FormBuilder, private localStorageService: LocalStorageService) { }

  saveResume($event: string) {
    let files: SaveFile[] = this.localStorageService.get('existingResumes');
    if (files != null) {
      const existingFile = files.filter((f: SaveFile) => f.name === $event)[0];
      if (existingFile) {
        this.deleteFile($event, files);
      }
      files.push(new SaveFile($event, this.resumeForm.value));
    } else {
      files = [new SaveFile($event, this.resumeForm.value)];
    }

    this.localStorageService.set('existingResumes', files);

    this.deleteButtonEnabled = true;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.existingFileName != null || this.existingFileName !== '') {
      this.deleteButtonEnabled = true;
    }
    this.GetResumeAndBuildForm();
  }

  ngOnInit() {
    this.GetResumeAndBuildForm();
  }

  private GetResumeAndBuildForm() {
    const files = (<SaveFile[]>this.localStorageService.get('existingResumes'));
    if (files != null && files !== []) {
      if (this.existingFileName != null && this.existingFileName !== '') {
        this.existingResume = files.filter((f: SaveFile) => f.name === this.existingFileName)[0].resume;
        this.deleteButtonEnabled = true;
      } else {
        this.existingResume = files[0].resume;
      }
    } else {
      this.existingResume = null;
    }
    this.createForm(this.existingResume);
  }

  openFile() {
    this.openFileClicked.emit(true);
  }

  loadDemo() {
    this.existingResume = demo;
    this.createForm(this.existingResume);
  }

  enterPrintMode() {
    this.printMode = true;
    document.body.style.margin = '0';
    setTimeout(() => { (window as any).print(); }, 25);
  }

  leavePrintMode() {
    console.log('click');
    this.printMode = false;
    this.displayPrintModeMessage = false;
    document.body.style.margin = '5%';
  }

  clearFields() {
    this.resumeForm.reset();
  }

  deleteResume() {
    this.deleteFile(this.existingFileName);

    this.existingFileName = '';
    this.clearFields();
    this.deleteButtonEnabled = false;
  }

  private deleteFile(fileName: string, files: SaveFile[] = null) {
    if (files == null) {
      files = (<SaveFile[]>this.localStorageService.get('existingResumes'));
    }
    if (files != null && fileName != null) {
      const fileToDelete = files.filter((f: SaveFile) => f.name === fileName)[0];
      const index = files.indexOf(fileToDelete, 0);
      if (index > -1) {
        files.splice(index, 1);
      }
      this.localStorageService.set('existingResumes', files);
    }
  }

  hoverResume($event) {
    if (this.printMode) {
      this.displayPrintModeMessage = true;
    }
  }

  leaveResume($event) {
    if (this.printMode) {
      this.displayPrintModeMessage = false;
    }
  }

  cancelPrintModeMessage() {
    this.displayPrintModeMessage = false;
  }

  createForm(resume: Resume = null) {
    const contactInfoArray: FormGroup[] = [];
    if (resume == null || resume.header == null || resume.header.contactInfo == null) {
      contactInfoArray.push(this.initContactInfo());
    } else {
      resume.header.contactInfo.forEach(info => {
        contactInfoArray.push(this.initContactInfo(info));
      });
    }

    const sectionArray: FormGroup[] = [];
    if (resume == null || resume.sections == null) {
      sectionArray.push(this.initSection());
    } else {
      resume.sections.forEach(section => {
        sectionArray.push(this.initSection(section));
      });
    }

    const footerArray: FormGroup[] = [];
    if (resume == null || resume.footer == null) {
      footerArray.push(this.initFooter());
    } else {
      resume.footer.forEach(item => {
        footerArray.push(this.initFooter(item));
      });
    }

    if (resume != null) {
      this.resumeForm = this.fb.group({
        header: this.fb.group({
          title: resume.header.title || '',
          subtitle: resume.header.subtitle || '',
          contactInfo: this.fb.array(contactInfoArray)
        }),
        sections: this.fb.array(sectionArray),
        footer: this.fb.array(footerArray)
      });
    } else {
      this.resumeForm = this.fb.group({
        header: this.fb.group({
          title: '',
          subtitle: '',
          contactInfo: this.fb.array(contactInfoArray)
        }),
        sections: this.fb.array(sectionArray),
        footer: this.fb.array(footerArray)
      });
    }
  }

  initContactInfo(contactInfo = null) {
    return this.fb.group({
      item: contactInfo && contactInfo.item ? contactInfo.item : ''
    });
  }

  initSection(section: Section = null) {
    const array: FormGroup[] = [];

    if (section == null || section.subsections == null) {
      array.push(this.initSubsection());
    } else {
      section.subsections.forEach(subsection => {
        array.push(this.initSubsection(subsection));
      });
    }

    if (section != null) {
      return this.fb.group({
        title: section.title || '',
        subsections: this.fb.array(array)
      });
    }

    return this.fb.group({
      title: '',
      subsections: this.fb.array(array)
    });

  }

  initSubsection(subsection: Subsection = null) {
    const array: FormGroup[] = [];
    if (subsection == null || subsection.items == null) {
      array.push(this.initSubsectionItems());
    } else {
      subsection.items.forEach(item => {
        array.push(this.initSubsectionItems(item));
      });
    }
    if (subsection != null) {
      return this.fb.group({
        title: subsection.title,
        subtitle: subsection.subtitle,
        items: this.fb.array(array),
        sidebar: subsection.sidebar
      });
    }

    return this.fb.group({
      title: '',
      subtitle: '',
      items: this.fb.array(array),
      sidebar: ''
    });
  }

  initSubsectionItems(item = null) {
    return this.fb.group({
      item: item && item.item ? item.item : ''
    });
  }

  initFooter(footerItem = null) {
    let itemName = '';
    if (footerItem != null) {
      itemName = footerItem.item;
    }
    return this.fb.group({
      item: itemName
    });
  }

  getContactInfo(form) {
    return form.controls.header.controls.contactInfo.controls;
  }

  getSections(form) {
    return form.controls.sections.controls;
  }

  getSubsections(form) {
    return form.controls.subsections.controls;
  }

  getSubsectionItems(form) {
    return form.controls.items.controls;
  }

  getFooter(form) {
    return form.controls.footer.controls;
  }

  addContactInfo() {
    const control = <FormArray>this.resumeForm.controls.header.get('contactInfo');
    control.push(this.initContactInfo());
  }

  addSection() {
    const control = <FormArray>this.resumeForm.get('sections');
    control.push(this.initSection());
  }

  addSubsection(index) {
    const sections = <FormArray>this.resumeForm.controls.sections;
    const control = <FormArray>sections.at(index).get('subsections');
    control.push(this.initSubsection());
  }

  addDetail(i, j) {
    const sections = <FormArray>this.resumeForm.controls.sections;
    const subsections = <FormArray>sections.at(i).get('subsections');
    const control = <FormArray>subsections.at(j).get('items');
    control.push(this.initSubsectionItems());
  }

  addFooter() {
    const control = <FormArray>this.resumeForm.get('footer');
    control.push(this.initFooter());
    console.log(this.resumeForm.value.footer[0].item);
  }

  removeContactInfo(index) {
    const control = <FormArray>this.resumeForm.controls.header.get('contactInfo');
    control.removeAt(index);
  }

  removeSection(index) {
    const control = <FormArray>this.resumeForm.get('sections');
    control.removeAt(index);
  }

  removeSubsection(i, j) {
    if (j > 0) {
      const sections = <FormArray>this.resumeForm.controls.sections;
      const control = <FormArray>sections.at(i).get('subsections');
      control.removeAt(j);
    }
  }

  removeDetail(i, j, k) {
    const sections = <FormArray>this.resumeForm.controls.sections;
    const subsections = <FormArray>sections.at(i).get('subsections');
    const control = <FormArray>subsections.at(j).get('items');
    control.removeAt(k);
  }

  removeFooter(index) {
    const control = <FormArray>this.resumeForm.get('footer');
    control.removeAt(index);
  }

  moveContactInfo(index: number, spaces: number) {
    const control = <FormArray>this.resumeForm.controls.header.get('contactInfo');

    this.moveControl(control, index, spaces);
  }

  moveSection(index: number, spaces: number) {
    const control = <FormArray>this.resumeForm.get('sections');

    this.moveControl(control, index, spaces);
  }

  moveSubsection(index: number, jndex: number, spaces: number) {
    const sections = <FormArray>this.resumeForm.controls.sections;
    const control = <FormArray>sections.at(index).get('subsections');

    this.moveControl(control, jndex, spaces);
  }

  moveDetail(index: number, jndex: number, kndex: number, spaces: number) {
    const sections = <FormArray>this.resumeForm.controls.sections;
    const subsections = <FormArray>sections.at(index).get('subsections');
    const control = <FormArray>subsections.at(jndex).get('items');

    this.moveControl(control, kndex, spaces);
  }

  moveFooterItem(index: number, spaces: number) {
    const control = <FormArray>this.resumeForm.get('footer');

    this.moveControl(control, index, spaces);
  }

  private moveControl(control: FormArray, index: number, spaces: number) {
    const item = control.at(index).value;
    const otherItem = control.at(index + spaces).value;
    control.at(index).setValue(otherItem);
    control.at(index + spaces).setValue(item);
  }
}

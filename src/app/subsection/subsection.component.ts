import { Component, OnInit, Input } from '@angular/core';
import { Subsection } from '../../resume-data';

@Component({
  selector: 'app-subsection',
  templateUrl: './subsection.component.html',
  styleUrls: ['./subsection.component.css']
})
export class SubsectionComponent implements OnInit {

  @Input() subsectionData: Subsection;

  constructor() { }

  ngOnInit() {
  }

}

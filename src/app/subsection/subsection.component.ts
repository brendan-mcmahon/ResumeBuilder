import { Component, Input } from '@angular/core';
import { Subsection } from '../../resume-data';

@Component({
  selector: 'app-subsection',
  templateUrl: './subsection.component.html',
  styleUrls: ['./subsection.component.css']
})
export class SubsectionComponent {
  @Input() subsectionData: Subsection;
}

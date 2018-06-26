import { Component, OnInit, Input } from '@angular/core';
import { Section, Subsection } from '../../resume-data';

@Component({
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.css']
})
export class SectionComponent implements OnInit {

  @Input() sectionData: Section;
  subsectionLists: Array<Subsection[]>;

  ngOnInit(): void {
    this.subsectionLists = new Array<Subsection[]>();
    const subsectionCount = this.sectionData.subsections.length;
    const chunk = 2;
    for (let i = 0; i < subsectionCount; i += chunk) {
      this.subsectionLists.push(this.sectionData.subsections.slice(i, i + chunk));
    }
  }
}

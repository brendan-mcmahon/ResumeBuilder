import { Component, OnInit, Input } from '@angular/core';
import { Header } from '../../resume-data';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input() headerData: Header;

  constructor() { }

  ngOnInit() {
  }

}

import { Component, Input} from '@angular/core';
import { Header } from '../../resume-data';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  @Input() headerData: Header;

  constructor() { }
}

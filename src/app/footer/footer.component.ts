import { Component, Input } from '@angular/core';
import { Footer } from '../../resume-data';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {

  @Input() footerData: Footer;

}

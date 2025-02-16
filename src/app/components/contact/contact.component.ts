import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowDown,faGavel, faBusinessTime, faCheckToSlot, faGauge, faCreditCard, faGear, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FontAwesomeModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  faArrow = faArrowDown;
}

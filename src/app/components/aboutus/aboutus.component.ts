import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faFaceSmile } from '@fortawesome/free-regular-svg-icons';
import { faArrowDown, faAsterisk, faBusinessTime, faCheckToSlot, faCircleCheck, faGavel, faCheckCircle, faBox } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-aboutus',
  standalone: true,
  imports: [CommonModule,FontAwesomeModule],
  templateUrl: './aboutus.component.html',
  styleUrl: './aboutus.component.scss'
})
export class AboutusComponent {
    faA = faAsterisk;
    faC = faCircleCheck;
    faArrow = faArrowDown;
    faG = faGavel;
    faB = faBusinessTime;
    faCheck = faCheckToSlot;
    faCC = faCircleCheck;
    faFaceSmile = faFaceSmile;
    faBox = faBox;
}

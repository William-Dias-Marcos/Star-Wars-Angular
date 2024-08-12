import { Component } from '@angular/core';
import { CardComponent } from '../../components/card/card.component';
import { ButtonComponent } from '../../components/button/button.component';

@Component({
  selector: 'wdm-result',
  standalone: true,
  imports: [CardComponent, ButtonComponent],
  templateUrl: './result.component.html',
  styleUrl: './result.component.css',
})
export class ResultComponent {}

import { Component, Input } from '@angular/core';
import { Security } from '../../model/security';
import { CommonModule } from '@angular/common';
import { PercentDirective } from '../percent.directive';

@Component({
  selector: 'app-aristocrat-table',
  standalone: true,
  imports: [CommonModule, PercentDirective],
  templateUrl: './aristocrat-table.component.html',
  styleUrl: './aristocrat-table.component.css'
})
export class AristocratTableComponent {

  @Input()
  stocks: Security[] = []
  @Input()
  thefile = "morehyetfs.json";
}

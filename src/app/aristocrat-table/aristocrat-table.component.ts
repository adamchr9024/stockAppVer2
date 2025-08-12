import { Component, Input } from '@angular/core';
import { Security } from '../../model/security';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-aristocrat-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './aristocrat-table.component.html',
  styleUrl: './aristocrat-table.component.css'
})
export class AristocratTableComponent {

  @Input()
  stocks: Security[] = []
}

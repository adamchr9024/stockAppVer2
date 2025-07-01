import { Component, Input } from '@angular/core';
import { Security } from '../../model/security';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-mytable',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './mytable.component.html',
  styleUrl: './mytable.component.css'
})
export class MytableComponent {
  @Input()
  status = "fetching / done";
  @Input()
  stocks: Security[] = []

}

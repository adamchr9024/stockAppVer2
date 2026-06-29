import { Component } from '@angular/core';
import { SideNavComponent } from './side-nav/side-nav.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SideNavComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'StockAppVer3.0';
}

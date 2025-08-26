import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';  //needed to show tool tipS
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { RouterLink, RouterLinkActive } from '@angular/router';
//import {MatSideContentModule} from '@angular/material/sidenav'
import { RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-side-nav',
  standalone: true,
  imports: [MatSidenavModule, MatIconModule, MatButtonModule, MatTooltipModule,
    MatToolbarModule, MatListModule, RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.css'
})
export class SideNavComponent {
  opened = false;
  toggleOpen() {
    this.opened = !this.opened;
  }
}

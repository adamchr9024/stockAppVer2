import { Component, OnInit, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';  //needed to show tool tipS
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { RouterLink, RouterLinkActive, Router, Event, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
//import {MatSideContentModule} from '@angular/material/sidenav'
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
//import { RapidapiService } from '../rapidapi.service';
import { SpinCtrlService } from '../spin-ctrl.service';
@Component({
  selector: 'app-side-nav',
  standalone: true,
  imports: [MatSidenavModule, MatIconModule, MatButtonModule, MatTooltipModule,
    MatToolbarModule, MatListModule, RouterLink, RouterLinkActive, RouterOutlet, CommonModule],
  providers: [SpinCtrlService],
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.css'
})
export class SideNavComponent implements OnInit {

  showLoader: boolean = false;
  opened = false;
  spinCtrlService = inject(SpinCtrlService);
  //router: Router = inject(Router);
  ngOnInit(): void {
    /* https://www.youtube.com/watch?v=rNrITV7NbXk&list=PL1BztTYDF-QNlGo5-g65Xj1mINHYk_FM9&index=101 time 11.01
    this.router.events.subscribe((routerEvent: Event) => {
      if (routerEvent instanceof NavigationStart) {
        this.showLoader = true;
      }
      if (routerEvent instanceof NavigationEnd
        || routerEvent instanceof NavigationCancel
        || routerEvent instanceof NavigationError) {
        //get Observable from RapidService and check if done
        //I think his example has a resolver 
        this.showLoader = false;
      }
    })
    */
    this.spinCtrlService.ShowAndString.subscribe((data: { displaySpinner: boolean, doneStatus: string }) => {
      this.showLoader = data.displaySpinner;
    })
  }
  toggleOpen() {
    this.opened = !this.opened;
  }
  onKeyPress(event: KeyboardEvent) {
    console.log(event.key)
    if (event.key === 'Enter') {
      this.toggleOpen();
    }
  }
  handleBodyClick() {
    if (this.opened) {
      this.toggleOpen();
    }
  }
}

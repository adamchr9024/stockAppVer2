import { Injectable } from '@angular/core';
import { BehaviorSubject, } from 'rxjs';
//Return a Subject? or BehaviorSubject with multiple Listeners and publishers that has a boolean that  can be passed to all classes and link that with the waiting variable.
// waiting == done   showLoader=false , waiting =  ...fetching showLoader=true;   
//  remove done or pass a string and and boolean observable
@Injectable({
  providedIn: 'root'
})
export class SpinCtrlService {
  ShowAndString = new BehaviorSubject<{ displaySpinner: boolean, doneStatus: string }>({ displaySpinner: false, doneStatus: "...fetching" });

  constructor() { }

  showSpinner(message: string) { // component and use in FinnHub

    this.ShowAndString.next({ displaySpinner: true, doneStatus: message });
  }
  hideSpinner() {
    this.ShowAndString.next({ displaySpinner: false, doneStatus: "done" })
  }
}

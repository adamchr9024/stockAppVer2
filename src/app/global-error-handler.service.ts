import { ErrorHandler, Injectable } from '@angular/core';
import * as StackTrace from 'stacktrace-js';
//https://www.youtube.com/watch?v=XJTc-Sy3JxQ
// npm i stacktrace-js
@Injectable({
  providedIn: 'root'
})
export class GlobalErrorHandlerService implements ErrorHandler {

  constructor() { }
  handleError(error: any): void {
    console.log("RUN TIME ERROR OCCURRED: \n\n ", error);
    // window.alert(errorMessage + "\n Check browser console and logs files as well.")
    let errorMessage = "\n RUN TIME ERROR OCCURRED: Check browser console and logs files as well.\n" + JSON.stringify(error);
    window.alert(errorMessage);
    //https://www.stacktracejs.com/#!/docs/stacktrace-js

    // StackTrace.fromError(error)
    //   .then((stackframes) => {
    // console.log("stackframes:  ", stackframes)
    // stackframes.forEach((sf) => { console.log(sf); })
    // const stringifiedStack = stackframes
    //   .map((sf) => sf.toString())
    //   .join("\n");
    // console.error("Error", error.message || error);
    // console.error("Stack trace: \n", stringifiedStack);
    // let errorMessage: ErrorMessage = {
    //   message: error.message || error,
    //   stack: stringifiedStack,
    //   routes: window.location.href,  //didnt know this was legal
    //   datetime: new Date().toDateString()

    // }
    //send message to other service or // API
    // })
    // .catch((stackTraceError) => {
    //   console.error("Error generating stack trace", stackTraceError)
    // })
  }
}
interface ErrorMessage {
  message: string;
  stack: string;
  routes: string;
  datetime: string;
}

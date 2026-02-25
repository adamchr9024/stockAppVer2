import { Component, OnInit } from '@angular/core';
import { fivelowmedianaverage } from '../../model/security'
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-five-day-median-average',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './five-day-median-average.component.html',
  styleUrl: './five-day-median-average.component.css'
})
export class FiveDayMedianAverageComponent implements OnInit {
  ticker = "";
  val0 = 0;
  val1 = 0;
  val2 = 0;
  val3 = 0;
  val4 = 0;
  flmastring = ""
  flma!: fivelowmedianaverage;
  ngOnInit(): void {
    this.flma = new fivelowmedianaverage("BGR", [0, 1, 2, 3, 4]);
    this.flmastring = this.flma.getMedianAverage();
  }

  createFLMA() {
    this.flma = new fivelowmedianaverage(this.ticker, [this.val0, this.val1, this.val2, this.val3, this.val4])
    this.flmastring = this.flma.getMedianAverage();
  }
}

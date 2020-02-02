import { Component, OnInit, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-new-training",
  templateUrl: "./new-training.component.html",
  styleUrls: ["./new-training.component.scss"]
})
export class NewTrainingComponent implements OnInit {
  foods = [
    { viewValue: "Crunches", value: "crunches" },
    { viewValue: "Toe Touch", value: "touch-toes" },
    { viewValue: "Side Lunges", value: "side-lunges" },
    { viewValue: "Burpees", value: "burpees" }
  ];

  @Output() trainingStart = new EventEmitter<void>()
  
  constructor() {}

  ngOnInit() {}
}

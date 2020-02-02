import { Component, OnInit } from "@angular/core";
import { MatDialog } from "@angular/material";
import { StopTrainingComponent } from "./stop-training.component";

@Component({
  selector: "app-current-training",
  templateUrl: "./current-training.component.html",
  styleUrls: ["./current-training.component.scss"]
})
export class CurrentTrainingComponent implements OnInit {
  progress = 0;
  progressInterval = undefined;
  constructor(private dialog: MatDialog) {}

  ngOnInit() {
    this.startInterval();
  }

  startInterval() {
    this.progressInterval = setInterval(() => {
      this.progress = this.progress + 5;
      if (this.progress >= 100) {
        this.removeInterval();
      }
    }, 1000);
  }

  removeInterval() {
    clearInterval(this.progressInterval);
    this.progressInterval = undefined;
  }

  onStop() {
    const dialogRef = this.dialog.open(StopTrainingComponent, {
      data: { progress: this.progress }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result === true);
      if (result === "true") {
        this.removeInterval();
      } else {
        this.startInterval();
      }
    });
  }
}

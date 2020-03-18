import { Component, OnInit } from '@angular/core'
import { MatDialog } from '@angular/material'
import { StopTrainingComponent } from './stop-training.component'
import { TrainingService } from '../training.service'

@Component({
    selector: 'app-current-training',
    templateUrl: './current-training.component.html',
    styleUrls: ['./current-training.component.scss']
})
export class CurrentTrainingComponent implements OnInit {
    progress = 0
    progressInterval = undefined
    constructor(private dialog: MatDialog, private trainingService: TrainingService) {}

    ngOnInit() {
        this.startOrResumeTimer()
    }

    startOrResumeTimer() {
        const step = (this.trainingService.fetchRunningExercise().duration / 100) * 1000
        this.progressInterval = setInterval(() => {
            this.progress += 1
            if (this.progress >= 100) {
                this.trainingService.completeExercise()
                this.removeInterval()
            }
        }, step)
    }

    removeInterval() {
        clearInterval(this.progressInterval)
        this.progressInterval = undefined
    }

    onStop() {
        this.removeInterval()
        const dialogRef = this.dialog.open(StopTrainingComponent, {
            data: {
                progress: this.progress
            }
        })

        dialogRef.afterClosed().subscribe(result => {
            if (result) {
                this.trainingService.cancelExercise(this.progress)
            } else {
                this.startOrResumeTimer()
            }
        })
    }
}

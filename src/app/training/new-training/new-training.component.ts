import { Component, OnInit, Output, EventEmitter } from '@angular/core'
import { TrainingService } from '../training.service'
import { Exercise } from '../exercise.model'
import {NgForm } from '@angular/forms'

@Component({
    selector: 'app-new-training',
    templateUrl: './new-training.component.html',
    styleUrls: ['./new-training.component.scss'],
})
export class NewTrainingComponent implements OnInit {
    @Output() trainingStart = new EventEmitter<void>()
    exercises: Exercise[] = []

    constructor(private trainingService: TrainingService) {}

    ngOnInit() {
        this.exercises = this.trainingService.getAvailableExercises()
    }

    onStartTraining(form: NgForm) {
        console.log(form)
        this.trainingService.startExercise(form.value.exercise)
    }
}

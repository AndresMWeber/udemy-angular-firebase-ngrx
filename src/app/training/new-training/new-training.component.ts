import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core'
import { NgForm } from '@angular/forms'
import { Subscription } from 'rxjs'
import 'rxjs/add/operator/map'

import { TrainingService } from '../training.service'
import { Exercise } from '../exercise.model'

@Component({
    selector: 'app-new-training',
    templateUrl: './new-training.component.html',
    styleUrls: ['./new-training.component.scss']
})
export class NewTrainingComponent implements OnInit, OnDestroy {
    @Output() trainingStart = new EventEmitter()
    exercises: Exercise[]
    exerciseSubscription: Subscription

    constructor(private trainingService: TrainingService) {}

    ngOnInit() {
        this.exerciseSubscription = this.trainingService.exercisesChanged.subscribe(
            exercises => (this.exercises = exercises)
        )
        this.trainingService.fetchAvailableExercises()
    }

    ngOnDestroy() {
        this.exerciseSubscription.unsubscribe()
    }

    onStartTraining(form: NgForm) {
        console.log(form)
        this.trainingService.startExercise(form.value.exercise)
    }
}

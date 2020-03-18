import { Component, OnInit, Output, EventEmitter } from '@angular/core'
import { TrainingService } from '../training.service'
import { AngularFirestore } from 'angularfire2/firestore'
import {NgForm } from '@angular/forms'
import { Observable } from 'rxjs'

@Component({
    selector: 'app-new-training',
    templateUrl: './new-training.component.html',
    styleUrls: ['./new-training.component.scss'],
})
export class NewTrainingComponent implements OnInit {
    @Output() trainingStart = new EventEmitter()
    exercises: Observable<any>

    constructor(private trainingService: TrainingService, private db: AngularFirestore) {}

    ngOnInit(): void {
        this.db.collection('availableExercises').snapshotChanges().subscribe(result => {
            result.map(res => console.log(res.payload.doc.data()))
        })
    }

    onStartTraining(form: NgForm): void  {
        console.log(form)
        this.trainingService.startExercise(form.value.exercise)
    }
}

import { Subject } from 'rxjs'
import { Exercise } from './exercise.model'
import { Injectable } from '@angular/core'
import { AngularFirestore } from 'angularfire2/firestore'
import { Subscription } from 'rxjs'
@Injectable()
export class TrainingService {
    exerciseChanged = new Subject<Exercise>()
    exercisesChanged = new Subject<Exercise[]>()
    finishedExercisesChanged = new Subject<Exercise[]>()
    private availableExercises: Exercise[] = []
    private runningExercise: Exercise
    private fireSubs: Subscription[] = []

    constructor(private db: AngularFirestore) {}

    fetchExerciseHistory() {
        this.fireSubs.push(
            this.db
                .collection('finishedExercises')
                .valueChanges()
                .subscribe((exercises: Exercise[]) => {
                    console.log('updated finishedExercises', exercises)
                    this.finishedExercisesChanged.next(exercises)
                })
        )
    }

    fetchAvailableExercises() {
        this.fireSubs.push(
            this.db
                .collection('availableExercises')
                .snapshotChanges()
                .map(docArray => {
                    return docArray.map(doc => {
                        const { name, duration, calories } = doc.payload.doc.data() as any
                        return {
                            id: doc.payload.doc.id,
                            name,
                            duration,
                            calories
                        }
                    })
                })
                .subscribe((exercises: Exercise[]) => {
                    console.log(exercises)
                    this.availableExercises = exercises
                    this.exercisesChanged.next([...this.availableExercises])
                })
        )
    }

    startExercise(selectedId: string) {
        this.db.doc(`availableExercises/${selectedId}`).update({ lastSelected: new Date() })
        this.runningExercise = this.availableExercises.find(ex => ex.id === selectedId)
        this.exerciseChanged.next({ ...this.runningExercise })
    }

    completeExercise() {
        this.addDataToDatabase({ ...this.runningExercise, date: new Date(), state: 'completed' })
        this.runningExercise = null
        this.exerciseChanged.next(null)
    }

    cancelExercise(progress: number) {
        this.addDataToDatabase({
            ...this.runningExercise,
            duration: this.runningExercise.duration * (progress / 100),
            calories: this.runningExercise.calories * (progress / 100),
            date: new Date(),
            state: 'cancelled'
        })
        this.runningExercise = null
        this.exerciseChanged.next(null)
    }

    cancelSubscriptions() {
        this.fireSubs.map(sub => sub.unsubscribe())
    }

    fetchRunningExercise() {
        return { ...this.runningExercise }
    }
    private addDataToDatabase(exercise: Exercise) {
        this.db.collection('finishedExercises').add(exercise)
    }
}

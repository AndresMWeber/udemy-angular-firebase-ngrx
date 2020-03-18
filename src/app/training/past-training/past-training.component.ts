import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core'
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material'
import { TrainingService } from '../training.service'
import { Exercise } from '../exercise.model'
import { Subscription } from 'rxjs'

@Component({
    selector: 'app-past-training',
    templateUrl: './past-training.component.html',
    styleUrls: ['./past-training.component.scss']
})
export class PastTrainingComponent implements OnInit, OnDestroy, AfterViewInit {
    displayedColumns = ['date', 'name', 'duration', 'calories', 'state']
    dataSource = new MatTableDataSource<Exercise>()
    private finishedExercisesChangedSubscription: Subscription
    @ViewChild(MatSort, { static: false }) sort: MatSort
    @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator

    constructor(private trainingService: TrainingService) {}

    ngAfterViewInit() {
        this.dataSource.sort = this.sort
        this.dataSource.paginator = this.paginator
    }

    ngOnInit() {
        this.finishedExercisesChangedSubscription = this.trainingService.finishedExercisesChanged.subscribe(
            (exercises: Exercise[]) => {
                console.log('finished exercises', exercises)
                this.dataSource.data = exercises
            }
        )
        this.trainingService.fetchExerciseHistory()
    }

    ngOnDestroy() {
        this.finishedExercisesChangedSubscription.unsubscribe()
    }

    doFilter(filterValue: string) {
        this.dataSource.filter = filterValue.trim().toLowerCase()
    }
}

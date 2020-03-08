import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core'
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material'
import { TrainingService } from '../training.service'
import { Exercise } from '../exercise.model'

@Component({
  selector: 'app-past-training',
  templateUrl: './past-training.component.html',
  styleUrls: ['./past-training.component.scss']
})
export class PastTrainingComponent implements OnInit, AfterViewInit {
  displayedColumns = ['date', 'name', 'duration', 'calories', 'state']
  dataSource = new MatTableDataSource<Exercise>()

  @ViewChild(MatSort, {static: false}) sort: MatSort
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator

  constructor(private trainingService: TrainingService) {}

  ngAfterViewInit() {
    this.dataSource.sort = this.sort
    this.dataSource.paginator = this.paginator
  }

  ngOnInit() {
    this.dataSource.data = this.trainingService.getExerciseHistory()
  }

  doFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase()
  }
}

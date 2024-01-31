import { Component, OnInit } from '@angular/core';
import { ChartOptions } from 'chart.js';
import { DataService } from 'src/app/services/data.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{

    // Pie
    public pieChartOptions: ChartOptions<'pie'> = {
      responsive: false,
    };
    public pieChartLabels = [ 'Team A', 'Team B' ];
    pieChartDatasets:any
    public pieChartLegend = true;
    public pieChartPlugins = [];
    response: any;
    supportReps: any;

    constructor(private dataService:DataService){

    }
  ngOnInit(): void {
    this.dataService.getData().subscribe((data:any) => {
      this.response = data;
      console.log(data);
      this.supportReps = data.support_rep;
      console.log(this.supportReps);
      
      this.pieChartDatasets = [ {
        data: [ this.response.team_a, this.response.team_b ]
      } ];
    });
  }

}

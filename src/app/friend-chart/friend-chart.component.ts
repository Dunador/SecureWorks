import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import * as d3 from 'd3';
import { Observable } from 'rxjs';
import { Friend } from '../models/friend';
import { AppState } from '../ngrx/app.state';
import { FriendState } from '../ngrx/friends.reducer';
import { selectFriendState } from '../ngrx/friends.selectors';

export interface ChartData {
  age: number, 
  weight: number,
}

@Component({
  selector: 'app-friend-chart',
  templateUrl: './friend-chart.component.html',
  styleUrls: ['./friend-chart.component.css']
})
export class FriendChartComponent implements OnInit {

  friendState$: Observable<FriendState>;
  chartData: ChartData[] = [];
  
  constructor(private store: Store<AppState>) {
    this.friendState$ = this.store.pipe(select(selectFriendState));
  }

  ngOnInit(): void {
    this.refreshGraph();
    this.friendState$.subscribe((friendState) => {
      this.chartData = this.formatData(friendState.friends);
      this.chartData.sort((a, b) => a.weight - b.weight);
      this.refreshGraph()
    });
  }

  refreshGraph() {
    var self = this;
    var svg = d3.select("svg"),
        margin = 200,
        width = parseInt(svg.attr("width")) - margin,
        height = parseInt(svg.attr("height")) - margin

    svg.selectAll("text").remove();
    svg.selectAll("g").remove();

    svg.append("text")
       .attr("transform", "translate(100,0)")
       .attr("x", 50)
       .attr("y", 50)
       .attr("font-size", "24px")
       .text("Friends Age vs Weight")

    var xScale = d3.scaleLinear().range([width/this.chartData.length/2, width-width/this.chartData.length/2]),
        yScale = d3.scaleLinear().range([height, 0]);

    var g = svg.append("g")
               .attr("transform", "translate(" + 100 + "," + 100 + ")");


        xScale.domain([d3.min(this.chartData, function(d) { return d.age}), d3.max(this.chartData, function(d) { return d.age; })]);
        yScale.domain([0, d3.max(this.chartData, function(d) { return d.weight; })]);

        g.append("g")
         .attr("transform", "translate(0," + height + ")")
         .call(d3.axisBottom(xScale).tickFormat(function(d) {
           return d.toString();
         })
         .ticks(this.chartData.length))
         .append("text")
         .attr("y", height - 250)
         .attr("x", width - 100)
         .attr("text-anchor", "end")
         .attr("stroke", "black")
         .text("Age");

        g.append("g")
         .call(d3.axisLeft(yScale).tickFormat(function(d){
             return d.toString();
         })
         .ticks(10))
         .append("text")
         .attr("transform", "rotate(-90)")
         .attr("y", 6)
         .attr("dy", "-5.1em")
         .attr("text-anchor", "end")
         .attr("stroke", "black")
         .text("Weight");

        g.selectAll(".bar")
         .data(this.chartData)
         .enter().append("rect")
         .attr("class", "bar")
         .attr("x", function(d) { return xScale(d.age)-15; })
         .attr("width", 30)       
         .attr("y", function(d) { return yScale(d.weight); })
         .attr("height", function(d) { return height - yScale(d.weight); });
    }

    formatData(friends: Friend[]) {
      let data = friends;
      let chartData: ChartData[] = [];
      const ages = [...new Set(data.map((x) => x.age))];
      ages.forEach((age) => {
        const length = data.filter((x) => x.age===age).length;
        chartData.push({ 
          age, 
          weight: data.filter((x) => x.age === age).reduce((total, curr) => total + curr.weight / length, 0)
        })
      });

      return chartData;
    }
}

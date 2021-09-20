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

// First time using D3.js, went with a basic bar chart that displayed your friends age vs weight.  It regenerates each time the FriendState detected a change.
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

    // Call this once on Init, to generate a bare bones graph.
    this.refreshGraph();
    this.friendState$.subscribe((friendState) => {
      this.chartData = this.formatData(friendState.friends);
      this.chartData.sort((a, b) => a.weight - b.weight);
      // On Each subscription return, refresh the graph display with the new data
      this.refreshGraph()
    });
  }

  refreshGraph() {
    var svg = d3.select("svg"),
        margin = 200,
        width = parseInt(svg.attr("width")) - margin,
        height = parseInt(svg.attr("height")) - margin

    // Clear any pre-existing graph elements
    svg.selectAll("text").remove();
    svg.selectAll("g").remove();

    svg.append("text")
       .attr("transform", "translate(100,0)")
       .attr("x", 50)
       .attr("y", 50)
       .attr("font-size", "24px")
       .text("Friends Age vs Weight")

    // Didnt want the Age X-axis to scale from 0, so instead had it scale based on entries 
    var xScale = d3.scaleLinear().range([width/this.chartData.length/2, width-width/this.chartData.length/2]),
        yScale = d3.scaleLinear().range([height, 0]);

    var g = svg.append("g")
               .attr("transform", "translate(" + 100 + "," + 100 + ")");


        xScale.domain([d3.min(this.chartData, function(d) { return d.age}), d3.max(this.chartData, function(d) { return d.age; })]);
        yScale.domain([0, d3.max(this.chartData, function(d) { return d.weight; })]);

        // Create X-axis
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

         // Create Y-axis
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

         // Add each of the bars to display
        g.selectAll(".bar")
         .data(this.chartData)
         .enter().append("rect")
         .attr("class", "bar")
         .attr("x", function(d) { return xScale(d.age)-15; })
         .attr("width", 30)       
         .attr("y", function(d) { return yScale(d.weight); })
         .attr("height", function(d) { return height - yScale(d.weight); });
    }

    // For a chart comparing average weight per age, some data formatting was needed.
    formatData(friends: Friend[]) {
      let data = friends;
      let chartData: ChartData[] = [];
      // Get each unique age in the current Friends.
      const ages = [...new Set(data.map((x) => x.age))];
      // For Each age...
      ages.forEach((age) => {
        // ...determine the number of data entries...
        const length = data.filter((x) => x.age===age).length;
        chartData.push({ 
          age, 
          // ...And average them all out.
          weight: data.filter((x) => x.age === age).reduce((total, curr) => total + curr.weight / length, 0)
        })
      });

      return chartData;
    }
}

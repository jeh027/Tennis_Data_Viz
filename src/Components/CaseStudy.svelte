<script>
    import { onMount } from 'svelte';
    import * as d3 from 'd3';
    import 'd3-transition';
  
    const margin6 = {top: 20, right: 30, bottom: 50, left: 60}, // margins just for now
      width6 = 510 - margin6.left - margin6.right,
      height6 = 450 - margin6.top - margin6.bottom;
  
    onMount(() => {
      const svg6 = d3.select("#my_dataviz_6")
        .append("svg")
        .attr("width", width6 + margin6.left + margin6.right)
        .attr("height", height6 + margin6.top + margin6.bottom)
        .append("g")
        .attr("transform", `translate(${margin6.left},${margin6.top})`);
  
      d3.csv("https://raw.githubusercontent.com/jeh027/Tennis_Data_Viz/main/tennis_stats_subset.csv").then(data => {
  
        // Filter data for a specific player
        // const dataFilter = data.filter(d => d.name == 'Jo Wilfried Tsonga');

        // X axis: scale and draw:
        svg6.append("g")
          .attr("transform", `translate(0, ${height6})`)
          .attr("class", "myXaxis");
  
        const x = d3.scaleLinear().range([0, width6]);
        x.domain([0, 30]); // leave out outliers
  
        const xAxis = d3.axisBottom().scale(x);
        
        svg6.selectAll(".myXaxis").call(xAxis);
  
        // set the parameters for the histogram
        const histogram = d3.histogram()
          .value(function(d) { return +d.aces; })
          .domain(x.domain())
          .thresholds(x.ticks(20));
          
        const bins1 = histogram(data.filter(d => d.surface == "Grass"));
  
        // Y axis: scale and draw:
        const y_max1 = d3.max(bins1, function(d) { return d.length; });
  
        svg6.append("g").attr("class", "myYaxis");
  
        const y = d3.scaleLinear().range([height6, 0]);
        y.domain([0, y_max1]);
  
        const yAxis = d3.axisLeft().scale(y);
  
        svg6.selectAll(".myYaxis").call(yAxis);
        
        // append the bar
        svg6.selectAll("rect")
          .data(bins1)
          .enter()
          .append("rect")
          .attr("x", 1)
          .attr("transform", function(d) { return "translate(" + x(d.x0) + "," + y(d.length) + ")"; })
          .attr("width", function(d) { return x(d.x1) - x(d.x0) -1 ; })
          .attr("height", function(d) { return height6 - y(d.length); })
          .style("fill", "#3AA536")
          .style("opacity", 0.7)
      })
  
      // x and y axis labels
      svg6.append("text")
        .attr("class", "x label")
        .attr("text-anchor", "end")
        .attr("x", width8 - 120)
        .attr("y", height8 + 40)
        .text("Aces Per Tournament");
        
      svg6.append("text")
        .attr("class", "y label")
        .attr("text-anchor", "end")
        .attr("x", -80)
        .attr("y", -45)
        .attr("dy", ".75em")
        .attr("transform", "rotate(-90)")
        .text("Number of Tournaments");
    });
  
  
    const margin7 = {top: 20, right: 30, bottom: 50, left: 60},
      width7 = 510 - margin7.left - margin7.right,
      height7 = 450 - margin7.top - margin7.bottom;

    onMount(() => {
      const svg7 = d3.select("#my_dataviz_7")
        .append("svg")
        .attr("width", width7 + margin7.left + margin7.right)
        .attr("height", height7 + margin7.top + margin7.bottom)
        .append("g")
        .attr("transform", `translate(${margin7.left},${margin7.top})`);
  
      d3.csv("https://raw.githubusercontent.com/jeh027/Tennis_Data_Viz/main/tennis_stats_subset.csv").then(data => {
        
        // List of all players
        // const dataFilter = data.filter(d => d.name == 'Jo Wilfried Tsonga');
        
        // X axis: scale and draw:
        svg7.append("g")
          .attr("transform", `translate(0, ${height7})`)
          .attr("class", "myXaxis")
  
        const x = d3.scaleLinear().range([0, width7]);
        x.domain([0, 30]); // leave out outliers
  
        const xAxis = d3.axisBottom().scale(x);
  
        svg7.selectAll(".myXaxis").call(xAxis);
  
        // set the parameters for histogram
        const histogram = d3.histogram()
          .value(function(d) { return +d.aces; })
          .domain(x.domain())
          .thresholds(x.ticks(20));
  
        const bins2 = histogram(data.filter(d => d.surface === "Clay"));
        
        // Y axis: scale and draw:
        const y_max2 = d3.max(bins2, function(d) { return d.length; });
  
        svg7.append("g").attr("class", "myYaxis");
  
        const y = d3.scaleLinear().range([height7, 0]);
        y.domain([0, y_max2]);
  
        const yAxis = d3.axisLeft().scale(y);
  
        svg7.selectAll(".myYaxis").call(yAxis);
  
        // append the bars
        svg7.selectAll("rect2")
          .data(bins2)
          .enter()
          .append("rect")
          .attr("x", 1)
          .attr("transform", function(d) { return `translate(${x(d.x0)}, ${y(d.length)})`})
          .attr("width", function(d) { return x(d.x1) - x(d.x0) -1 ; })
          .attr("height", function(d) { return height7 - y(d.length); })
          .style("fill", "#404080")
          .style("opacity", 0.7)
      })
  
      // x and y axis labels
      svg7.append("text")
        .attr("class", "x label")
        .attr("text-anchor", "end")
        .attr("x", width8 - 120)
        .attr("y", height8 + 40)
        .text("Aces Per Tournament");
        
      svg7.append("text")
        .attr("class", "y label")
        .attr("text-anchor", "end")
        .attr("x", -80)
        .attr("y", -45)
        .attr("dy", ".75em")
        .attr("transform", "rotate(-90)")
        .text("Number of Tournaments");
    });
  
  
    // set the dimensions and margins of the graph
    const margin8 = {top: 20, right: 30, bottom: 50, left: 60},
      width8 = 510 - margin8.left - margin8.right,
      height8 = 450 - margin8.top - margin8.bottom;
  
    onMount(() => {
      const svg8 = d3.select("#my_dataviz_8")
        .append("svg")
        .attr("width", width8 + margin8.left + margin8.right)
        .attr("height", height8 + margin8.top + margin8.bottom)
        .append("g")
        .attr("transform", `translate(${margin8.left},${margin8.top})`);
  
      d3.csv("https://raw.githubusercontent.com/jeh027/Tennis_Data_Viz/main/tennis_stats_subset.csv").then(data => {
  
        // List of all players
        // const dataFilter = data.filter(d => d.name == 'Jo Wilfried Tsonga');
  
        // X axis: scale and draw:
        svg8.append("g")
          .attr("transform", `translate(0, ${height8})`)
          .attr("class", "myXaxis")
  
        const x = d3.scaleLinear().range([0, width8]);
        x.domain([0, 30]); // leave out outliers
  
        const xAxis = d3.axisBottom().scale(x);
  
        svg8.selectAll(".myXaxis").call(xAxis);
  
        // set the parameters for the histogram
        const histogram = d3.histogram()
          .value(function(d) { return +d.aces; })
          .domain(x.domain())
          .thresholds(x.ticks(20)); // 0 to 2.5 no?
        
        // And apply twice this function to data to get the bins
        const bins3 = histogram(data.filter(d => d.surface == "Hard"));
  
        // Y axis: scale and draw:
        const y_max3 = d3.max(bins3, function(d) { return d.length; });
  
        svg8.append("g").attr("class", "myYaxis");
  
        const y = d3.scaleLinear().range([height8, 0]);
        y.domain([0, y_max3]);
  
        const yAxis = d3.axisLeft().scale(y);
  
        svg8.selectAll(".myYaxis").call(yAxis);
  
        // append the bars for series 3
        svg8.selectAll("rect3")
          .data(bins3)
          .enter()
          .append("rect")
          .attr("x", 1)
          .attr("transform", function(d) { return `translate(${x(d.x0)}, ${y(d.length)})`})
          .attr("width", function(d) { return x(d.x1) - x(d.x0) -1 ; })
          .attr("height", function(d) { return height8 - y(d.length); })
          .style("fill", "#0F6F9F")
          .style("opacity", 0.7)
      })
  
      // Handmade legend
      svg8.append("circle").attr("cx",370).attr("cy",20).attr("r", 6).style("fill", "#3AA536")
      svg8.append("circle").attr("cx",370).attr("cy",50).attr("r", 6).style("fill", "#404080")
      svg8.append("circle").attr("cx",370).attr("cy",80).attr("r", 6).style("fill", "#0F6F9F")
      svg8.append("text").attr("x", 390).attr("y", 20).text("Grass").style("font-size", "15px").attr("alignment-baseline","middle")
      svg8.append("text").attr("x", 390).attr("y", 50).text("Clay").style("font-size", "15px").attr("alignment-baseline","middle")
      svg8.append("text").attr("x", 390).attr("y", 80).text("Hard").style("font-size", "15px").attr("alignment-baseline","middle")
      svg8.append("text").attr("x", 315).attr("y", -10).text("Court Surface").style("font-size", "15px").style("font-weight", "bold").attr("alignment-baseline","middle")
  
      // x and y axis labels
      svg8.append("text")
        .attr("class", "x label")
        .attr("text-anchor", "end")
        .attr("x", width8 - 120)
        .attr("y", height8 + 40)
        .text("Aces Per Tournament");
        
      svg8.append("text")
        .attr("class", "y label")
        .attr("text-anchor", "end")
        .attr("x", -80)
        .attr("y", -45)
        .attr("dy", ".75em")
        .attr("transform", "rotate(-90)")
        .text("Number of Tournaments");
    });
  </script>
  
  <h2 class="body-header">High Level Exploratory Analysis</h2>
  
  <h3 class="title">Distribution of Aces Conditioned On Court Surface</h3>
  <div class="hist_container">
    <div id="my_dataviz_6" class="chart"></div>
    <div id="my_dataviz_7" class="chart"></div>
    <div id="my_dataviz_8" class="chart"></div>
  </div>

  <p class="body-text">
    From this we can see that, ...
  </p>
  
  <style>
    .hist_container {
      display: flex;
      justify-content: center;
      flex-direction: center;
      align-items: center;
    }

    .title {
        display: flex;
        justify-content: center;
        margin-top: 2rem;
    }
  </style>
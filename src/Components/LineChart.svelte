<script>
  import { onMount } from 'svelte';
  import * as d3 from 'd3';

  const margin = {top: 20, right: 30, bottom: 50, left: 50}, // margins just for now
    width = 510 - margin.left - margin.right,
    height = 450 - margin.top - margin.bottom;

  onMount(() => {
    const svg = d3.select("#my_dataviz")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    d3.csv("https://raw.githubusercontent.com/jeh027/Tennis_Data_Viz/main/tennis_stats_subset.csv").then(data => {
      
      // List of all players
      const players = data.map(d => d.name);
      const menu = new Set(players);

      // Filter data for a specific player
      const dataFilter = data.filter(d => d.name == 'Kevin Anderson');

      // Add the options to the button
      d3.select("#selectButton")
        .selectAll('option')
        .data(Array.from(menu))
        .enter()
        .append('option')
        .text(d => d) // text showed in the menu
        .attr("value", d => d); // value returned by the button

      d3.select("#selectButton").on("change", function() { // this is for the drop down
        // Recovers the option that has been chosen
        let selectedOption = d3.select(this).property("value")
        update(selectedOption)
        functionFromSecondFile(selectedOption)
        functionFromThirdFile(selectedOption)
      });

      // X axis: scale and draw:
      svg.append("g")
        .attr("transform", `translate(0, ${height})`)
        .attr("class", "myXaxis");

      const x = d3.scaleLinear().range([0, width]);
      x.domain([0, 50]); // leave out outliers

      const xAxis = d3.axisBottom().scale(x);
      
      svg.selectAll(".myXaxis").call(xAxis);

      // set the parameters for the histogram
      const histogram = d3.histogram()
        .value(function(d) { return +d.aces; })
        .domain(x.domain())
        .thresholds(x.ticks(20));
        
      const bins1 = histogram(dataFilter.filter(d => d.surface == "Grass"));

      // Y axis: scale and draw:
      const y_max1 = d3.max(bins1, function(d) { return d.length; });

      svg.append("g").attr("class", "myYaxis");

      const y = d3.scaleLinear().range([height, 0]);
      y.domain([0, y_max1]);

      const yAxis = d3.axisLeft().scale(y);

      svg.selectAll(".myYaxis").call(yAxis);
      
      // append the bar
      const bar1 = svg.selectAll("rect")
        .data(bins1)
        .enter()
        .append("rect")
        .attr("x", 1)
        .attr("transform", function(d) { return "translate(" + x(d.x0) + "," + y(d.length) + ")"; })
        .attr("width", function(d) { return x(d.x1) - x(d.x0) -1 ; })
        .attr("height", function(d) { return height - y(d.length); })
        .style("fill", "#3AA536")
        .style("opacity", 0.7)
      
      function update(selectedOption) {
        const new_dataFilter = data.filter(d => d.name == selectedOption);
        
        const new_histogram = d3.histogram()
          .value(function(d) { return +d.aces; })
          .domain(x.domain())
          .thresholds(x.ticks(20));
          
        const new_bins1 = new_histogram(new_dataFilter.filter(d => d.surface == "Grass"));
        const new_ymax1 = d3.max(new_bins1, function(d) { return d.length; });
        
        y.domain([0, new_ymax1]);

        svg.selectAll(".myYaxis")
          .transition()
          .duration(1000)
          .call(yAxis);
        
        bar1.exit() // Grass
          .transition()
          .duration(300)
          .attr("height", 0)
          .remove();

        bar1.data(new_bins1)
          .join("rect")
          .transition()
          .duration(1000)
          .attr("x", 1)
          .attr("transform", function(d) { return `translate(${x(d.x0)}, ${y(d.length)})`})
          .attr("width", function(d) { return x(d.x1) - x(d.x0) -1 ; })
          .attr("height", function(d) { return height - y(d.length); })
          .style("fill", "#3AA536") // change colors later
          .style("opacity", 0.7);
      }
    })

    // x and y axis labels
    svg.append("text")
      .attr("class", "x label")
      .attr("text-anchor", "end")
      .attr("x", width - 120)
      .attr("y", height + 40)
      .text("Aces Per Tournament");
      
    svg.append("text")
      .attr("class", "y label")
      .attr("text-anchor", "end")
      .attr("x", 0)
      .attr("y", 6)
      .attr("dy", ".75em")
      .attr("transform", "rotate(-90)")
      .text("Frequency");
  });


  const margin2 = {top: 20, right: 30, bottom: 50, left: 50},
    width2 = 510 - margin2.left - margin2.right,
    height2 = 450 - margin2.top - margin2.bottom;

  function functionFromSecondFile(selectedOption) {
    // @ts-ignore
    window.update2(selectedOption)
  }

  onMount(() => {
    const svg2 = d3.select("#my_dataviz_2")
      .append("svg")
      .attr("width", width2 + margin2.left + margin2.right)
      .attr("height", height2 + margin2.top + margin2.bottom)
      .append("g")
      .attr("transform", `translate(${margin2.left},${margin2.top})`);

    d3.csv("https://raw.githubusercontent.com/jeh027/Tennis_Data_Viz/main/tennis_stats_subset.csv").then(data => {
      
      // List of all players
      const dataFilter = data.filter(d => d.name == 'Kevin Anderson');
      
      // X axis: scale and draw:
      svg2.append("g")
        .attr("transform", `translate(0, ${height2})`)
        .attr("class", "myXaxis")

      const x = d3.scaleLinear().range([0, width2]);
      x.domain([0, 50]); // leave out outliers

      const xAxis = d3.axisBottom().scale(x);

      svg2.selectAll(".myXaxis").call(xAxis);

      // set the parameters for histogram
      const histogram = d3.histogram()
        .value(function(d) { return +d.aces; })
        .domain(x.domain())
        .thresholds(x.ticks(20));

      const bins2 = histogram(dataFilter.filter(d => d.surface === "Clay"));
      
      // Y axis: scale and draw:
      const y_max2 = d3.max(bins2, function(d) { return d.length; });

      svg2.append("g").attr("class", "myYaxis");

      const y = d3.scaleLinear().range([height2, 0]);
      y.domain([0, y_max2]);

      const yAxis = d3.axisLeft().scale(y);

      svg2.selectAll(".myYaxis").call(yAxis);

      // append the bars
      const bar2 = svg2.selectAll("rect2")
        .data(bins2)
        .enter()
        .append("rect")
        .attr("x", 1)
        .attr("transform", function(d) { return `translate(${x(d.x0)}, ${y(d.length)})`})
        .attr("width", function(d) { return x(d.x1) - x(d.x0) -1 ; })
        .attr("height", function(d) { return height2 - y(d.length); })
        .style("fill", "#404080")
        .style("opacity", 0.7)

      // @ts-ignore
      window.update2 = function(selectedOption) {
        const new_dataFilter = data.filter(d => d.name == selectedOption)

        const new_histogram = d3.histogram()
          .value(function(d) { return +d.aces; })
          .domain(x.domain())
          .thresholds(x.ticks(20));
        
        const new_bins2 = new_histogram(new_dataFilter.filter(d => d.surface === "Clay"));
        const new_ymax2 = d3.max(new_bins2, function(d) { return d.length; }); // cross-check with Python for accuracy

        y.domain([0, new_ymax2]);
        svg2.selectAll(".myYaxis")
          .transition()
          .duration(1000)
          .call(yAxis);

        bar2.exit() // Clay
          .transition()
          .duration(300)
          .attr("height", 0)
          .remove();

        bar2.data(new_bins2)
          .join("rect")
          .transition()
          .duration(1000)
          .attr("x", 1)
          .attr("transform", function(d) { return `translate(${x(d.x0)}, ${y(d.length)})`})
          .attr("width", function(d) { return x(d.x1) - x(d.x0) -1 ; })
          .attr("height", function(d) { return height2 - y(d.length); })
          .style("fill", "#404080")
          .style("opacity", 0.7);
      }
    })

    // x and y axis labels
    svg2.append("text")
      .attr("class", "x label")
      .attr("text-anchor", "end")
      .attr("x", width2 - 120)
      .attr("y", height2 + 40)
      .text("Aces Per Tournament");
      
    svg2.append("text")
      .attr("class", "y label")
      .attr("text-anchor", "end")
      .attr("x", 0)
      .attr("y", 6)
      .attr("dy", ".75em")
      .attr("transform", "rotate(-90)")
      .text("Frequency");
  });


  // set the dimensions and margins of the graph
  const margin3 = {top: 20, right: 30, bottom: 50, left: 50},
    width3 = 510 - margin3.left - margin3.right,
    height3 = 450 - margin3.top - margin3.bottom;
  
  function functionFromThirdFile(selectedOption) {
    // @ts-ignore
    window.update3(selectedOption)
  }

  onMount(() => {
    const svg3 = d3.select("#my_dataviz_3")
      .append("svg")
      .attr("width", width3 + margin3.left + margin3.right)
      .attr("height", height3 + margin3.top + margin3.bottom)
      .append("g")
      .attr("transform", `translate(${margin3.left},${margin3.top})`);

    d3.csv("https://raw.githubusercontent.com/jeh027/Tennis_Data_Viz/main/tennis_stats_subset.csv").then(data => {

      // List of all players
      const dataFilter = data.filter(d => d.name == 'Kevin Anderson');

      // X axis: scale and draw:
      svg3.append("g")
        .attr("transform", `translate(0, ${height3})`)
        .attr("class", "myXaxis")

      const x = d3.scaleLinear().range([0, width3]);
      x.domain([0, 50]); // leave out outliers

      const xAxis = d3.axisBottom().scale(x);

      svg3.selectAll(".myXaxis").call(xAxis);

      // set the parameters for the histogram
      const histogram = d3.histogram()
        .value(function(d) { return +d.aces; })
        .domain(x.domain())
        .thresholds(x.ticks(20)); // 0 to 2.5 no?
      
      // And apply twice this function to data to get the bins
      const bins3 = histogram(dataFilter.filter(d => d.surface == "Hard"));

      // Y axis: scale and draw:
      const y_max3 = d3.max(bins3, function(d) { return d.length; });

      svg3.append("g").attr("class", "myYaxis");

      const y = d3.scaleLinear().range([height3, 0]);
      y.domain([0, y_max3]);

      const yAxis = d3.axisLeft().scale(y);

      svg3.selectAll(".myYaxis").call(yAxis);

      // append the bars for series 3
      const bar3 = svg3.selectAll("rect3")
        .data(bins3)
        .enter()
        .append("rect")
        .attr("x", 1)
        .attr("transform", function(d) { return `translate(${x(d.x0)}, ${y(d.length)})`})
        .attr("width", function(d) { return x(d.x1) - x(d.x0) -1 ; })
        .attr("height", function(d) { return height3 - y(d.length); })
        .style("fill", "#0F6F9F")
        .style("opacity", 0.7)
      
      // @ts-ignore
      window.update3 = function(selectedOption) {
        const new_dataFilter = data.filter(d => d.name == selectedOption)

        const new_histogram = d3.histogram()
          .value(function(d) { return +d.aces; })
          .domain(x.domain())
          .thresholds(x.ticks(20));
        
        const new_bins3 = new_histogram(new_dataFilter.filter(d => d.surface == "Hard"));
        const new_ymax3 = d3.max(new_bins3, function(d) { return d.length; });

        y.domain([0, new_ymax3]);
        svg3.selectAll(".myYaxis")
          .transition()
          .duration(1000)
          .call(yAxis);

        bar3.exit() // Hard
          .transition()
          .duration(300)
          .attr("height", 0)
          .remove();

        bar3.data(new_bins3)
          .join("rect")
          .transition()
          .duration(1000)
          .attr("x", 1)
          .attr("transform", function(d) { return `translate(${x(d.x0)}, ${y(d.length)})`})
          .attr("width", function(d) { return x(d.x1) - x(d.x0) -1 ; })
          .attr("height", function(d) { return height3 - y(d.length); })
          .style("fill", "#0F6F9F")
          .style("opacity", 0.7);
      }
    })

    // Handmade legend
    svg3.append("circle").attr("cx",310).attr("cy",20).attr("r", 6).style("fill", "#3AA536")
    svg3.append("circle").attr("cx",310).attr("cy",50).attr("r", 6).style("fill", "#404080")
    svg3.append("circle").attr("cx",310).attr("cy",80).attr("r", 6).style("fill", "#0F6F9F")
    svg3.append("text").attr("x", 330).attr("y", 20).text("Grass").style("font-size", "15px").attr("alignment-baseline","middle")
    svg3.append("text").attr("x", 330).attr("y", 50).text("Clay").style("font-size", "15px").attr("alignment-baseline","middle")
    svg3.append("text").attr("x", 330).attr("y", 80).text("Acrylic").style("font-size", "15px").attr("alignment-baseline","middle")
    svg3.append("text").attr("x", 285).attr("y", -10).text("Court Surfaces").style("font-size", "15px").style("font-weight", "bold").attr("alignment-baseline","middle")

    // x and y axis labels
    svg3.append("text")
      .attr("class", "x label")
      .attr("text-anchor", "end")
      .attr("x", width3 - 120)
      .attr("y", height3 + 40)
      .text("Aces Per Tournament");
      
    svg3.append("text")
      .attr("class", "y label")
      .attr("text-anchor", "end")
      .attr("x", 0)
      .attr("y", 6)
      .attr("dy", ".75em")
      .attr("transform", "rotate(-90)")
      .text("Frequency");
  });
</script>

<h1 class="body-header">Responsive, Static Chart Example</h1>
<p class="body-text">
  This component is an example of a responsive chart built with Svelte and
  D3.js.
</p>

<select id="selectButton"></select>

<div class="container">
  <div id="my_dataviz" class="chart"></div>
  <div id="my_dataviz_2" class="chart"></div>
  <div id="my_dataviz_3" class="chart"></div>
</div>

<style>
  .container {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  #selectButton {
    margin-left: 25px;
    margin-top: 50px;
  }
</style>

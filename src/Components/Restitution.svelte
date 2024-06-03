<script>
    import { onMount } from 'svelte';
    import * as d3 from 'd3';

    // Coefficient of Restitution
    // Set the dimensions and margins of the graph
    const margin5 = {top: 20, right: 30, bottom: 50, left: 60},
        width5 = 550 - margin5.left - margin5.right,
        height5 = 400 - margin5.top - margin5.bottom;

    const restitution_data = [
        {name: 'Slow (0-29)', min: 0.9, q1: 0.92, median: 0.94, q3: 0.96, max: 0.98}, // Slow (0-29)
        {name: 'Medium-slow (30-34)', min: 0.86, q1: 0.89, median: 0.92, q3: 0.95, max: 0.98}, // Medium-slow (30-34)
        {name: 'Medium (35-39)', min: 0.82, q1: 0.86, median: 0.89, q3: 0.93, max: 0.96}, // Medium (35-39)
        {name: 'Medium-fast (40-44)', min: 0.78, q1: 0.82, median: 0.86, q3: 0.90, max: 0.94}, // Medium-fast (40-44)
        {name: 'Fast (45+)', min: 0.7, q1: 0.75, median: 0.8, q3: 0.85, max: 0.9}] // Fast (45+)

    onMount(() => {
        // Append SVG container to the component's element
        const svg5 = d3.select("#my_dataviz_5")
            .append("svg")
            .attr("width", width5 + margin5.left + margin5.right)
            .attr("height", height5 + margin5.top + margin5.bottom)
            .append("g")
            .attr("transform", `translate(${margin5.left},${margin5.top})`);

        // Show the X scale
        const x = d3.scaleBand()
            .range([0, width5])
            .domain(restitution_data.map(d => d.name))
            .paddingInner(1)
            .paddingOuter(0.5);

        svg5.append("g")
            .attr("transform", "translate(0," + height5 + ")")
            .call(d3.axisBottom(x));

        // Show the Y scale
        const y = d3.scaleLinear()
            .domain([0.65, 1])
            .range([height5, 0]);

        svg5.append("g").call(d3.axisLeft(y));

        // Show the main vertical line
        svg5
            .selectAll("vertLines") // creates a new selection for each data item that doesn't have a corresponding existing element in the DOM
            .data(restitution_data)
            .enter()
            .append("line")
                .attr("x1", function(d){return(x(d.name))})
                .attr("x2", function(d){return(x(d.name))})
                .attr("y1", function(d){return(y(d.min))})
                .attr("y2", function(d){return(y(d.max))})
                .attr("stroke", "black")
                .style("width", 40)

        // Rectangle for the main box
        const box_width = 20
        svg5
            .selectAll("boxes")
            .data(restitution_data)
            .enter()
            .append("rect")
                .attr("x", function(d){return(x(d.name) - (box_width / 2))})
                .attr("y", function(d){return(y(d.q3))})
                .attr("height", function(d){return(y(d.q1) - y(d.q3))}) // smaller values are higher on screen
                .attr("width", box_width)
                .attr("stroke", "black")
                .style("fill", "#3AA536")

        // Show the median
        svg5
            .selectAll("medianLines")
            .data(restitution_data)
            .enter()
            .append("line")
            .attr("x1", function(d){return(x(d.name) - (box_width / 2)) })
            .attr("x2", function(d){return(x(d.name) + (box_width/2)) })
            .attr("y1", function(d){return(y(d.median))})
            .attr("y2", function(d){return(y(d.median))})
            .attr("stroke", "black")
            .style("width", 80)

        // Whisker Caps (top)
        svg5
            .selectAll("whiskerCaps")
            .data(restitution_data)
            .enter()
            .append("line")
            .attr("x1", function(d){return(x(d.name) - (box_width / 2)) })
            .attr("x2", function(d){return(x(d.name) + (box_width / 2)) })
            .attr("y1", function(d){return(y(d.max))})
            .attr("y2", function(d){return(y(d.max))})
            .attr("stroke", "black")
            .style("width", 80)

        // Whisker Caps (bottom)
        svg5
            .selectAll("whiskerCaps")
            .data(restitution_data)
            .enter()
            .append("line")
            .attr("x1", function(d){return(x(d.name) - (box_width / 2)) })
            .attr("x2", function(d){return(x(d.name) + (box_width / 2)) })
            .attr("y1", function(d){return(y(d.min))})
            .attr("y2", function(d){return(y(d.min))})
            .attr("stroke", "black")
            .style("width", 80)

        // x and y axis labels
        svg5.append("text")
            .attr("class", "x label")
            .attr("text-anchor", "end")
            .attr("x", width5 - 150)
            .attr("y", height5 + 40)
            .text("Court Pace Index (CPI)");
            
        svg5.append("text")
            .attr("class", "y label")
            .attr("text-anchor", "end")
            .attr("x", -20)
            .attr("y", -50)
            .attr("dy", ".75em")
            .attr("transform", "rotate(-90)")
            .text("Coefficient of Restitution (Bounce)");
    }); // when I refresh, the box plot duplicates; why?
</script>


<div class="vertical_container">  
    <h3>Tennis Surface Coefficient of Restitution</h3>
    <div id="my_dataviz_5" class="chart"></div>
</div>

<style>
    .chart {
        margin: 10px;
        width: 550px; /* Match the container width */
        height: 400px; /* Match the container height */
    }

    .vertical_container {
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
    }
</style>
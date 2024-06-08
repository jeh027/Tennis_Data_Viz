<script>
    import { onMount } from 'svelte';
    import * as d3 from 'd3';

    // Set the dimensions and margins of the graph
    const margin4 = {top: 10, right: 30, bottom: 50, left: 60},
        width4 = 550 - margin4.left - margin4.right,
        height4 = 400 - margin4.top - margin4.bottom;

    let friction_data = [
        {name: 'Clay', min: 0.58, q1: 0.62, median: 0.66, q3: 0.7, max: 0.74}, // Slow (0-29)
        {name: 'Hard', min: 0.52, q1: 0.56, median: 0.61, q3: 0.655, max: 0.7}, // Medium-fast (40-44) this is fine for now
        {name: 'Grass', min: 0.4, q1: 0.45, median: 0.5, q3: 0.55, max: 0.6} // Fast (45+)
    ]

    onMount(() => {
        // Append SVG container to the component's element
        const svg4 = d3.select("#my_dataviz_4")
            .append("svg")
            .attr("width", width4 + margin4.left + margin4.right)
            .attr("height", height4 + margin4.top + margin4.bottom)
            .append("g")
            .attr("transform", `translate(${margin4.left},${margin4.top})`);

        // Show the X scale
        const x = d3.scaleBand()
            .range([0, width4])
            .domain(friction_data.map(d => d.name))
            .paddingInner(1)
            .paddingOuter(0.5);

        svg4.append("g")
            .attr("transform", "translate(0," + height4 + ")")
            .call(d3.axisBottom(x));

        // Show the Y scale
        const y = d3.scaleLinear()
            .domain([0.35, 0.75])
            .range([height4, 0]);

        svg4.append("g").call(d3.axisLeft(y));

        // Show the main vertical line
        svg4
            .selectAll("vertLines") // creates a new selection for each data item that doesn't have a corresponding existing element in the DOM
            .data(friction_data)
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
        svg4
            .selectAll("boxes")
            .data(friction_data)
            .enter()
            .append("rect")
                .attr("x", function(d){return(x(d.name) - (box_width / 2))})
                .attr("y", function(d){return(y(d.q3))})
                .attr("height", function(d){return(y(d.q1) - y(d.q3))}) // smaller values are higher on screen
                .attr("width", box_width)
                .attr("stroke", "black")
                .style("fill", "#3AA536")

        // Show the median
        svg4
            .selectAll("medianLines")
            .data(friction_data)
            .enter()
            .append("line")
            .attr("x1", function(d){return(x(d.name) - (box_width / 2)) })
            .attr("x2", function(d){return(x(d.name) + (box_width/2)) })
            .attr("y1", function(d){return(y(d.median))})
            .attr("y2", function(d){return(y(d.median))})
            .attr("stroke", "black")
            .style("width", 80)

        // Whisker Caps (top)
        svg4
            .selectAll("whiskerCaps")
            .data(friction_data)
            .enter()
            .append("line")
            .attr("x1", function(d){return(x(d.name) - (box_width / 2)) })
            .attr("x2", function(d){return(x(d.name) + (box_width / 2)) })
            .attr("y1", function(d){return(y(d.max))})
            .attr("y2", function(d){return(y(d.max))})
            .attr("stroke", "black")
            .style("width", 80)

        // Whisker Caps (bottom)
        svg4
            .selectAll("whiskerCaps")
            .data(friction_data)
            .enter()
            .append("line")
            .attr("x1", function(d){return(x(d.name) - (box_width / 2)) })
            .attr("x2", function(d){return(x(d.name) + (box_width / 2)) })
            .attr("y1", function(d){return(y(d.min))})
            .attr("y2", function(d){return(y(d.min))})
            .attr("stroke", "black")
            .style("width", 80)

        // x and y axis labels
        svg4.append("text")
            .attr("class", "x label")
            .attr("text-anchor", "end")
            .attr("x", width4 - 150)
            .attr("y", height4 + 40)
            .text("Tennis Court Surface");
            
        svg4.append("text")
            .attr("class", "y label")
            .attr("text-anchor", "end")
            .attr("x", -80)
            .attr("y", -50)
            .attr("dy", ".75em")
            .attr("transform", "rotate(-90)")
            .text("Coefficient of Friction");
        });

</script>


<h2 class="title">How Does The Court Surface Affect The Speed Of The Ball?</h2>

<div class="box_container">
    <h3>Coefficient of Friction Across Tennis Court Surfaces</h3>
    <div id="my_dataviz_4" class="chart"></div>
</div>

<br>
<p class="body-text">
    The type of tennis court surface significantly influences the speed of the ball, shaping the game's dynamics and the strategies players employ. 
    The coefficient of friction is a key factor in this context. It measures how much grip or resistance a surface offers to the ball's motion. 
    A surface with a higher coefficient of friction, such as clay, causes the ball to decelerate more after bouncing. This deceleration results from 
    the increased friction force between the ball and the court, leading to a slower ball speed after the bounce.
</p>
<br>
<p class="body-text">
    Imagine a match on a clay court: the ball slows down, giving players more time to reach it, which often results in longer, more strategic rallies. 
    Players who excel on clay, like Rafael Nadal, master the art of constructing points with patience and precision, using the slower surface to their 
    advantage.
</p>
<br>
<p class="body-text">
    In contrast, grass courts have a lower coefficient of friction, causing the ball to retain more of its speed after bouncing. The slick, low-friction 
    surface makes the ball skid and shoot through the court. Picture the fast-paced, serve-and-volley style of play typical at Wimbledon, where players 
    like Roger Federer use the speed to dominate with quick, aggressive shots.
</p>
<br>
<p class="body-text">
    Hard courts fall in the middle, offering a balanced coefficient of friction. This balance allows for a diverse range of playing styles, making hard 
    courts the most versatile and widely used surface in professional tennis. Novak Djokovic’s adaptability and success on hard courts exemplify how this 
    surface supports an all-around game, combining elements of speed and endurance.
</p>


<style>
    .title {
        display: flex;
        justify-content: center;
        margin-top: 2rem;
    }

    .chart {
        margin: 10px;
        width: 550px; 
        height: 400px;
    }

    .box_container {
        display: flex;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        margin-top: 2rem;
    }
</style>


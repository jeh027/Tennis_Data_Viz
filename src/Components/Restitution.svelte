<script>
    import { onMount } from 'svelte';
    import * as d3 from 'd3';

    // Coefficient of Restitution
    // Set the dimensions and margins of the graph
    const margin5 = {top: 20, right: 30, bottom: 50, left: 60},
        width5 = 550 - margin5.left - margin5.right,
        height5 = 400 - margin5.top - margin5.bottom;

    const restitution_data = [
        {name: 'Clay', min: 0.9, q1: 0.92, median: 0.94, q3: 0.96, max: 0.98}, // Slow (0-29)
        {name: 'Hard', min: 0.86, q1: 0.89, median: 0.92, q3: 0.95, max: 0.98}, // Medium-slow (30-34) this is fine for now
        {name: 'Grass', min: 0.7, q1: 0.75, median: 0.8, q3: 0.85, max: 0.9}] // Fast (45+)

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
            .text("Tennis Court Surface");
            
        svg5.append("text")
            .attr("class", "y label")
            .attr("text-anchor", "end")
            .attr("x", -65)
            .attr("y", -50)
            .attr("dy", ".75em")
            .attr("transform", "rotate(-90)")
            .text("Coefficient of Restitution");
    });
</script>


<h2 class="title">How Does The Tennis Court Surface Affect The Bounce Of The Ball?</h2>

<div class="vertical_container">  
    <h3>Tennis Court Surface Coefficient of Restitution</h3>
    <div id="my_dataviz_5" class="chart"></div>
</div>

<br>
<p class="body-text">
    The bounce of the ball on different tennis court surfaces is another critical factor that affects gameplay. The coefficient of restitution measures this aspect by indicating how elastic the collision between the ball and the surface is. A higher coefficient of restitution means a higher, more elastic bounce.
</p>
<br>
<p class="body-text">
    Grass courts have a low coefficient of restitution, leading to lower and faster bounces. The ball tends to skim off the surface, maintaining a low trajectory that mirrors its entry angle. This characteristic favors players with powerful serves and swift net play, as the low bounce keeps rallies short and demands quick reflexes. The legendary Martina Navratilova leveraged this to her advantage, winning nine Wimbledon titles with her exceptional net play.
</p>
<br>
<p class="body-text">
    Conversely, clay courts boast a high coefficient of restitution, causing the ball to bounce higher and slower. This higher bounce provides players with more time to react, encouraging longer rallies and a baseline-oriented game. The high rebound angle forces players to adopt a different strategy, focusing on stamina and consistent groundstrokes. Rafael Nadal’s unparalleled success on clay, including his record 14 French Open titles, is a testament to his ability to harness the high bounce to wear down opponents with relentless precision.
</p>
<br>
<p class="body-text">
    Hard courts offer a moderate coefficient of restitution, creating a balanced bounce that neither skims like grass nor soars like clay. This versatility makes hard courts suitable for a wide range of playing styles. Players must be adaptable, ready to transition between offensive and defensive strategies. Serena Williams’ dominance on hard courts, with multiple Grand Slam victories, highlights her ability to excel on a surface that demands a well-rounded skill set.
</p>



<h2 class="body-header">Why Do These Differences Matter?</h2>
<br>
<p class="body-text">
    The differences in speed and bounce across various court surfaces are not just technical details; they fundamentally shape the way tennis is played. These variations influence match strategies, player training regimes, and even the physical and mental attributes required for success on each surface. Understanding and mastering these nuances allows players to tailor their game, develop specialized skills, and exploit the unique characteristics of each surface to gain a competitive edge. Whether it’s the fast, skidding balls of grass courts, the high, looping bounces of clay, or the balanced play of hard courts, the interaction between surface and ball adds layers of complexity and excitement to the sport of tennis.
</p>



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
        margin-top: 2rem;
    }

    .title {
        display: flex;
        justify-content: center;
        margin-top: 2rem;
    }
</style>
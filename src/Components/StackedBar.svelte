<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        .tooltip {
            position: absolute;
            background-color: white;
            border: 1px solid;
            border-radius: 5px;
            padding: 10px;
            pointer-events: none;
            opacity: 0;
            transition: opacity 0.2s;
        }

        .vertical_container {
            display: flex;
            justify-content: center;
            flex-direction: column;
            align-items: center;
            margin-top: 2rem;
            margin-bottom: 2rem;
        }

        .chart {
            margin: 10px;
            width: 550px;
            height: 400px;
        }
    </style>
    <script src="https://d3js.org/d3.v6.min.js"></script>
</head>

<div class="vertical_container">
    <h3>Distribution of Tournament Outcomes by Jo-Wilfried Tsonga</h3>
    <div id="my_dataviz_9" class="chart"></div>
</div>

<br>
<p class="body-text">
    ...
</p>

<script>
    import { onMount } from 'svelte';
    import * as d3 from 'd3';

    const margin9 = {top: 20, right: 30, bottom: 50, left: 60},
        width9 = 510 - margin9.left - margin9.right,
        height9 = 450 - margin9.top - margin9.bottom;

    onMount(() => {
        // Append the SVG object to the body of the page
        const svg9 = d3.select("#my_dataviz_9")
            .append("svg")
            .attr("width", width9 + margin9.left + margin9.right)
            .attr("height", height9 + margin9.top + margin9.bottom)
            .append("g")
            .attr("transform", `translate(${margin9.left},${margin9.top})`);

        // Parse the Data
        d3.csv("https://raw.githubusercontent.com/jeh027/Tennis_Data_Viz/main/win_loss.csv").then(function(data) {

            // List of all players
            const dataFilter = data.filter(d => d.name == 'Jo Wilfried Tsonga');

            // List of subgroups = header of the csv files = soil condition here (for stack)
            const subgroups = data.columns.slice(2, 4); // [won, lost]

            // List of groups = species here = value of the first column called group -> I show them on the X axis (for x axis)
            const groups = data.map(d => d.surface);
            const surfaces = new Set(groups); // [Grass, Clay, Hard]

            // Add X axis
            const x = d3.scaleBand()
                .domain(surfaces)
                .range([0, width9])
                .padding([0.2]);
            svg9.append("g")
                .attr("transform", `translate(0, ${height9})`)
                .call(d3.axisBottom(x).tickSizeOuter(0));

            // Add Y axis
            const y = d3.scaleLinear()
                .domain([0, 1])
                .range([height9, 0]);
            svg9.append("g")
                .call(d3.axisLeft(y));

            // Color palette = one color per subgroup
            const color = d3.scaleOrdinal()
                .domain(subgroups)
                // @ts-ignore
                .range(['#C7EFCF', '#FE5F55', '#EEF5DB']);

            // Stack the data -> stack per subgroup
            const stackedData = d3.stack()
                .keys(subgroups)
                (dataFilter);

            // Create a tooltip
            const tooltip = d3.select("#my_dataviz_9")
                .append("div")
                .attr("class", "tooltip");

            // Functions that change the tooltip when user hovers / moves / leaves a cell
            const mouseover = function(event, d) {
                const subgroupName = d3.select(this.parentNode).datum().key;
                const subgroupValue = d.data[subgroupName];
                tooltip
                .html("Outcome: " + subgroupName + "<br>" + "Value: " + subgroupValue)
                .style("opacity", 1);
                };

            const mousemove = function(event, d) {
                tooltip
                .style("left", (event.pageX + 10) + "px")
                .style("top", (event.pageY - 40) + "px");
                };

            const mouseleave = function(event, d) {
                tooltip
                .style("opacity", 0);
                };

            // Show the bars
            svg9.append("g")
                .selectAll("g")
                // Enter in the stack data -> loop key per key -> group per group
                .data(stackedData)
                .join("g")
                .attr("fill", d => color(d.key))
                .selectAll("rect")
                // Enter a second time -> loop subgroup per subgroup to add all rectangles
                .data(d => d)
                .join("rect")
                    .attr("x", d => x(d.data.surface))
                    .attr("y", d => y(d[1]))
                    .attr("height", d => y(d[0]) - y(d[1]))
                    .attr("width", x.bandwidth())
                    .attr("stroke", "grey")
                .on("mouseover", mouseover)
                .on("mousemove", mousemove)
                .on("mouseleave", mouseleave);
        })

        // x and y axis labels
        svg9.append("text")
            .attr("class", "x label")
            .attr("text-anchor", "end")
            .attr("x", width9 - 120)
            .attr("y", height9 + 40)
            .text("Tennis Court Surface");
            
        svg9.append("text")
            .attr("class", "y label")
            .attr("text-anchor", "end")
            .attr("x", -150)
            .attr("y", -50)
            .attr("dy", ".75em")
            .attr("transform", "rotate(-90)")
            .text("Proportion");
    });
</script>

<script>
    import { onMount } from 'svelte';
    import * as d3 from 'd3';
    import 'd3-transition';

    const margin10 = {top: 20, right: 30, bottom: 50, left: 60},
        width10 = 510 - margin10.left - margin10.right,
        height10 = 450 - margin10.top - margin10.bottom;


    onMount(() => {
        // Append the SVG object to the body of the page
        const svg10 = d3.select("#my_dataviz_10")
            .append("svg")
            .attr("width", width10 + margin10.left + margin10.right)
            .attr("height", height10 + margin10.top + margin10.bottom)
            .append("g")
            .attr("transform", `translate(${margin10.left},${margin10.top})`);


        d3.select("#StackButton").on("change", function() { 
            // Recovers the option that has been chosen
            let selectedOption = d3.select(this).property("value")
            update(selectedOption)
        });

        // Initialize the X axis
        const x = d3.scaleBand()
            .range([ 0, width10])
            .padding(0.2);
        const xAxis = svg10.append("g")
            .attr("transform", `translate(0,${height10})`);

        // Initialize the Y axis
        const y = d3.scaleLinear()
            .range([height10, 0]);
        const yAxis = svg10.append("g")
            .attr("class", "myYaxis");

        // A function that create / update the plot for a given variable:
        function update(selectedOption) {
            d3.csv("https://raw.githubusercontent.com/jeh027/Tennis_Data_Viz/main/win_loss.csv").then(function(data) {
                // List of all players
                const players = data.map(d => d.name);
                const menu = new Set(players);

                // Filter data for a specific player
                const dataFilter = data.filter(d => d.name == selectedOption);
                console.log(dataFilter);

                // List of subgroups (for stack)
                const subgroups = data.columns.slice(2, 4); // [won, lost]

                // List of groups (for x axis)
                const groups = data.map(d => d.surface);
                const surfaces = new Set(groups); // [Clay, Grass, Hard]

                // Add the options to the button
                d3.select("#StackButton")
                    .selectAll('option')
                    .data(Array.from(menu))
                    .enter()
                    .append('option')
                    .text(d => d) // text showed in the menu
                    .attr("value", d => d); // value returned by the button

                // X axis
                x.domain(surfaces);
                xAxis.transition().duration(1000).call(d3.axisBottom(x).tickSizeOuter(0)); // call

                // Add Y axis
                y.domain([0, 1]);
                yAxis.transition().duration(1000).call(d3.axisLeft(y));

                // Color palette = one color per subgroup
                const color = d3.scaleOrdinal()
                    .domain(subgroups)
                    // @ts-ignore
                    .range(['#C7EFCF', '#FE5F55', '#EEF5DB']);

                // Stack the data -> stack per subgroup
                const stackedData = d3.stack()
                    .keys(subgroups)
                    (dataFilter);
                console.log(stackedData);

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
                svg10.append("g")
                    .selectAll("g")
                    .data(stackedData)
                    .join("g")
                    .attr("fill", d => color(d.key))
                    .selectAll("rect")
                    .data(d => d)
                    .join("rect")
                        .attr("x", d => x(d.data.surface))
                        .attr("y", d => y(d[1]))
                    .on("mouseover", mouseover)
                    .on("mousemove", mousemove)
                    .on("mouseleave", mouseleave)
                        .transition()
                        .duration(1000)
                        .attr("height", d => y(d[0]) - y(d[1]))
                        .attr("width", x.bandwidth())
                        .attr("stroke", "grey")
            })
        }

        // x and y axis labels
        svg10.append("text")
            .attr("class", "x label")
            .attr("text-anchor", "end")
            .attr("x", width10 - 120)
            .attr("y", height10 + 40)
            .text("Tennis Court Surface");
            
        svg10.append("text")
            .attr("class", "y label")
            .attr("text-anchor", "end")
            .attr("x", -150)
            .attr("y", -50)
            .attr("dy", ".75em")
            .attr("transform", "rotate(-90)")
            .text("Proportion");

        update("Andre Agassi") // first call to function
    });

</script>


<div class="header-container">
    <h3 class="title">Distribution of Outcomes Per Court Surface</h3>
    <div class="CenterButton">
        <select id="StackButton"></select>
    </div>
</div>

<div class="stack_container">
    <div id="my_dataviz_10" class="chart"></div>
</div>


<style>
    .stack_container {
    display: flex;
    justify-content: center;
    flex-direction: center;
    align-items: center;
    }

    .header-container {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 3rem;
    }

    .title {
    margin-right: 15px;
    }

    .CenterButton {
    margin-left: 15px;
    }

    #StackButton {
    margin-top: 0;
    }
</style>
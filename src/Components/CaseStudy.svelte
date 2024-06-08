<script>
    import { onMount } from 'svelte';
    import * as d3 from 'd3';
    import 'd3-transition';
  
    const margin6 = {top: 20, right: 30, bottom: 50, left: 60}, // margins just for now
      width6 = 490 - margin6.left - margin6.right,
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
        const dataFilter = data.filter(d => d.name == 'Jo Wilfried Tsonga');

        // X axis: scale and draw:
        svg6.append("g")
          .attr("transform", `translate(0, ${height6})`)
          .attr("class", "myXaxis");
  
        const x = d3.scaleLinear().range([0, width6]);
        x.domain([0, 50]); // leave out outliers
  
        const xAxis = d3.axisBottom().scale(x);
        
        svg6.selectAll(".myXaxis").call(xAxis);
  
        // set the parameters for the histogram
        const histogram = d3.histogram()
          .value(function(d) { return +d.aces; })
          .domain(x.domain())
          .thresholds(x.ticks(20));
          
        const bins1 = histogram(dataFilter.filter(d => d.surface == "Grass"));
  
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
          .style("fill", "#228B22")
          .style("opacity", 0.7)
        })
  
        // x and y axis labels
        svg6.append("text")
            .attr("class", "x label")
            .attr("text-anchor", "end")
            .attr("x", width6 - 150)
            .attr("y", height6 + 40)
            .text("Aces Per Match");
            
        svg6.append("text")
            .attr("class", "y label")
            .attr("text-anchor", "end")
            .attr("x", -110)
            .attr("y", -45)
            .attr("dy", ".75em")
            .attr("transform", "rotate(-90)")
            .text("Number of Matches");
    });
  
  
    const margin7 = {top: 20, right: 30, bottom: 50, left: 60},
      width7 = 490 - margin7.left - margin7.right,
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
        const dataFilter = data.filter(d => d.name == 'Jo Wilfried Tsonga');
        
        // X axis: scale and draw:
        svg7.append("g")
          .attr("transform", `translate(0, ${height7})`)
          .attr("class", "myXaxis")
  
        const x = d3.scaleLinear().range([0, width7]);
        x.domain([0, 50]); // leave out outliers
  
        const xAxis = d3.axisBottom().scale(x);
  
        svg7.selectAll(".myXaxis").call(xAxis);
  
        // set the parameters for histogram
        const histogram = d3.histogram()
          .value(function(d) { return +d.aces; })
          .domain(x.domain())
          .thresholds(x.ticks(20));
  
        const bins2 = histogram(dataFilter.filter(d => d.surface === "Clay"));
        
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
          .style("fill", "#d2691e")
          .style("opacity", 0.7)
        })
  
        // x and y axis labels
        svg7.append("text")
            .attr("class", "x label")
            .attr("text-anchor", "end")
            .attr("x", width7 - 150)
            .attr("y", height7 + 40)
            .text("Aces Per Match");
            
        svg7.append("text")
            .attr("class", "y label")
            .attr("text-anchor", "end")
            .attr("x", -110)
            .attr("y", -45)
            .attr("dy", ".75em")
            .attr("transform", "rotate(-90)")
            .text("Number of Matches");
    });
  
  
    // set the dimensions and margins of the graph
    const margin8 = {top: 20, right: 30, bottom: 50, left: 60},
      width8 = 490 - margin8.left - margin8.right,
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
        const dataFilter = data.filter(d => d.name == 'Jo Wilfried Tsonga');
  
        // X axis: scale and draw:
        svg8.append("g")
          .attr("transform", `translate(0, ${height8})`)
          .attr("class", "myXaxis")
  
        const x = d3.scaleLinear().range([0, width8]);
        x.domain([0, 50]); // leave out outliers
  
        const xAxis = d3.axisBottom().scale(x);
  
        svg8.selectAll(".myXaxis").call(xAxis);
  
        // set the parameters for the histogram
        const histogram = d3.histogram()
          .value(function(d) { return +d.aces; })
          .domain(x.domain())
          .thresholds(x.ticks(20));
        
        // And apply twice this function to data to get the bins
        const bins3 = histogram(dataFilter.filter(d => d.surface == "Hard"));
  
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
        svg8.append("circle").attr("cx",350).attr("cy",20).attr("r", 6).style("fill", "#228B22")
        svg8.append("circle").attr("cx",350).attr("cy",50).attr("r", 6).style("fill", "#d2691e")
        svg8.append("circle").attr("cx",350).attr("cy",80).attr("r", 6).style("fill", "#0F6F9F")
        svg8.append("text").attr("x", 370).attr("y", 20).text("Grass").style("font-size", "15px").attr("alignment-baseline","middle")
        svg8.append("text").attr("x", 370).attr("y", 50).text("Clay").style("font-size", "15px").attr("alignment-baseline","middle")
        svg8.append("text").attr("x", 370).attr("y", 80).text("Hard").style("font-size", "15px").attr("alignment-baseline","middle")
        svg8.append("text").attr("x", 300).attr("y", -10).text("Court Surface").style("font-size", "15px").style("font-weight", "bold").attr("alignment-baseline","middle")

        // x and y axis labels
        svg8.append("text")
            .attr("class", "x label")
            .attr("text-anchor", "end")
            .attr("x", width8 - 150)
            .attr("y", height8 + 40)
            .text("Aces Per Match");
            
        svg8.append("text")
            .attr("class", "y label")
            .attr("text-anchor", "end")
            .attr("x", -110)
            .attr("y", -45)
            .attr("dy", ".75em")
            .attr("transform", "rotate(-90)")
            .text("Number of Matches");
    });


  </script>
  
  <h2 class="body-header">Case Study: Jo-Wilfried Tsonga</h2>
  
  <p class="body-text">
    Jo-Wilfried Tsonga, born on April 17, 1985, in Le Mans, France, is renowned for his powerful playing style and exceptional serving ability. 
    Over his career, Tsonga reached a career-high ATP singles ranking of world No. 5 in February 2012 and secured 18 singles titles, including two 
    Masters 1000 titles. His serve, a critical weapon in his arsenal, has performed differently across the various court surfaces, offering a fascinating 
    insight into the interaction between surface type and player performance.
  </p>

  <h3 class="title">Distribution of Aces Per Court Surface By Jo Wilfried Tsonga</h3>

  <div class="hist_container">
    <div id="my_dataviz_6" class="chart"></div>
    <div id="my_dataviz_7" class="chart"></div>
    <div id="my_dataviz_8" class="chart"></div>
  </div>

  <br>
  <p class="body-text">
    The accompanying charts illustrate the distribution of aces per tournament for Tsonga across three different surfaces: grass, clay, and hard courts. 
    Each surface presents unique characteristics that significantly impact the dynamics of the game and, consequently, Tsonga’s serving performance.
  </p>
  <br>
  <p class="body-text">
    On grass courts, Tsonga’s ace performance is particularly impressive, with a notable concentration of tournaments featuring between 4 and 20 aces 
    per match. Grass courts, characterized by their low friction and fast, low bounces, are ideal for Tsonga’s powerful serve. The surface’s quick pace 
    allows him to generate a high number of aces, taking full advantage of his aggressive playing style to dominate points swiftly and effectively.
  </p>
  <br>
  <p class="body-text">
    In stark contrast, clay courts show a significantly lower distribution of aces per tournament. Most of Tsonga’s matches on clay see him achieving 
    between 5 and 15 aces. The high coefficient of restitution on clay courts results in higher and slower bounces, giving opponents more time to react to 
    serves. This surface places greater emphasis on baseline rallies and endurance, areas where Tsonga’s serve loses some of its impact, highlighting the 
    challenges players face on clay.
  </p>
  <br>
  <p class="body-text">
    Hard courts present a balanced middle ground, with Tsonga’s aces per tournament generally ranging between 5 and 25. This surface combines moderate 
    speed and bounce, creating an environment that supports a wide variety of playing styles. Tsonga’s performance on hard courts reflects his adaptability 
    and the effectiveness of his serve in conditions that neither favor extreme speed nor slow, high bounces. Hard courts thus allow Tsonga to maintain a 
    robust serving game, leveraging both power and consistency.
  </p>
  <br>
  <p class="body-text">
    The analysis of Tsonga’s ace distribution across different court surfaces underscores the profound influence of surface characteristics on player 
    performance. Grass courts amplify Tsonga’s serving prowess, resulting in higher ace counts, while clay courts diminish this advantage, necessitating 
    greater reliance on baseline play. Hard courts, offering a balanced environment, enable Tsonga to effectively utilize his serve while adapting to a 
    variety of playing conditions.
  </p>
  <br>
  <p class="body-text">
    This case study of Jo-Wilfried Tsonga highlights how tennis players must continuously adapt their strategies to optimize their strengths across 
    different playing surfaces. The interaction between court surface and serve performance is a testament to the intricate dynamics of the sport, 
    showcasing the nuanced challenges and opportunities each surface presents.
  </p>
  
  <style>
    .title {
        display: flex;
        justify-content: center;
        margin-top: 2rem;
    }

    .hist_container {
      display: flex;
      justify-content: center;
      flex-direction: center;
      align-items: center;
      margin-bottom: 3rem;
    }
  </style>
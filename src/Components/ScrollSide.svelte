<script>
  import Scrolly from "./Scrolly.svelte";
  import katexify from "../katexify";
  import { select, selectAll } from "d3-selection";

  // scroll iterator
  let value;

  // Paragraph text for scrolly
  $: steps = [
    `<h1 class='step-title'>Grass Surface</h1>
      <p>
      Origins: Grass courts are the oldest surface in tennis, originating in the mid-19th century in England, where lawn tennis evolved from the earlier game of real tennis. The first official tennis tournament, the Wimbledon Championships, was held on grass in 1877.
      </p>
      <br>
      <p>
      Popularization: Grass courts were widely popular in the early years of tennis, especially in Britain, Australia, and the United States. Major tournaments like Wimbledon, the US Open, and the Australian Open were initially played on grass.
      </p>
      <br>
      <p>
      Modern Usage: Today, grass courts are less common due to their high maintenance costs and susceptibility to weather conditions. However, Wimbledon remains the most prestigious grass court tournament, and the grass court season includes events like the Queen's Club Championships and the Halle Open.
      </p>
      <br>
      <p>
      Notable Players: Roger Federer is renowned for his success on grass, winning a record eight Wimbledon titles. Martina Navratilova holds the record for the most Wimbledon singles titles with nine, showcasing her dominance on this surface.
      </p>`,
    `<h1 class='step-title'>Clay Surface</h1>
      <p>
        Origins: Clay courts emerged in the late 19th century in France, with early courts made by covering grass courts with a layer of crushed brick. The French Championships, now the French Open, began on clay in 1891.
      </p>
      <br>
      <p>
        Popularization: Clay courts gained popularity in Europe and Latin America, where the climate and cost made them a practical alternative to grass. The surface became integral to tennis culture in countries like Spain, Italy, and Argentina.
      </p>
      <br>
      <p>
        Modern Usage: Clay courts are prevalent on the ATP and WTA tours, particularly during the European clay court season leading up to the French Open. Key tournaments include the Monte Carlo Masters, Madrid Open, and Italian Open.
      </p>
      <br>
      <p>
        Notable Players: Rafael Nadal, known as the "King of Clay," has dominated the French Open with a record 14 titles. Chris Evert is a notable female player on clay, with seven French Open titles to her name.
      </p>`,
    `<h1 class='step-title'>Hard Surface</h1>
      <p>
        Origins: Hard courts became prominent in the mid-20th century as a durable and low-maintenance alternative to grass and clay. The US Open switched from grass to clay in 1975 and then to hard courts in 1978, while the Australian Open followed suit in 1988.
      </p>
      <br>
      <p>
        Popularization: Hard courts quickly gained popularity worldwide due to their consistent playing surface and relatively low maintenance. They became the standard surface for many tennis facilities, both professional and recreational.
      </p>
      <br>
      <p>
        Modern Usage: Hard courts are now the most common surface on the professional tour. They are used for two of the four Grand Slam tournaments—the US Open and the Australian Open—and numerous ATP and WTA events throughout the year.
      </p>
      <br>
      <p>
        Notable Players: Novak Djokovic has excelled on hard courts, winning multiple titles at both the Australian Open and the US Open. Serena Williams is another standout player, with numerous Grand Slam victories on hard courts.
      </p>`,
  ];

  const target2event = {
    0: () => {
      select("#chart1").style("background-color", "green");
      select("#chart2").style("background-color", "green");
    },

    1: () => {
      select("#chart1").style("background-color", "coral");
      select("#chart2").style("background-color", "coral");
    },

    2: () => {
      select("#chart1").style("background-color", "blue");
      select("#chart2").style("background-color", "blue");
    },
  };


  $: if (typeof value !== "undefined" && value <= 2) {
    target2event[value]()
  };

</script>

<h2 class="body-header">Brief History Of Each Surface</h2>
<p class="body-text">
  Here's an example of a typical side-scroller. It's responsive, and will fold
  to an overlap scroll if the screen gets small enough:
</p>
<section>
  <!-- scroll container -->
  <div class="section-container">
    <div class="steps-container">
      <Scrolly bind:value>
        {#each steps as text, i}
          <div class="step" class:active={value === i}>
            <div class="step-content">{@html text}</div>
          </div>
        {/each}
        <div class="spacer" />
      </Scrolly>
    </div>
    <div class="charts-container">
      <div class="chart-one">
        <svg id="chart1" viewBox="0 0 300 150" xmlns="http://www.w3.org/2000/svg">
          <!-- Tennis Court Lines -->
          <line x1="15%" y1="-150%" x2="15%" y2="150%" stroke="white" stroke-width="2"/> <!-- left vertical -->
          <line x1="85%" y1="-150%" x2="85%" y2="150%" stroke="white" stroke-width="2"/> <!-- right vertical -->
          <line x1="15%" y1="40%" x2="85%" y2="40%" stroke="white" stroke-width="2"/> <!-- middle horizontal -->
          <line x1="50%" y1="150%" x2="50%" y2="40%" stroke="white" stroke-width="2"/> <!-- center vertical -->
          <line x1="50%" y1="-150%" x2="50%" y2="-10%" stroke="white" stroke-width="2"/> <!-- short vertical -->
        </svg>
      </div>
      <div class="chart-two">
        <svg id="chart2" viewBox="0 0 300 150" xmlns="http://www.w3.org/2000/svg">
          <!-- Tennis Court Lines -->
          <line x1="15%" y1="-150%" x2="15%" y2="150%" stroke="white" stroke-width="2"/> <!-- left vertical -->
          <line x1="85%" y1="-150%" x2="85%" y2="150%" stroke="white" stroke-width="2"/> <!-- right vertical -->
          <line x1="15%" y1="60%" x2="85%" y2="60%" stroke="white" stroke-width="2"/> <!-- middle horizontal -->
          <line x1="50%" y1="-150%" x2="50%" y2="60%" stroke="white" stroke-width="2"/> <!-- center vertical -->
          <line x1="50%" y1="150%" x2="50%" y2="110%" stroke="white" stroke-width="2"/> <!-- short vertical -->
        </svg>
      </div>
    </div>
  </div>
  <br /><br />
  <!-- <p class="body-text">And that's the end of our scrolly.</p> -->
</section>

<style>
  #chart1,
  #chart2 {
    width: 100%;
    height: 100%;
  }
  .chart-one {
    width: 100%;
    height: 100%;
    border: 3px solid rgb(255, 255, 255);
  }
  .chart-two {
    width: 100%;
    height: 100%;
    border: 3px solid rgb(255, 255, 255);
  }
  /* space after scroll is finished */
  .spacer {
    height: 40vh;
  }

  .charts-container {
    position: sticky;
    top: 3%;
    display: grid;
    width: 35%;
    margin-right: 10%;
    grid-template-columns: 100%;
    grid-row-gap: 0.5rem;
    grid-column-gap: 0rem;
    grid-template-rows: repeat(2, 1fr);
    height: 95vh;
    border: 3px solid black;
  }

  .section-container {
    margin-top: 1em;
    text-align: center;
    transition: background 100ms;
    display: flex;
  }

  .step {
    height: 110vh;
    display: flex;
    place-items: center;
    justify-content: center;
  }

  .step-content {
    font-size: 18px;
    background: var(--bg);
    color: #ccc;
    border-radius: 1px;
    padding: 0.5rem 1rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    transition: background 500ms ease;
    text-align: left;
    width: 75%;
    margin: auto;
    max-width: 500px;
    font-family: var(--font-main);
    line-height: 1.3;
    border: 5px solid var(--default);
  }

  .step.active .step-content {
    background: #f1f3f3ee;
    color: var(--squid-ink);
  }

  .steps-container {
    height: 100%;
  }

  .steps-container {
    flex: 1 1 40%;
    z-index: 10;
  }

  /* Comment out the following line to always make it 'text-on-top' */
  @media screen and (max-width: 950px) {
    .section-container {
      flex-direction: column-reverse;
    }

    .steps-container {
      pointer-events: none;
    }

    .charts-container {
      top: 7.5%;
      width: 95%;
      margin: auto;
    }

    .step {
      height: 130vh;
    }

    .step-content {
      width: 95%;
      max-width: 768px;
      font-size: 17px;
      line-height: 1.6;
    }

    .spacer {
      height: 100vh;
    }
  }
</style>

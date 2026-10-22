// Align paired chart content after SVG legends and fonts have loaded.
function alignChartCards() {
  var rows = document.querySelectorAll(".chart-row");
  rows.forEach(function(row) {
    var cards = Array.from(row.children);
    var selectors = ["h3", "p.short-copy:not(.finding):not(.note)",
      ".chart", ".time-controls, .bump-controls", ".finding", ".note"];
    selectors.forEach(function(selector) {
      var elements = cards.map(function(card) {
        return card.querySelector(selector);
      }).filter(function(element) { return element !== null; });
      elements.forEach(function(element) { element.style.minHeight = ""; });
      if (window.innerWidth < 1280 || elements.length < 2) return;
      var height = Math.ceil(Math.max.apply(null, elements.map(function(element) {
        return element.getBoundingClientRect().height;
      })));
      elements.forEach(function(element) { element.style.minHeight = height + "px"; });
    });
  });
}

function scheduleChartAlignment() {
  window.requestAnimationFrame(alignChartCards);
}

function embedChart(selector, specification, options) {
  return vegaEmbed(selector, specification, Object.assign({
    renderer: "svg",
    actions: true
  }, options || {}));
}

window.addEventListener("load", scheduleChartAlignment);
var chartAlignmentTimer;
window.addEventListener("resize", function() {
  clearTimeout(chartAlignmentTimer);
  chartAlignmentTimer = setTimeout(scheduleChartAlignment, 180);
});
if (document.fonts && document.fonts.ready) {
  document.fonts.ready.then(scheduleChartAlignment);
}

var vg_1 = "js/proportional_symbol_map.vg.json";
embedChart("#symbol_map", vg_1).then(function(result) {
  scheduleChartAlignment();
}).catch(console.error);

var vg_2 = "js/choropleth_richness.vg.json";
embedChart("#richness_map", vg_2).then(function(result) {
  scheduleChartAlignment();
}).catch(console.error);

var vg_3 = "js/top_species_lollipop.vg.json";
embedChart("#species_lollipop", vg_3).then(function(result) {
  scheduleChartAlignment();
}).catch(console.error);

var vg_4 = "js/seasonal_heatmap.vg.json";
embedChart("#seasonal_heatmap", vg_4).then(function(result) {
  scheduleChartAlignment();
}).catch(console.error);

var vg_5 = "js/selected_species_lines.vg.json";
embedChart("#species_lines", vg_5, {bind: "#species_filter"}).then(function(result) {
  scheduleChartAlignment();
  var months = ["January", "February", "March", "April", "May", "June", "July", "August"];
  var playButton = document.getElementById("time_play");
  var monthSlider = document.getElementById("time_month");
  var monthLabel = document.getElementById("time_label");
  var timer = null;

  function showMonth(month) {
    monthSlider.value = month;
    monthLabel.value = months[month - 1];
    result.view.signal("Playback_month", month).runAsync().catch(console.error);
  }

  function stopPlayback() {
    if (timer !== null) {
      clearInterval(timer);
      timer = null;
    }
    playButton.textContent = "Play";
    playButton.setAttribute("aria-label", "Play monthly sightings");
  }

  monthSlider.addEventListener("input", function() {
    stopPlayback();
    showMonth(Number(monthSlider.value));
  });

  playButton.addEventListener("click", function() {
    if (timer !== null) {
      stopPlayback();
      return;
    }
    var next = Number(monthSlider.value) >= 8 ? 1 : Number(monthSlider.value) + 1;
    showMonth(next);
    playButton.textContent = "Pause";
    playButton.setAttribute("aria-label", "Pause monthly sightings");
    timer = setInterval(function() {
      if (Number(monthSlider.value) >= 8) {
        stopPlayback();
      } else {
        showMonth(Number(monthSlider.value) + 1);
      }
    }, 750);
  });
}).catch(console.error);

var vg_6 = "js/monthly_species_bump.vg.json";
embedChart("#species_bump", vg_6, {bind: "#bump_filter"}).then(function(result) {
  scheduleChartAlignment();
}).catch(console.error);

var vg_7 = "js/grid_species_richness.vg.json";
embedChart("#grid_richness", vg_7, {bind: "#grid_filter"}).then(function(result) {
  var summaryCount = document.getElementById("grid_summary_count");

  function updateGridSummary(name, cells) {
    var richerCells = cells.filter(function(cell) {
      return cell.properties.expected_species_per_500 > 100;
    });
    summaryCount.textContent = richerCells.length.toLocaleString("en-AU") +
      " of " + cells.length.toLocaleString("en-AU") + " qualifying cells";
  }

  result.view.addDataListener("grid_cells", updateGridSummary);
  updateGridSummary("grid_cells", result.view.data("grid_cells"));
  scheduleChartAlignment();
}).catch(console.error);

var vg_8 = "js/iconic_species_repeat.vg.json";
fetch(vg_8).then(function(response) {
  return response.json();
}).then(function(specification) {
  var container = document.getElementById("iconic_dotmaps");
  var previousWidth = 0;
  var mapView = null;
  var resizeTimer;

  function drawDotMaps() {
    var style = window.getComputedStyle(container);
    var availableWidth = container.clientWidth - parseFloat(style.paddingLeft) - Math.max(38, parseFloat(style.paddingRight));
    if (Math.abs(availableWidth - previousWidth) < 2) return;
    previousWidth = availableWidth;
    var columns = availableWidth >= 620 ? 2 : 1;
    var mapWidth = Math.max(180, Math.min(columns === 2 ? 520 : 580,
      Math.floor((availableWidth - 20 - (columns - 1) * 20) / columns)));
    var spec = JSON.parse(JSON.stringify(specification));
    spec.columns = columns;
    spec.config.concat.spacing = 20;
    spec.spec.width = mapWidth;
    spec.spec.height = Math.round(mapWidth * 300 / 350);
    spec.spec.projection.scale = 370 * mapWidth / 350;
    spec.spec.projection.translate = [mapWidth / 2, 160 * mapWidth / 350];
    spec.spec.layer[2].mark.x = mapWidth / 2;
    spec.spec.layer[3].mark.x = mapWidth / 2;
    spec.spec.layer[3].mark.y = spec.spec.height + 6;
    if (mapView) mapView.finalize();
    embedChart("#iconic_dotmaps", spec).then(function(result) {
  scheduleChartAlignment();
      mapView = result.view;
    }).catch(console.error);
  }

  drawDotMaps();
  window.addEventListener("resize", function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(drawDotMaps, 150);
  });
}).catch(console.error);

var vg_9 = "js/summer_winter_connected_dots.vg.json";
embedChart("#summer_winter_dots", vg_9, {bind: "#season_compare_filter"}).then(function(result) {
  scheduleChartAlignment();
}).catch(console.error);

var vg_10 = "js/state_species_heatmap.vg.json";
embedChart("#state_species_heatmap", vg_10).then(function(result) {
  scheduleChartAlignment();
}).catch(console.error);

var vg_11 = "js/grid_richness_boxplot.vg.json";
embedChart("#grid_richness_boxplot", vg_11).then(function(result) {
  scheduleChartAlignment();
}).catch(console.error);

var vg_12 = "js/effort_vs_richness.vg.json";
embedChart("#effort_richness", vg_12, {bind: "#state_scatter_filter"}).then(function(result) {
  scheduleChartAlignment();
}).catch(console.error);

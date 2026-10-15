var vg_1 = "proportional_symbol_map.vg.json";
vegaEmbed("#symbol_map", vg_1, {renderer: "svg"}).then(function(result) {
}).catch(console.error);

var vg_2 = "choropleth_richness.vg.json";
vegaEmbed("#richness_map", vg_2, {renderer: "svg"}).then(function(result) {
}).catch(console.error);

var vg_3 = "top_species_lollipop.vg.json";
vegaEmbed("#species_lollipop", vg_3, {renderer: "svg"}).then(function(result) {
}).catch(console.error);

var vg_4 = "seasonal_heatmap.vg.json";
vegaEmbed("#seasonal_heatmap", vg_4, {renderer: "svg"}).then(function(result) {
}).catch(console.error);

var vg_5 = "selected_species_lines.vg.json";
vegaEmbed("#species_lines", vg_5, {renderer: "svg", bind: "#species_filter"}).then(function(result) {
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

var vg_6 = "monthly_species_bump.vg.json";
vegaEmbed("#species_bump", vg_6, {renderer: "svg", bind: "#bump_filter"}).then(function(result) {
}).catch(console.error);

var vg_7 = "grid_species_richness.vg.json";
vegaEmbed("#grid_richness", vg_7, {renderer: "svg", bind: "#grid_filter"}).then(function(result) {
}).catch(console.error);

var vg_8 = "iconic_species_repeat.vg.json";
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
    if (mapView) mapView.finalize();
    vegaEmbed("#iconic_dotmaps", spec, {renderer: "svg"}).then(function(result) {
      mapView = result.view;
    }).catch(console.error);
  }

  drawDotMaps();
  window.addEventListener("resize", function() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(drawDotMaps, 150);
  });
}).catch(console.error);

var vg_9 = "summer_winter_connected_dots.vg.json";
vegaEmbed("#summer_winter_dots", vg_9, {renderer: "svg", bind: "#season_compare_filter"}).then(function(result) {
}).catch(console.error);

var vg_10 = "state_species_heatmap.vg.json";
vegaEmbed("#state_species_heatmap", vg_10, {renderer: "svg"}).then(function(result) {
}).catch(console.error);

var vg_11 = "grid_richness_boxplot.vg.json";
vegaEmbed("#grid_richness_boxplot", vg_11, {renderer: "svg"}).then(function(result) {
}).catch(console.error);

var vg_12 = "effort_vs_richness.vg.json";
vegaEmbed("#effort_richness", vg_12, {renderer: "svg"}).then(function(result) {
}).catch(console.error);

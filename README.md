# Australian Birds — FIT3179 DV2

The dashboard contains twelve Vega-Lite charts. The four repeated maps count as one chart. The project follows the tutorial file structure: `index.html`, `styles.css`, `vega_lite_vis.js`, separate `*.vg.json` specifications and local files in `data/`.

## One shared focus group

The same four birds connect all species comparisons, in this order:

1. Australian Magpie — blue (`#2876ae`)
2. Rainbow Lorikeet — orange (`#c17b16`)
3. Superb Fairy-wren — purple (`#67459b`)
4. Galah — gold (`#9b7900`)

All four belong to the national top 12. The lollipop retains all 12 and highlights these four with coloured dots and bold labels. The monthly heatmap retains the same 12 and identifies the focus birds with bold labels. Both monthly trend charts, the four location maps, the seasonal comparison and the state–species heatmap use this exact group.

The bump chart keeps each bird's rank among all 12 species; it does not recalculate ranks among only four. Aggregate state totals, richness maps, grid-cell box plots and the effort/richness scatterplot describe the broader dataset.

## Preview and interaction

Extract the ZIP, open `australian_birds_dv22` in VS Code, and run **Open with Live Server** on `index.html`. Keep the JSON specifications and `data/` folder together. Internet access is used for the Vega libraries, Pure.css and web fonts.

- The line and bump charts each have a four-species dropdown. The bump chart always shows January–August and has no time slider. Playback and the month slider belong to the line chart.
- The line chart also has play/pause and a January–August slider; its axes remain fixed during playback.
- The grid map has a minimum-records slider from 500 to 10,000.
- The seasonal chart offers a species highlight dropdown while keeping all four rows visible.
- The scatterplot has smaller solid dots and a state dropdown. Selecting a state isolates its point on fixed axes, retaining true positions without jitter.
- Other charts provide hover details. The two overview charts retain all 12 species for a consistent comparison.

Vega-Embed's three-dot action menu is available. The shared `embedChart` function loads each specification and converts its data URLs to full URLs based on the current webpage. This includes nested lookup data and the repeated maps. **Open in Vega Editor** therefore receives data URLs pointing back to the published website. Keep the `data/` folder publicly accessible alongside `index.html`. The JSON files retain portable relative paths; if you paste a raw JSON file directly into Vega Editor, replace those paths with public absolute URLs first. A local JSON file can also be inspected with the VS Code Vega preview extension.

## Layout and typography

Page sections and paired chart cards share outer sight lines. Paired cards have a 24 px gutter and stack below 1280 px. The repeated location maps use two columns and two rows where space permits; narrow screens show one column. The maps remain one Vega-Lite `repeat` specification. A small resize handler adjusts map dimensions and projection settings without shrinking their title text. Map dots use 16 square-pixel symbols at full opacity to reduce overlap; the represented record counts and sampled coordinates are unchanged.

Other charts use container widths and `fit-x` sizing to keep axes and labels readable. Fraunces is used for page headings and DM Sans for body and chart text. White chart cards, blue findings and subdued notes establish visual hierarchy. Blue data marks identify Australian Magpie; aggregate state marks use slate grey. Species marks and legend symbols use full opacity so their category colours match. The seasonal comparison uses dark circles for January–February and light grey diamonds for June–August, with a shared colour/shape legend. Box plots use neutral greys. Interface blue is decorative rather than a data category. Red/green category pairings are avoided; green is used as a sequential richness scale.

Narrative text uses authored lines of at most ten words. Longer descriptions use two balanced columns where space permits, with stacked text on narrow screens. Introductory and concluding paragraphs follow the same two-column pattern. Key figures, rate definitions and interpretation notes remain visible.

## Data and methods

The supplied ALA eBird Australia extract contains 5,243,949 retained observation records dated January–August 2025. Six records with unknown state are excluded from mapped state totals (5,243,943). September–December have no records in the supplied extract and are not treated as zero bird activity. Records count sightings, regardless of `individualCount`.

State boundaries are simplified ABS 2026 geometry. The state richness choropleth starts with its CSV and looks up geometry in `states.topojson`. It compares mean distinct species in 200 samples of 100,000 records per state. Grid-cell maps and box plots describe expected richness in 500 records per qualifying 1° cell. Equal record counts do not eliminate observer or location bias.

Monthly and seasonal rates are records per 10,000 submitted records in the relevant month or period. Seasonal comparisons use January–February and June–August. State species rates use records per 1,000 state records. All four focus birds' seasonal counts and state rates were calculated from the original cleaned archive's `species_month.csv`, `month_summary.csv`, `state_species.csv` and `state_summary.csv`.

The four location maps use actual positions reservoir-sampled from the original `cleaned_observations.csv.gz`, retaining rows marked `map_usable=1`. Scientific names identify the species. One dot represents approximately 1,000 records; the sampled dots are not individual birds. The target count is the rounded number of usable records divided by 1,000: 130 Magpie dots, 113 Lorikeet dots, 86 Fairy-wren dots and 75 Galah dots. Fixed random seeds 2025–2028 make the sample reproducible. The wide CSV has one size field per species (38 for that row's species, 0 for the others) for the repeat operator. The full occurrence archive is excluded to keep the page download small.

`data/focus_species_methods.json` records the source totals and sampling details. Chart callouts and highlighted paragraphs describe source-supported findings and retain the distinction between observation rates and bird populations.

## Story and submission

Section 07 uses Rainbow Lorikeet as a case study connecting the ranking, map, state and seasonal views. Section 08 concludes the story and Section 09 links the ALA and ABS sources.

Authorship is listed in Section 09. Before submission, provide the public GitHub Pages URL and sketch PDF, and add the ALA download-specific DOI if available.

Box and whisker tooltips explicitly name the minimum, quartiles, median and maximum. Individual grid-cell dots retain their own readable tooltip labels. Atlas of Living Australia (ALA) is expanded on first use.

The monthly heatmap highlights the four focus birds through bold labels without cell borders. The grid map draws state boundaries and the coastline again above the grid cells, using an unfilled geoshape layer. Coastal cells retain their complete 1° footprint.

Paired state-map headings, introductory paragraphs, chart frames, findings and notes have matched minimum heights after charts and fonts load. Heights are recalculated on resize and released when the cards stack below 1280 pixels. This accommodates the different heights of symbol and gradient legends without clipping either chart.

Display labels use full month names, full state and territory names, comma-separated numbers and full source-organisation names. Source tables retain their original keys and short codes; chart transforms derive expanded labels without changing data. State-axis labels wrap by word, and month labels rotate to fit.

Annotations report computed comparisons: the Queensland–New South Wales gap, the January–August Fairy-wren rate change, the March–July Galah rank change, the Northern Territory–Tasmania richness contrast, seasonal rate changes and the highest grid-cell median. They describe recording rates or recorded richness rather than population change or causation.

The grid-cell box plot uses explicit rule, bar and tick layers with identical state-level minimum, quartile, median and maximum summaries. This preserves the boxplot definition while preventing automatic composite-mark tooltips from exposing field names.

Both recording-rate heatmaps use the same teal sequential palette, independently scaled for their clearly labelled units. Monthly rates use the fixed domain 0–300 records per 10,000; state rates use 0–45 per 1,000. Richness maps retain their green palette. Purple is reserved for Superb Fairy-wren in categorical species comparisons. All five numeric legends have explicit domains; species legends have fixed category domains.

Categorical legend symbols share area 100, full opacity and no outline. Recording-period shapes remain circle and diamond. The proportional-symbol legend intentionally varies circle area with record count. Scatterplot state names sit beside their actual points, using small text offsets and no leader lines. Record totals and richness values stay unchanged. Heatmap legend titles explicitly distinguish monthly and state rates.

Colour meaning follows the encoded measure: green represents species richness (distinct species), while teal represents recording frequency in both heatmaps. A species name on an axis does not make a rate heatmap a species-richness chart.


## Findings in every chart

All twelve charts include an on-chart finding. The repeated map has one finding per species panel. These are comparisons and patterns supported by the supplied data, not explanations of ecological causes.

| Chart | Finding |
| --- | --- |
| State record map | Queensland and New South Wales contribute 54% of mapped records. |
| State richness map | Queensland exceeds New South Wales by 86.5 species per 100,000 records. |
| Lollipop | Australian Magpie exceeds Magpie-lark by 14,155 records, or 12%. |
| Monthly heatmap | Australian Magpie leads all eight months and peaks in March. |
| Monthly lines | January-to-current-month rate change for the selected species; default Superb Fairy-wren. |
| Bump chart | Galah rises from rank 12 in March to 7 in July; selected species show their rank span. |
| Grid richness map | At the initial threshold, 194 of 346 cells exceed 100 expected species in 500 records. Counts update with the threshold. |
| Repeated location maps | Proportion of sampled dots east of longitude 140 degrees: Magpie 93%, Lorikeet 98%, Fairy-wren 99%, Galah 84%. These describe the samples, not the complete records or species ranges. |
| Seasonal comparison | Fairy-wren has a 24% lower winter recording rate; Lorikeet has a 4% higher winter recording rate. |
| State species heatmap | Lorikeet’s New South Wales rate is 7.3 times its Tasmania rate. |
| Grid-cell box plots | Victoria has the highest median, about 115 species in 500 records. |
| Effort scatterplot | Northern Territory records 115 more species than Tasmania despite fewer records; a selected state shows its share of mapped records. |

Do not infer that habitat, migration or population differences caused these patterns from these aggregate tables alone. Such explanations would need separate supporting evidence. Geographic location, recording effort and species reporting can all influence observation records.


## Annotation placement

Point-specific notes now use data coordinates: monthly endpoints, the leading lollipop, the Victoria median and the richest qualifying grid cell. The heatmaps label the peak or compared cells. Both state maps name Queensland and New South Wales on their geography. Repeated location maps show the 140° east reference meridian used by their sampled-dot percentages. Scatter labels show the compared richness values beside the real points, without leader lines or jitter.

Whole-chart findings remain captions rather than pointers to arbitrary marks. The 54% two-state share, the 86.5-species state gap, the eight-month Magpie lead, the Lorikeet state-rate comparison and the scatter's 115-species contrast remain visible beside their charts. The grid's qualifying-cell count is below the map and updates with its threshold. No source data or species palette changed.


## CSV parsing and boxplot correction

Numeric CSV fields are explicitly parsed at the data source before aggregation, ranking or sampling annotations. Without this, min/max could compare strings lexicographically: Victoria’s caps incorrectly appeared at 100.3 and 90.1. The correct range is 38.8–132.6, and its median is 115.15. Queensland’s correct range is 19.0–147.0; New South Wales is 67.5–147.2. Source CSV bytes are unchanged.

The boxplot draws smaller, lighter jittered points behind its summaries, with a limited horizontal spread. Lower and upper whiskers stop at their respective quartiles, capped at the true minimum and maximum. Median ticks are darker. Its comparison note occupies empty space above the data and reports Victoria’s roughly 30-species median advantage over Tasmania. Australian Capital Territory still has two dots only.

The lollipop and seasonal comparison notes have greater vertical clearance from their data lines. The scatterplot’s Northern Territory note states the 115-species contrast rather than merely repeating its value. Selected-state shares are incorporated into the point’s own label to avoid duplicate labels overlapping. State map labels and the adjacent comparisons are preserved.


## Annotation typography

Finding annotations consistently use DM Sans at 12 pixels, weight 700 (bold), with 14-pixel line spacing. This applies to comparison callouts, selected-state findings, highlighted map labels, grid-cell findings, repeated-map findings and highlighted heatmap values. Ordinary data labels and geographic reference labels retain their supporting roles. White text remains on darker heatmap cells for contrast.

The monthly heatmap's two-line peak note is centred as a complete text block within the March/Australian Magpie cell. The boxplot comparison uses three short, centred lines above Victoria's box. The numeric parsing fix, summary values and source data are preserved.

+
+## Plain annotation text
+
+All text halos and duplicate text-outline layers have been removed. Finding annotations retain DM Sans, 12 pixels, weight 700 and 14-pixel line spacing. White text is used where a dark map or heatmap background needs it; lighter backgrounds use navy text. This changes contrast without adding an outline or shadow. Ordinary data marks retain their own strokes.
+
+
+## Webpage text hierarchy
+
+Each text role has one consistent style across sections. Body paragraphs, section introductions and finding-panel text use DM Sans, 16 pixels, weight 400 and line-height 1.65. Strong findings retain weight 700. Notes and footer text use 14 pixels. Section labels use 13 pixels, and controls use 14 pixels.
+
+The page title uses Fraunces 64 pixels, section headings Fraunces 34 pixels, and chart headings DM Sans 21 pixels at weight 600. Existing mobile rules adjust all headings of the same level together. The introductory question remains a distinct 27-pixel standfirst. Summary figures in both the introduction and case study use DM Sans 32 pixels at weight 700; their descriptions use the same 16-pixel body style. On-chart finding annotations retain their established 12-pixel bold style.
+
+This removes the previous mismatch between the 16-pixel introductory body copy and the 18-pixel section-introduction copy, including their different text colours. Chart specifications, data, annotations and map-label placement are unchanged by this webpage typography revision.
+
## Small-sample note and period legend
The Australian Capital Territory dots have a data-derived qualifying-cell count annotation. The seasonal comparison legend uses two vertically spaced entries to avoid crowding.

## Case-study card alignment
Case-study cards use equal-height grid columns and matching figure, description and context rows. The national record card now has two description lines. Cards stack below 1024 pixels to keep the figures readable.

The Capital Territory annotation now explains that its box is omitted because only two cells qualify, and is positioned below those dots with extra clearance on narrow screens.

## Consistent chart containers
All twelve visualisations now have a chart-block article containing the chart heading, explanatory text, visualisation, controls and notes. Section headings remain outside chart cards. The scatter-plot state filter now appears above the plot, matching the other standalone filters.

## Tutorial folder structure
Following Week 8 pages 19 and 30, all JavaScript and twelve Vega-Lite JSON specifications are in js/. Following the Week 5 page 18 suggestion, the stylesheet is in css/. HTML remains at the project root and datasets remain in data/. Specification data URLs resolve against the root embedding page. Playback and responsive sizing/alignment are custom additions beyond the tutorial examples.

## Axis clearance and comparison value
The state-species heatmap reserves 150 pixels for full species labels. The scatter-plot Tasmania name remains a regular label; its 233-species comparison value uses a separate DM Sans 12-pixel, weight-700 text layer.

## Submission review fixes
The Sources section retains compact linked titles, with one short line for the eBird observation period and the simplified 2026 boundary data. ChatGPT/OpenAI assistance is acknowledged after Sources and before Authorship. The seasonal-comparison axis title uses two short lines. The grid-map peak annotation uses plain navy text in space above the map, with a rule pointing to the actual peak cell; its value and locator continue to respond to the minimum-records filter.

The AI acknowledgement follows the DV1 two-column structure, naming ChatGPT/OpenAI, describing DV2 code assistance and review, and summarising prompt purposes without inventing verbatim prompt quotations or claiming unaided implementation.

## Grid-map finding panel
The qualifying-cell summary is now a live HTML finding panel below the map, using the same blue background, accent border and text hierarchy as the other chart findings. Its former text layer below the legend has been removed. A data listener updates the count from the chart's filtered grid_cells dataset whenever the minimum-records slider changes. The peak-cell callout remains on the map.

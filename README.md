# Australian Birds — FIT3179 DV2

The dashboard contains twelve Vega-Lite charts. The four repeated maps count as one chart. The project follows the tutorial file structure: `index.html`, `styles.css`, `vega_lite_vis.js`, separate `*.vg.json` specifications and local files in `data/`.

## One shared focus group

The same four birds connect all species comparisons, in this order:

1. Australian Magpie — blue (`#2876ae`)
2. Rainbow Lorikeet — orange (`#c17b16`)
3. Superb Fairy-wren — purple (`#67459b`)
4. Galah — gold (`#9b7900`)

All four belong to the national top 12. The lollipop retains all 12 and highlights these four with coloured dots and bold labels. The monthly heatmap retains the same 12 and identifies the focus birds with bold labels and blue outlines. Both monthly trend charts, the four location maps, the seasonal comparison and the state–species heatmap use this exact group.

The bump chart keeps each bird's rank among all 12 species; it does not recalculate ranks among only four. Aggregate state totals, richness maps, grid-cell box plots and the effort/richness scatterplot describe the broader dataset.

## Preview and interaction

Extract the ZIP, open `australian_birds_dv22` in VS Code, and run **Open with Live Server** on `index.html`. Keep the JSON specifications and `data/` folder together. Internet access is used for the Vega libraries, Pure.css and web fonts.

- The line and bump charts offer the same four-species dropdowns.
- The line chart also has play/pause and a January–August slider; its axes remain fixed during playback.
- The grid map has a minimum-records slider from 500 to 10,000.
- The seasonal chart offers a species highlight dropdown while keeping all four rows visible.
- Other charts provide hover details. The two overview charts retain all 12 species for a consistent comparison.

Vega-Embed's three-dot action menu is available. **Open in Vega Editor** opens the specification, but the editor will need publicly accessible absolute URLs to load files currently referenced by local `data/` paths. A local JSON file can also be inspected with the VS Code Vega preview extension.

## Layout and typography

Page sections and paired chart cards share outer sight lines. Paired cards have a 24 px gutter and stack below 1280 px. The repeated location maps use two columns and two rows where space permits; narrow screens show one column. The maps remain one Vega-Lite `repeat` specification. A small resize handler adjusts map dimensions and projection settings without shrinking their title text.

Other charts use container widths and `fit-x` sizing to keep axes and labels readable. Fraunces is used for page headings and DM Sans for body and chart text. White chart cards, blue findings and subdued notes establish visual hierarchy. Red/green category pairings are avoided; green is used as a sequential richness scale.

## Data and methods

The supplied ALA eBird Australia extract contains 5,243,949 retained observation records dated January–August 2025. Six records with unknown state are excluded from mapped state totals (5,243,943). September–December have no records in the supplied extract and are not treated as zero bird activity. Records count sightings, regardless of `individualCount`.

State boundaries are simplified ABS 2026 geometry. The state richness choropleth starts with its CSV and looks up geometry in `states.topojson`. It compares mean distinct species in 200 samples of 100,000 records per state. Grid-cell maps and box plots describe expected richness in 500 records per qualifying 1° cell. Equal record counts do not eliminate observer or location bias.

Monthly and seasonal rates are records per 10,000 submitted records in the relevant month or period. Seasonal comparisons use January–February and June–August. State species rates use records per 1,000 state records. All four focus birds' seasonal counts and state rates were calculated from the original cleaned archive's `species_month.csv`, `month_summary.csv`, `state_species.csv` and `state_summary.csv`.

The four location maps use actual positions reservoir-sampled from the original `cleaned_observations.csv.gz`, retaining rows marked `map_usable=1`. Scientific names identify the species. One dot represents approximately 1,000 records; the sampled dots are not individual birds. The target count is the rounded number of usable records divided by 1,000: 130 Magpie dots, 113 Lorikeet dots, 86 Fairy-wren dots and 75 Galah dots. Fixed random seeds 2025–2028 make the sample reproducible. The wide CSV has one size field per species (38 for that row's species, 0 for the others) for the repeat operator. The full occurrence archive is excluded to keep the page download small.

`data/focus_species_methods.json` records the source totals and sampling details. Chart callouts and highlighted paragraphs describe source-supported findings and retain the distinction between observation rates and bird populations.

## Story and submission

Section 07 uses Rainbow Lorikeet as a case study connecting the ranking, map, state and seasonal views. Section 08 concludes the story and Section 09 links the ALA and ABS sources.

Before submission, replace the author placeholder in the footer, provide the public GitHub Pages URL and sketch PDF, and add the ALA download-specific DOI if available. The footer acknowledges assistance from OpenAI Codex.

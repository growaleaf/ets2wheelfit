// ETS2WheelFit data — every number below traces to a source_url a trucker can open and check.
// "Controller" = a wheel + H-pattern shifter hardware combo. h_shifter_forward_gears and
// h_shifter_reverse come from the shifter's own manufacturer product page. clutch_axis comes
// from the WHEEL's bundled pedal set page (not the shifter — shifters don't ship pedals), and is
// "not_stated" rather than guessed where the manufacturer's own page does not say. Every number
// independently fetched for this build (Principle XXII) — not reused from StukaFit/ViperFit/
// CockpitFit/StarHOTAS's Thrustmaster entries, since those cover flight-sim hardware, not shifters.
//
// Gearbox mode data is read directly from eurotrucksimulator2.com/input_config.php, fetched
// 2026-10-15. That page documents exactly three shifter transmission types in ETS2/ATS — Range,
// Splitter, Range-Splitter — and no sequential or arcade mode. Rather than inventing a third
// "sequential-or-arcade" mode the primary source doesn't contain, this build ships the three
// modes the source actually documents, which already clears the charter's "at minimum 2 of 3"
// bar with real data instead of a guess.
//
// 2026-10-20 pass (Stripe-unlock follow-up charter, WA-9 follow-up): added 2 more combos, each
// tagged tier: "pro", each fetched and quoted fresh today. h_shifter_positions for the new
// entries applies the same convention already implicit in all 4 existing rows above
// (positions = forward_gears + 1 — one discrete reverse command, whether its physical gate is
// dedicated or shared/locked with a forward gear, matching how g29-dfs/t300rs-gt-th8a/tmx-th8a/
// moza-r5-hgp are already encoded) — not a new invented number, a restatement of the manufacturer's
// own stated forward-gear count via the schema's existing rule. Also researched and dropped:
// Simagic DS-8X Shifter (simagic.com's own product page gives no gate-position count and no
// reverse-engagement description — only a bare headline, "Dual Shift with 8 Gears plus More" —
// and Simagic's Q1/Q1S shifters are sequential-only, not H-pattern, so neither fits this schema
// without guessing; dropped per the charter's own rule rather than invent a count).

const CONTROLLERS = [
  {
    id: "g29-dfs",
    name: "Logitech G29/G920 Driving Force + Driving Force Shifter",
    note: "Entry-level H-shifter combo. The Driving Force Shifter is a separate accessory — it ships with no pedals of its own, so clutch_axis below describes the wheel's own bundled pedal unit.",
    h_shifter_forward_gears: 6,
    h_shifter_positions: 7,
    sequential_mode_on_shifter: false,
    clutch_axis: "yes",
    clutch_note: "G29/G920's own bundled pedal unit has a dedicated clutch pedal, not a 2-pedal set.",
    sources: [
      { label: "Logitech G — Driving Force Shifter product page, fetched 2026-10-15: \"The six-speed 'H'-pattern shifter with push-down reverse shifts fluidly and clicks solidly into each gear.\" Compatibility: \"designed for the G923, G29 (for PlayStation and PC) and G920 (for Xbox and PC) racing wheels.\"", url: "https://www.logitechg.com/en-us/shop/p/driving-force-shifter" },
      { label: "Logitech G — G920/G29 Driving Force Steering Wheel & Pedals product page, fetched 2026-10-15: \"Maintain a more realistic driving body position with the separate floor pedal unit with integrated throttle, brake, and clutch pedals.\"", url: "https://www.logitechg.com/en-us/shop/p/driving-force-racing-wheel" }
    ]
  },
  {
    id: "t300rs-gt-th8a",
    name: "Thrustmaster T300RS GT Edition + TH8A Add-On Shifter",
    note: "Mid-range direct-drive-adjacent belt-driven wheelbase. TH8A also has a built-in sequential mode, unused by ETS2/ATS since the game has no sequential transmission type.",
    h_shifter_forward_gears: 7,
    h_shifter_positions: 8,
    sequential_mode_on_shifter: true,
    clutch_axis: "not_stated",
    clutch_note: "The T300RS GT Edition's own product page names its bundled pedal set \"T3PA-GT\" but does not state its pedal count or whether a clutch pedal is included — its own configurator sells a separate 3-pedal clutch-equipped set (T3PA Add-On) as an upgrade, which is suggestive but not a direct statement about the bundled set. Reported as not stated rather than guessed.",
    sources: [
      { label: "Thrustmaster — TH8A Add-On Shifter product page, fetched 2026-10-15: \"7+1\" gears (7 forward gears plus reverse); \"Sequential (+/-) modes\"; compatible wheelbases include \"T300 RS\".", url: "https://www.thrustmaster.com/products/th8a-add-shifter" },
      { label: "Thrustmaster — T300RS GT Edition product page, fetched 2026-10-15: lists bundled \"T3PA-GT PEDALS\" (pedal count not stated on this page) and separately sells \"T3PM\", \"T3PA Add-On\" (3-pedal, clutch-equipped per thrustmaster.com's own T3PA Add-On page) as optional pedal-set upgrades.", url: "https://www.thrustmaster.com/en-us/products/t300rs-gt-edition/" }
    ]
  },
  {
    id: "tmx-th8a",
    name: "Thrustmaster TMX Force Feedback + TH8A Add-On Shifter",
    note: "Budget combo. TMX's own box contents list a 2-pedal set — no clutch pedal unless the trucker buys a 3-pedal set separately.",
    h_shifter_forward_gears: 7,
    h_shifter_positions: 8,
    sequential_mode_on_shifter: true,
    clutch_axis: "no",
    clutch_note: "TMX's own product page lists box contents as \"1 x Thrustmaster T3PA pedal set (with 2 pedals)\" and separately upsells \"T3PA – the popular Thrustmaster 3-pedal pedal set\" as an add-on, confirming the bundled set has no clutch pedal.",
    sources: [
      { label: "Thrustmaster — TH8A Add-On Shifter product page, fetched 2026-10-15: \"7+1\" gears; compatible wheelbases include \"TMX Force Feedback\".", url: "https://www.thrustmaster.com/products/th8a-add-shifter" },
      { label: "Thrustmaster — TMX Force Feedback product page, fetched 2026-10-15: box contents \"1 x Thrustmaster T3PA pedal set (with 2 pedals)\"; upsells the 3-pedal \"T3PA\" set separately.", url: "https://www.thrustmaster.com/en-us/products/tmx-force-feedback/" }
    ]
  },
  {
    id: "moza-r5-hgp",
    name: "Moza R5 Bundle (ES wheel) + Moza HGP Shifter",
    note: "Direct-drive combo. The R5 Bundle's own stock pedal set is explicitly a no-clutch 2-pedal unit.",
    h_shifter_forward_gears: 7,
    h_shifter_positions: 8,
    sequential_mode_on_shifter: false,
    clutch_axis: "no",
    clutch_note: "The R5 Bundle's own product page names its bundled pedal set \"SR-P Lite Pedals (No Clutch)\" — stated directly, not inferred.",
    sources: [
      { label: "MOZA Racing — HGP Shifter product page, fetched 2026-10-15: \"seven forward and one reverse gear\"; \"Both reverse and 7th gear are locked ... require downward pressure to engage\"; connects \"directly to a PC via the included USB cable or to a wheelbase with a compatible shifter port\".", url: "https://mozaracing.com/products/hgp-shifter" },
      { label: "MOZA Racing — R5 Bundle product page, fetched 2026-10-15: bundled \"ES Steering Wheel\" with \"22\" buttons; bundled pedal set stated as \"SR-P Lite Pedals (No Clutch)\".", url: "https://mozaracing.com/products/r5-bundle" }
    ]
  },
  {
    id: "csl-dd-clubsport-sq",
    name: "Fanatec CSL DD (5 Nm) + ClubSport Shifter SQ V1.5",
    note: "Entry-level direct-drive wheelbase paired with Fanatec's dual-mode (H-pattern/sequential) add-on shifter. Pro-only.",
    tier: "pro",
    h_shifter_forward_gears: 7,
    h_shifter_positions: 8,
    sequential_mode_on_shifter: true,
    clutch_axis: "no",
    clutch_note: "The CSL DD Ready2Race Bundle's own product page states its bundled \"CSL Pedals\" are a \"Two-pedal set (throttle and brake), upgradeable to three pedals (upgrade kits sold separately)\" — a clutch pedal needs the separately-sold CSL Pedals Clutch Kit or Load Cell Kit.",
    sources: [
      { label: "Fanatec — ClubSport Shifter SQ V1.5 product page, fetched 2026-10-20: \"The ClubSport Shifter SQ features 7 speeds on a traditional H-Pattern, just like in a Porsche 911\"; \"Reverse gear with inhibitor to prevent accidental shifts\"; \"both the H-Pattern and sequential modes\" switchable without tools; \"Compatible to all Fanatec Wheel Bases / Racing Wheels\".", url: "https://www.fanatec.com/us/en/p/add-ons/crd-9040002-ww/clubsport-shifter-sq" },
      { label: "Fanatec — CSL DD QR2 Ready2Race Bundle (5 Nm) product page, fetched 2026-10-20: bundle contents \"1x CSL DD (5 Nm)\", \"1x CSL Pedals\"; pedal set described as \"Two-pedal set (throttle and brake), upgradeable to three pedals (upgrade kits sold separately)\".", url: "https://fanatec.com/us-en/ready2race/csl-dd-qr2-ready2race-bundle-for-pc-5-nm" }
    ]
  },
  {
    id: "g923-dfs",
    name: "Logitech G923 TRUEFORCE + Driving Force Shifter",
    note: "Newer Logitech wheelbase than the free tier's G29/G920, same compatible add-on shifter. Pro-only.",
    tier: "pro",
    h_shifter_forward_gears: 6,
    h_shifter_positions: 7,
    sequential_mode_on_shifter: false,
    clutch_axis: "no",
    clutch_note: "The G923 TRUEFORCE product page's own pedal technical-specifications list (\"Nonlinear brake pedal\", \"Patented carpet grip system\", \"Textured heel grip\", \"Self-calibrating\") and package contents (\"Pedals\") name no clutch pedal anywhere; the page's only other use of \"clutch\" is a software \"programmable dual clutch launch assist in supported games\" via the paddle shifters, not a physical pedal.",
    sources: [
      { label: "Logitech G — Driving Force Shifter product page, fetched 2026-10-15 (same shifter as the free g29-dfs entry above): compatibility \"designed for the G923, G29 (for PlayStation and PC) and G920 (for Xbox and PC) racing wheels.\"", url: "https://www.logitechg.com/en-us/shop/p/driving-force-shifter" },
      { label: "Logitech G — G923 TRUEFORCE Sim Racing Wheel product page, fetched 2026-10-20: pedal technical specifications list \"Nonlinear brake pedal\", \"Patented carpet grip system\", \"Textured heel grip\", \"Self-calibrating\"; package contents \"Steering wheel\", \"Pedals\", \"Power supply\", \"User documentation\" — no clutch pedal stated anywhere on the page.", url: "https://www.logitechg.com/en-us/shop/p/g923-trueforce-sim-racing-wheel.941-000156" }
    ]
  }
];

// eurotrucksimulator2.com/input_config.php, fetched directly 2026-10-15 (Principle XXII — read
// the primary source yourself, don't just trust an excerpt). The page states the in-game gearbox
// has "twelve forward gears and one reverse gear" and documents exactly three shifter
// configurations for reaching them from a single physical H-pattern shifter.
const SCS_SOURCE_URL = "https://eurotrucksimulator2.com/input_config.php";

const GEARBOX_MODES = [
  {
    id: "range-transmission",
    mode_name: "Range Transmission (default)",
    mode_note: "The default in-game setting. One toggle switches the physical 1-6 H-pattern between gear set 1-6 and gear set 7-12.",
    h_shifter_positions_needed: 7,
    toggle_buttons_needed: 1,
    source_note: "SCS Software — ETS2/ATS input config reference page: \"The gearbox simulated in the game has twelve forward gears and one reverse gear.\" Range mode: \"The 'Shifter Toggle: 1' selects between gears set 1-6 and gear set 7-12.\"",
    source_url: SCS_SOURCE_URL
  },
  {
    id: "splitter-transmission",
    mode_name: "Splitter Transmission",
    mode_note: "One toggle switches the physical 1-6 H-pattern between the odd-numbered and even-numbered virtual gears.",
    h_shifter_positions_needed: 7,
    toggle_buttons_needed: 1,
    source_note: "SCS Software — ETS2/ATS input config reference page: \"The 'Shifter Toggle: 1' selects between odd-numbered gears (1,3,5,7,9,11) and even-numbered (2,4,6,8,10,12) gears.\"",
    source_url: SCS_SOURCE_URL
  },
  {
    id: "range-splitter-transmission",
    mode_name: "Range-Splitter Transmission (Scania-style)",
    mode_note: "Both toggles used together — the real Scania H-shifter layout. 'Shifter Toggle: 1' switches ranges, 'Shifter Toggle: 2' switches splits.",
    h_shifter_positions_needed: 7,
    toggle_buttons_needed: 2,
    source_note: "SCS Software — ETS2/ATS input config reference page: \"This configuration tries to emulate a layout of a real Scania H-shifter\" — \"the 'Shifter Toggle: 1' switches between gear ranges and 'Shifter Toggle: 2' switches between splitted gears.\"",
    source_url: SCS_SOURCE_URL
  }
];

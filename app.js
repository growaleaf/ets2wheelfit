function el(tag, className, text) {
  const e = document.createElement(tag);
  if (className) e.className = className;
  if (text !== undefined) e.textContent = text;
  return e;
}

function renderSources(container, sources) {
  container.innerHTML = "";
  const label = el("span", "sources-label", "Sources: ");
  container.appendChild(label);
  sources.forEach(function (s, i) {
    const a = el("a", null, s.label);
    a.href = s.url;
    a.target = "_blank";
    a.rel = "noopener noreferrer";
    container.appendChild(a);
    if (i < sources.length - 1) container.appendChild(document.createTextNode(" · "));
  });
}

function clutchLabel(clutchAxis) {
  if (clutchAxis === "yes") return "Yes — dedicated clutch pedal";
  if (clutchAxis === "no") return "No — stock pedal set has no clutch pedal";
  return "Not stated by the manufacturer's own page";
}

function renderResult(controller, mode) {
  const positionsShort = Math.max(0, mode.h_shifter_positions_needed - controller.h_shifter_positions);
  const positionsOk = positionsShort === 0;

  document.getElementById("result-heading").textContent =
    controller.name + " + " + mode.mode_name;

  document.getElementById("controller-spec").textContent =
    controller.h_shifter_forward_gears + " forward gears + reverse (" + controller.h_shifter_positions +
    " physical H-pattern positions)";

  document.getElementById("mode-needs").textContent =
    "Needs a shifter with at least " + mode.h_shifter_positions_needed + " physical positions, plus " +
    mode.toggle_buttons_needed + " free button(s) bound to Shifter Toggle " +
    (mode.toggle_buttons_needed === 2 ? "1 and 2" : "1") + ". " + mode.mode_note;

  const summary = document.getElementById("fit-summary");
  summary.className = "fit-summary " + (positionsOk ? "fit-full" : "fit-short");
  summary.textContent = positionsOk
    ? "This shifter's " + controller.h_shifter_positions + " physical positions cover the " +
      mode.h_shifter_positions_needed + " this mode needs."
    : "This shifter's " + controller.h_shifter_positions + " physical positions fall " + positionsShort +
      " short of the " + mode.h_shifter_positions_needed + " this mode needs.";

  document.getElementById("toggle-note").textContent =
    "Shifter Toggle buttons are bound to any free button in-game — this build does not score free " +
    "button count because the manufacturer pages for these wheels do not all publish an exact " +
    "button total; every combo below has multiple spare buttons or paddles.";

  document.getElementById("clutch-value").textContent = clutchLabel(controller.clutch_axis);
  document.getElementById("clutch-note").textContent = controller.clutch_note;

  document.getElementById("sequential-note").textContent = controller.sequential_mode_on_shifter
    ? "This shifter also has a built-in sequential (+/-) mode, not used by ETS2/ATS — the game has no sequential transmission type."
    : "This shifter has no sequential mode — not relevant here, since ETS2/ATS has no sequential transmission type.";

  renderSources(document.getElementById("controller-sources"), controller.sources);
  renderSources(document.getElementById("mode-sources"), [{ label: mode.source_note, url: mode.source_url }]);
}

function populateSelect(select, items, nameKey) {
  select.innerHTML = "";
  items.forEach(function (item) {
    const opt = document.createElement("option");
    opt.value = item.id;
    opt.textContent = item[nameKey];
    select.appendChild(opt);
  });
}

function init() {
  const controllerSelect = document.getElementById("controller-select");
  const modeSelect = document.getElementById("mode-select");

  populateSelect(controllerSelect, CONTROLLERS, "name");
  populateSelect(modeSelect, GEARBOX_MODES, "mode_name");

  function update() {
    const controller = CONTROLLERS.find(function (c) { return c.id === controllerSelect.value; });
    const mode = GEARBOX_MODES.find(function (m) { return m.id === modeSelect.value; });
    renderResult(controller, mode);
  }

  controllerSelect.addEventListener("change", update);
  modeSelect.addEventListener("change", update);

  update();
}

document.addEventListener("DOMContentLoaded", init);

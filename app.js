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

const PRO_PAYMENT_LINK_URL = "https://buy.stripe.com/8x214p9iwaql0wY1uHfrW3g";

function isPro(item) {
  return item.tier === "pro";
}

function visibleControllers() {
  return unlockedState ? CONTROLLERS : CONTROLLERS.filter(function (c) { return !isPro(c); });
}

function updateUnlockUI(unlocked) {
  const unlockSection = document.getElementById("unlock-box");
  const proControllers = CONTROLLERS.filter(isPro).length;

  unlockSection.innerHTML = "";

  if (unlocked) {
    unlockSection.appendChild(el("p", "unlock-confirmed", "Pro unlocked — all " + CONTROLLERS.length + " wheel+shifter combos available."));
    return;
  }

  const buyP = document.createElement("p");
  const buyLink = el("a", "btn", "Unlock all " + CONTROLLERS.length + " combos — $9 one time");
  buyLink.href = PRO_PAYMENT_LINK_URL;
  buyP.appendChild(buyLink);
  buyP.appendChild(document.createTextNode(" (adds " + proControllers + " more combos)"));
  unlockSection.appendChild(buyP);

  const form = document.createElement("form");
  form.className = "license-form";
  const label = el("label", null, "Already purchased? Paste your license key");
  label.htmlFor = "license-key-input";
  const input = document.createElement("input");
  input.type = "text";
  input.id = "license-key-input";
  input.placeholder = "EW1.…";
  const submit = document.createElement("button");
  submit.type = "submit";
  submit.textContent = "Activate";
  const msg = el("p", "license-msg", "");
  form.appendChild(label);
  form.appendChild(input);
  form.appendChild(submit);
  form.appendChild(msg);
  form.addEventListener("submit", function (ev) {
    ev.preventDefault();
    verifyLicense(input.value).then(function (res) {
      if (res.ok) {
        storeLicense(input.value);
        refreshTierAndRender();
      } else {
        msg.textContent = res.reason;
      }
    });
  });
  unlockSection.appendChild(form);
}

let unlockedState = false;

function refreshTierAndRender() {
  loadStoredLicense().then(function (license) {
    unlockedState = !!license;
    updateUnlockUI(unlockedState);

    const controllerSelect = document.getElementById("controller-select");
    const modeSelect = document.getElementById("mode-select");
    const prevController = controllerSelect.value;

    populateSelect(controllerSelect, visibleControllers(), "name");
    if (modeSelect.options.length === 0) populateSelect(modeSelect, GEARBOX_MODES, "mode_name");

    controllerSelect.value = visibleControllers().some(function (c) { return c.id === prevController; })
      ? prevController : visibleControllers()[0].id;

    const controller = CONTROLLERS.find(function (c) { return c.id === controllerSelect.value; });
    const mode = GEARBOX_MODES.find(function (m) { return m.id === modeSelect.value; });
    renderResult(controller, mode);
  });
}

function init() {
  const controllerSelect = document.getElementById("controller-select");
  const modeSelect = document.getElementById("mode-select");

  populateSelect(modeSelect, GEARBOX_MODES, "mode_name");

  function update() {
    const controller = CONTROLLERS.find(function (c) { return c.id === controllerSelect.value; });
    const mode = GEARBOX_MODES.find(function (m) { return m.id === modeSelect.value; });
    renderResult(controller, mode);
  }

  controllerSelect.addEventListener("change", update);
  modeSelect.addEventListener("change", update);

  refreshTierAndRender();
}

document.addEventListener("DOMContentLoaded", init);

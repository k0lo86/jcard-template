/**
 * J-Card Template: Start
 *
 * Start here.
 */

import {
  populateDataSaves,
  getApplicationEntry,
  getDataEntries,
  getViewEntry,
} from "./application-functions.mjs";
import { setupEvents } from "./events.mjs";
import { EVENT_CHANGE } from "./common/constants.mjs";
import { setWindowSubtitle } from "./common/functions.mjs";
import {
  reset,
  update,
  getButton,
  getEntries,
} from "./common/application-functions.mjs";
import { removeAnesthesia } from "./common/events.mjs";

const SUFFIX_LABEL = ":";
const SUFFIX_NOSAVE = "<sup>+</sup>";

const PARAMS = Object.freeze({
  dark: Object.freeze({
    getter: getViewEntry,
    key: "forceDark",
    value: true,
  }),
  ecc: Object.freeze({
    getter: getApplicationEntry,
    key: "ecc",
    value: true,
  }),
  reverse: Object.freeze({
    getter: getViewEntry,
    key: "reverse",
    value: true,
  }),
});

const argumentss = new URLSearchParams(location.search);

Object.values(getDataEntries())
  .filter((entry) => !entry.save && entry.element.labels)
  .forEach((entry) => {
    entry.element.labels.forEach((label) => {
      const index = label.innerHTML.lastIndexOf(SUFFIX_LABEL);
      if (index >= 0) {
        label.innerHTML =
          label.innerHTML.substring(0, index) +
          SUFFIX_NOSAVE +
          label.innerHTML.substring(index);
      } else {
        label.innerHTML += SUFFIX_NOSAVE;
      }
    });
  });
setupEvents();
Object.values(getEntries())
  .filter((entry) => entry.element.type === "number")
  .forEach((entry) => {
    entry.element.placeholder = entry.preset;
  });
reset();
populateDataSaves({
  version: "2",
  backContentsAlignment: "left",
  backContentsVisible: true,
  backSize: "7.3",
  bold: false,
  cardColor: "#ffffff",
  contentsSeparator: "<br />",
  backContentsSeparator: "&nbsp;",
  fontFamily: "sans-serif",
  footer: "NAJLEPSZE 1",
  footerBold: true,
  footerAlignment: "center",
  footerSize: "27",
  forceCaps: false,
  frontContentsAlignment: "left",
  frontContentsVisible: true,
  frontSize: "7.7",
  frontTitleAlignment: "left",
  frontTitleVisible: true,
  frontTitleLowerSize: "7.8",
  frontTitleUpperSize: "17",
  titleLowerBoldFront: false,
  titleLowerBoldSpine: false,
  italicize: false,
  noteAlignment: "right",
  noteLower: "MAJ 1992",
  noteSize: "7",
  noteUpper: "GIEŁDA GRZYBOWSKA",
  reverse: false,
  shortBack: true,
  shortSpine: false,
  sideAContents: "18. BATTLE SHIPS - gra w statki z fajną grafiką\n54. BLUES BROS - dwóch agentów na misji\n71. DONALD DUCK - kaczor w miasteczku\n101. GIANA SISTERS - przygodowa w labiryncie\n127. GIANA SISTERS 2 - druga cześć mega hitu\n154. IMPOSSIBLE MISSION - tajny agent\n176. KANE 1 - kowboj strzela na Dzikim Zachodzie\n194. KANE 2 - dalsze przygody dzielnego kowboja\n214. KIKSTART 1 - wyścigi motorkiem\n236. KIKSTART 2 - motorki, dużo skakania\n250. KIKSTART 3 - trzecia część motorków\n272. MONTEZUMA REV. - gra z drabinkami\n279. PITSTOP 1 - wyścigi formuła 1 i zmiana kół\n289. PITSTOP 2 - szybkie bolidy na dwóch graczy\n304. POLE POSITION - wyścigi samochodowe\n311. POLE POSITION 2 - wyścigi szybkich bolidów\n326. POWER DRIFT - wyścigi gokartami\n347. RIVER RAID - lot bojowym samol. nad rzeką\n354. RIVER RAID 2 - nowoczesny samol. nad rzeką\n366. SIM CITY - budujesz własne miasto od zera\n373. TOM AND JERRY - mysz i kot\n385. TRAIN ROBBERS - napad na pociąg\n399. TURBO ESPRIT - jazda samochodem",
  backContents: "INSTRUKCJA ŁADOWANIA PROGRAMU W \"TURBO ROM\": WCZYTAĆ INSTRUKCJĄ \"LOAD\" PROGRAM \"TURBO ROM\" I URUCHOMIĆ INSTRUKCJĄ \"RUN\". WCZYTAĆ PROGRAM GŁÓWNY (GRĘ) INSTRUKCJĄ \"STRZAŁKA L\" I URUCHOMIĆ PRZEZ \"RUN\".",
  sideALabel: "Side A",
  spineTitleAlignment: "left",
  spineTitleVisible: true,
  textColor: "#000000",
  spineTitleLowerSize: "0",
  spineTitleUpperSize: "17",
  titleLower: "01. TURBO ROM, 14. USTAWIANIE GŁOWICY",
  titleUpper: "SKŁADANKA C64 #1",
});
update();
setWindowSubtitle();
Object.entries(PARAMS).forEach(([argument, handle]) => {
  if (argumentss.has(argument)) {
    const entry = handle.getter(handle.key);
    entry.value = handle.value;
    entry.element.dispatchEvent(EVENT_CHANGE);
  }
});
removeAnesthesia();

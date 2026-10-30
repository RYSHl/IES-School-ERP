// ==============================================================================
// IES SCHOOL ERP 5.0 - GLOBAL CONFIGURATION & MASTER STATE
// Academic Session 2026-27 &middot; Ideal English School, Dholai Bazaar
// ==============================================================================

const AY = "2026-27";
const STORAGE_KEY = "IES_ERP_2026_MASTER";

// Standard Class Roman Numerals
function rom(c) {
  const map = {
    "NUR": "Nursery", "KG1": "KG-I", "KG2": "KG-II",
    "1": "I", "2": "II", "3": "III", "4": "IV", "5": "V",
    "6": "VI", "7": "VII", "8": "VIII", "9": "IX", "10": "X"
  };
  return map[c] || c;
}

function rs(amt) {
  return "Rs. " + Number(amt || 0).toLocaleString("en-IN");
}

function today() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return ${y}--;
}

function esc(str) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
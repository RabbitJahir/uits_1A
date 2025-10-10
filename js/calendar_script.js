const popup = document.querySelector(".popup");
const overlay = document.querySelector(".overlay");
const popupTitle = document.getElementById("popup-title");
const popupContent = document.getElementById("popup-content");
const closeBtn = document.getElementById("popup-close");

// Embedded JSON data
let classNotesData = {
  "2025-10-05": {
    "CHEM0531175": { "status": "taken", "notes":["Chemical Bonding, lone bond"] },
    "MATH0541111": { "status": "taken", "notes":["Rolles Revise", "Means theorem korayse"] }
  },
  "2025-10-07": {
    "GED0232111": { "status": "taken", "notes":["Argumentative essay(gymming is deathing)"] },
    "PHY0533112": { "status": "taken", "notes":["Experiment 06"] },
    "PHY0533111": { "status": "taken", "notes":["khata dekhayse(MID)"] },
    "CHEM0531175": { "status": "taken", "notes":["Chemical Bonding again, lone bond"] }
  },
  // ... include the rest of your JSON data here
};

// Apply green/red coloring and popup
document.querySelectorAll("td[data-subject]").forEach(cell => {
    const subject = cell.dataset.subject;
    const date = cell.parentElement.children[1].textContent.trim();
    const classData = classNotesData[date]?.[subject];

    // Coloring
    if (classData?.status === "taken") {
        cell.style.backgroundColor = "#99ff99"; // green
    } else if (classData?.status === "missed") {
        cell.style.backgroundColor = "#ff9999"; // red
    }

    // Popup
    cell.addEventListener("click", () => {
        const notes = classData?.notes || ["No notes for this class today."];
        popupTitle.textContent = subject;
        popupContent.innerHTML = "<ul><li>" + notes.join("</li><li>") + "</li></ul>";
        popup.style.display = "block";
        overlay.style.display = "block";
    });
});

// Close popup
closeBtn.addEventListener("click", () => {
    popup.style.display = "none";
    overlay.style.display = "none";
});
overlay.addEventListener("click", () => {
    popup.style.display = "none";
    overlay.style.display = "none";
});


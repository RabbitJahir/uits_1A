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
  "2025-10-09": {
    "MATH0541111": { "status": "taken", "notes":["Khata dekhayse(MID)"] },
    "PHY0533111": { "status": "taken", "notes":["Kinetic Theory of gases", "Equation of derivation of kinetic theory of gases"] },
    "GED0232111": { "status": "taken", "notes":["Khata dekhayse(MID)"] },
    "CSE0613111": { "status": "taken", "notes":["Khata dekhayse(MID)(CT)"] },
    "PHY0533112": { "status": "missed", "notes":["Hoy nai, ma'am er kaj chilo"] }
  },

    
  "2025-10-12": {
    "CHEM0531175": { "status": "", "notes": [] },
    "MATH0541111": { "status": "", "notes": [] }
  },
  "2025-10-13": {
    "GED0232111": { "status": "", "notes": [] },
    "PHY0533112": { "status": "", "notes": [] },
    "PHY0533111": { "status": "", "notes": [] },
    "CHEM0531175": { "status": "", "notes": [] }
  },
  "2025-10-14": {
    "OffDay": { "status": "", "notes": [] }
  },
  "2025-10-15": {
    "MATH0541111": { "status": "", "notes": [] },
    "PHY0533111": { "status": "", "notes": [] },
    "GED0232111": { "status": "", "notes": [] },
    "CSE0613111": { "status": "", "notes": [] },
    "PHY0533112": { "status": "", "notes": [] }
  },
  "2025-10-16": {
    "FreeSlot": { "status": "", "notes": [] }
  },

  
  "2025-10-19": {
    "CHEM0531175": { "status": "", "notes": [] },
    "MATH0541111": { "status": "", "notes": [] }
  },
  "2025-10-20": {
    "Holiday": { "status": "", "notes": [] }
  },
  "2025-10-21": {
    "GED0232111": { "status": "", "notes": [] },
    "PHY0533112": { "status": "", "notes": [] },
    "PHY0533111": { "status": "", "notes": [] },
    "CHEM0531175": { "status": "", "notes": [] }
  },
  "2025-10-22": {
    "OffDay": { "status": "", "notes": [] }
  },
  "2025-10-23": {
    "MATH0541111": { "status": "", "notes": [] },
    "PHY0533111": { "status": "", "notes": [] },
    "GED0232111": { "status": "", "notes": [] },
    "CSE0613111": { "status": "", "notes": [] },
    "PHY0533112": { "status": "", "notes": [] }
  },


  "2025-10-26": {
    "CHEM0531175": { "status": "", "notes": [] },
    "MATH0541111": { "status": "", "notes": [] }
  },
  "2025-10-27": {
    "Holiday": { "status": "", "notes": [] }
  },
  "2025-10-28": {
    "GED0232111": { "status": "", "notes": [] },
    "PHY0533112": { "status": "", "notes": [] },
    "PHY0533111": { "status": "", "notes": [] },
    "CHEM0531175": { "status": "", "notes": [] }
  },
  "2025-10-29": {
    "OffDay": { "status": "", "notes": [] }
  },
  "2025-10-30": {
    "MATH0541111": { "status": "", "notes": [] },
    "PHY0533111": { "status": "", "notes": [] },
    "GED0232111": { "status": "", "notes": [] },
    "CSE0613111": { "status": "", "notes": [] },
    "PHY0533112": { "status": "", "notes": [] }
  },

  
  "2025-11-02": {
    "CHEM0531175": { "status": "", "notes": [] },
    "MATH0541111": { "status": "", "notes": [] }
  },
  "2025-11-03": {
    "Holiday": { "status": "", "notes": [] }
  },
  "2025-11-04": {
    "GED0232111": { "status": "", "notes": [] },
    "PHY0533112": { "status": "", "notes": [] },
    "PHY0533111": { "status": "", "notes": [] },
    "CHEM0531175": { "status": "", "notes": [] }
  },
  "2025-11-05": {
    "OffDay": { "status": "", "notes": [] }
  },
  "2025-11-06": {
    "MATH0541111": { "status": "", "notes": [] },
    "PHY0533111": { "status": "", "notes": [] },
    "GED0232111": { "status": "", "notes": [] },
    "CSE0613111": { "status": "", "notes": [] },
    "PHY0533112": { "status": "", "notes": [] }
  },


  "2025-11-09": {
    "CHEM0531175": { "status": "", "notes": [] },
    "MATH0541111": { "status": "", "notes": [] }
  },
  "2025-11-10": {
    "Holiday": { "status": "", "notes": [] }
  },
  "2025-11-11": {
    "GED0232111": { "status": "", "notes": [] },
    "PHY0533112": { "status": "", "notes": [] },
    "PHY0533111": { "status": "", "notes": [] },
    "CHEM0531175": { "status": "", "notes": [] }
  },
  "2025-11-12": {
    "OffDay": { "status": "", "notes": [] }
  },
  "2025-11-13": {
    "MATH0541111": { "status": "", "notes": [] },
    "PHY0533111": { "status": "", "notes": [] },
    "GED0232111": { "status": "", "notes": [] },
    "CSE0613111": { "status": "", "notes": [] },
    "PHY0533112": { "status": "", "notes": [] }
  },


  "2025-11-16": {
    "CHEM0531175": { "status": "", "notes": [] },
    "MATH0541111": { "status": "", "notes": [] }
  },
  "2025-11-17": {
    "Holiday": { "status": "", "notes": [] }
  },
  "2025-11-18": {
    "GED0232111": { "status": "", "notes": [] },
    "PHY0533112": { "status": "", "notes": [] },
    "PHY0533111": { "status": "", "notes": [] },
    "CHEM0531175": { "status": "", "notes": [] }
  },
  "2025-11-19": {
    "OffDay": { "status": "", "notes": [] }
  },
  "2025-11-20": {
    "MATH0541111": { "status": "", "notes": [] },
    "PHY0533111": { "status": "", "notes": [] },
    "GED0232111": { "status": "", "notes": [] },
    "CSE0613111": { "status": "", "notes": [] },
    "PHY0533112": { "status": "", "notes": [] }
  }


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

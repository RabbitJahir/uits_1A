// 🔹 Firebase SDK should already be included in HTML
// <script src="https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js"></script>
// <script src="https://www.gstatic.com/firebasejs/9.23.0/firebase-auth-compat.js"></script>
// <script src="https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore-compat.js"></script>

// 🔹 Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC9xD7IKkO9sphK8JtBqmXw0ZXV3tl-vj0",
  authDomain: "uits581a.firebaseapp.com",
  projectId: "uits581a",
  storageBucket: "uits581a.firebasestorage.app",
  messagingSenderId: "330608408945",
  appId: "1:330608408945:web:c44a31a92935f921fb5ed0"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// 🔹 Popup elements
const popup = document.querySelector(".popup");
const overlay = document.querySelector(".overlay");
const popupTitle = document.getElementById("popup-title");
const popupContent = document.getElementById("popup-content");
const closeBtn = document.getElementById("popup-close");

// 🔹 Firestore reference
const calendarRef = db.collection("calendarData");

// 🔹 Local cache
let classNotesData = {};

// 🟢 Helper: Refresh colors for calendar
function refreshColors() {
  document.querySelectorAll("td[data-subject]").forEach(cell => {
    const subject = cell.dataset.subject;
    const date = cell.parentElement.children[1].textContent.trim();
    const classData = classNotesData[date]?.[subject];

    if (classData?.status === "taken") {
      cell.style.backgroundColor = "#99ff99"; // green
    } else if (classData?.status === "missed") {
      cell.style.backgroundColor = "#ff9999"; // red
    } else {
      cell.style.backgroundColor = ""; // reset
    }
  });
}

// 🟢 Load data from Firebase (after auth)
async function loadDataFromFirebase() {
  try {
    const snapshot = await calendarRef.get();
    classNotesData = {};
    snapshot.forEach(doc => {
      classNotesData[doc.id] = doc.data();
    });
    console.log("✅ Calendar data loaded from Firebase");
    refreshColors();
  } catch (error) {
    console.error("❌ Error loading calendar data:", error);
    alert("Cannot load data. Check Firestore rules or authentication.");
  }
}

// 🟢 Save a single date’s data to Firebase
async function saveDateToFirebase(date, data) {
  try {
    await calendarRef.doc(date).set(data);
    console.log(`✅ Saved ${date} to Firebase`);
  } catch (error) {
    console.error("❌ Error saving data:", error);
    alert("Failed to save data. Check your connection or Firestore rules.");
  }
}

// 🟡 Popup & editing logic
function setupCalendarCells() {
  document.querySelectorAll("td[data-subject]").forEach(cell => {
    const subject = cell.dataset.subject;
    const date = cell.parentElement.children[1].textContent.trim();

    cell.addEventListener("click", () => {
      const classData = classNotesData[date]?.[subject] || { status: "", notes: [] };
      const notes = classData.notes?.join("\n") || "";

      popupTitle.textContent = `${subject} (${date})`;
      popupContent.innerHTML = `
        <p><b>Status:</b> ${classData.status || "None"}</p>
        <p><b>Notes:</b></p>
        <ul><li>${classData.notes.length ? classData.notes.join("</li><li>") : "No notes yet."}</li></ul>
        <button id="edit-btn" style="margin-top:10px;padding:6px 10px;background:#4CAF50;color:#fff;border:none;border-radius:5px;cursor:pointer;">Edit</button>
      `;

      popup.style.display = "block";
      overlay.style.display = "block";

      const editBtn = document.getElementById("edit-btn");

editBtn.addEventListener("click", async () => {
  const pass = prompt("Enter password to edit:");
  if (pass !== "cocacola") {
    alert("❌ Wrong password!");
    return;
  }

  try {
    // Sign in anonymously so Firestore allows write
    await auth.signInAnonymously();
  } catch (err) {
    console.error("❌ Auth error:", err);
    alert("Authentication failed, cannot edit.");
    return;
  }

  // Show editable fields here...
});


        // 🔹 Show editable fields
        popupContent.innerHTML = `
          <label><b>Status:</b></label>
          <select id="edit-status" style="margin:5px 0;">
            <option value="">None</option>
            <option value="taken" ${classData.status === "taken" ? "selected" : ""}>Taken</option>
            <option value="missed" ${classData.status === "missed" ? "selected" : ""}>Missed</option>
          </select>
          <br>
          <label><b>Notes:</b></label><br>
          <textarea id="edit-notes" rows="5" style="width:90%;margin-top:5px;">${notes}</textarea>
          <br><br>
          <button id="save-btn" style="padding:6px 10px;background:#2196F3;color:#fff;border:none;border-radius:5px;cursor:pointer;">Save</button>
        `;

        // 🟢 Save edits
        document.getElementById("save-btn").addEventListener("click", async () => {
          const newStatus = document.getElementById("edit-status").value;
          const newNotes = document.getElementById("edit-notes").value.split("\n").filter(n => n.trim() !== "");

          if (!classNotesData[date]) classNotesData[date] = {};
          classNotesData[date][subject] = { status: newStatus, notes: newNotes };

          await saveDateToFirebase(date, classNotesData[date]);
          refreshColors();

          popup.style.display = "none";
          overlay.style.display = "none";
        });
      });
    });
  });
}

// 🔴 Close popup
closeBtn.addEventListener("click", () => {
  popup.style.display = "none";
  overlay.style.display = "none";
});
overlay.addEventListener("click", () => {
  popup.style.display = "none";
  overlay.style.display = "none";
});

// 🔄 On page load: Sign in anonymously first, then load data
auth.signInAnonymously()
  .then(() => {
    console.log("✅ Signed in anonymously");
    loadDataFromFirebase();
    setupCalendarCells();
  })
  .catch(err => {
    console.error("❌ Auth failed:", err);
    alert("Authentication failed. Check your Firebase config and rules.");
  });

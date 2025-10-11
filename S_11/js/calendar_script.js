// 🔹 Firebase SDK should already be included in HTML
// Example initialization:
// <script src="https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js"></script>
// <script src="https://www.gstatic.com/firebasejs/9.23.0/firebase-auth-compat.js"></script>
// <script src="https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore-compat.js"></script>

// 🔹 Replace YOUR_FIREBASE_CONFIG with your actual config
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
const db = firebase.firestore();
const auth = firebase.auth();

// 🔹 Popup elements
const popup = document.querySelector(".popup");
const overlay = document.querySelector(".overlay");
const popupTitle = document.getElementById("popup-title");
const popupContent = document.getElementById("popup-content");
const closeBtn = document.getElementById("popup-close");

// 🔹 Reference Firestore
const calendarRef = db.collection("calendarData");

// 🔹 Local cache
let classNotesData = {};

// 🟢 Load data from Firebase on start
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
  }
}

// 🟢 Save a single date’s data to Firebase
async function saveDateToFirebase(date, data) {
  try {
    await calendarRef.doc(date).set(data);
    console.log(`✅ Saved ${date} to Firebase`);
  } catch (error) {
    console.error("❌ Error saving data:", error);
  }
}

// 🟢 Refresh colors for all cells
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

// 🟡 Popup & editing logic
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

    // 🟠 Edit button
    document.getElementById("edit-btn").addEventListener("click", async () => {
      const pass = prompt("Enter password to edit:");
      if (pass !== "cocacola") {
        alert("❌ Wrong password!");
        return;
      }

      // 🔹 Sign in anonymously to satisfy Firestore rules
      try {
        await auth.signInAnonymously();
      } catch (err) {
        console.error("❌ Auth error:", err);
      }

      // Show editable fields
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

        // Update local data
        if (!classNotesData[date]) classNotesData[date] = {};
        classNotesData[date][subject] = { status: newStatus, notes: newNotes };

        // Save to Firebase
        await saveDateToFirebase(date, classNotesData[date]);

        // Refresh visuals
        refreshColors();
        popup.style.display = "none";
        overlay.style.display = "none";
      });
    });
  });
});

// 🔴 Close popup
closeBtn.addEventListener("click", () => {
  popup.style.display = "none";
  overlay.style.display = "none";
});
overlay.addEventListener("click", () => {
  popup.style.display = "none";
  overlay.style.display = "none";
});

// 🔄 Load data when page starts
loadDataFromFirebase();
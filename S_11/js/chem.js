function toggleSubtopics(num) {
            const selected = document.getElementById("sub" + num);
            const all = document.querySelectorAll(".subtopics");

            all.forEach(sub => {
                if (sub !== selected) sub.style.display = "none";
            });

            selected.style.display = (selected.style.display === "block") ? "none" : "block";
        }

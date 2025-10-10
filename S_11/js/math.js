// -------- Store Marks for "Mark Distribution in Class" --------
        const classInputs = document.querySelectorAll('#lab table input');

        classInputs.forEach((input, index) => {
            const saved = localStorage.getItem('mathMark' + index);
            if (saved) input.value = saved;

            input.addEventListener('input', () => {
                localStorage.setItem('mathMark' + index, input.value);
            });
        });

        // -------- Syllabus Subtopic Toggle --------
        function toggleSubtopics(num) {
            const selected = document.getElementById("sub" + num);
            const all = document.querySelectorAll(".subtopics");

            all.forEach(sub => {
                if (sub !== selected) sub.style.display = "none";
            });

            selected.style.display = (selected.style.display === "block") ? "none" : "block";
        }

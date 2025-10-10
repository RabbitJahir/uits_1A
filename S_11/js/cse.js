// -------- Store Marks for Class Table --------
        const classInputs = document.querySelectorAll('#lab table:nth-of-type(1) input');
        classInputs.forEach((input, index) => {
            const saved = localStorage.getItem('classMark' + index);
            if (saved) input.value = saved;
            input.addEventListener('input', () => {
                localStorage.setItem('classMark' + index, input.value);
            });
        });

        // -------- Store Marks for Lab Table --------
        const labInputs = document.querySelectorAll('#lab table:nth-of-type(2) input');
        labInputs.forEach((input, index) => {
            const saved = localStorage.getItem('labMark' + index);
            if (saved) input.value = saved;
            input.addEventListener('input', () => {
                localStorage.setItem('labMark' + index, input.value);
            });
        });

        // -------- Syllabus Toggle --------
        function toggleSubtopics(num) {
            const selected = document.getElementById("sub" + num);
            const all = document.querySelectorAll(".subtopics");
            all.forEach(sub => {
                if (sub !== selected) sub.style.display = "none";
            });
            selected.style.display = (selected.style.display === "block") ? "none" : "block";
        }

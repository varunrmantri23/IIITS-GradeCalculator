import {
    GRADES,
    COURSE_TYPES,
    CSE_CURRICULUM,
    ECE_CURRICULUM,
    CSE_SPECIALIZATIONS,
    ECE_SPECIALIZATIONS,
    HONORS_COURSES,
    BTP_COURSES,
} from "./data.js";

class GradeCalculator {
    constructor() {
        this.curriculumData = {
            cse: CSE_CURRICULUM,
            ece: ECE_CURRICULUM,
        };
        this.currentBranch = "cse";
        this.courses = [];
        this.selectedInstituteElectives = new Set();
        this.currentSpecialization = "";
        this.isHonors = false;
        this.customCourses = [];
        this.initializeElements();
        this.setupEventListeners();
        this.initializeHonorsAndBTP();
        this.initializeChart();
        this.initializeFromStorage();
        this.populateSemesters();
        this.setupViewToggle();
        this.initializeSpecializationSelect();
        this.updateSpecializationOptions();
        this.populateSemesters();
        this.updateCourseTypes();
        this.initializeSemesterView();
        this.initializeCustomCourseForm();
        this.loadCustomCourses();
        this.setupSemesterViewGradeSelects();
    }

    initializeElements() {
        this.form = document.getElementById("courseForm");
        this.branchSelect = document.getElementById("branchSelect");
        this.semesterSelect = document.getElementById("semester");
        this.courseTypeSelect = document.getElementById("courseType");
        this.courseNameSelect = document.getElementById("courseName");
        this.gradeSelect = document.getElementById("grade");
        this.courseTableBody = document.getElementById("courseTableBody");
        this.resultCard = document.getElementById("resultCard");
        this.gpaResult = document.getElementById("gpaResult");
        this.totalCredits = document.getElementById("totalCredits");
        this.clearAllBtn = document.getElementById("clearAll");
        this.listViewBtn = document.getElementById("listView");
        this.semesterViewBtn = document.getElementById("semesterView");
        this.listViewSection = document.getElementById("listViewSection");
        this.semesterViewSection = document.getElementById(
            "semesterViewSection"
        );
        this.toggleMissingCourse = document.getElementById(
            "toggleMissingCourse"
        );
        this.missingCourseForm = document.getElementById("missingCourseForm");
        this.toggleIcon = document.getElementById("toggleIcon");

        this.toggleMissingCourse.addEventListener("click", () => {
            this.missingCourseForm.classList.toggle("hidden");
            this.toggleIcon.classList.toggle("rotate-180");
        });
    }

    setupEventListeners() {
        this.branchSelect.addEventListener("change", () => {
            this.currentBranch = this.branchSelect.value;
            this.currentSpecialization = "";
            document.getElementById("specializationSelect").value = "";
            this.updateSpecializationOptions();
            this.populateSemesters();
            this.updateCourseTypes();
            this.initializeSemesterView();
        });

        this.form.addEventListener("submit", (e) => this.handleFormSubmit(e));
        this.semesterSelect.addEventListener("change", () =>
            this.updateCourseTypes()
        );
        this.courseTypeSelect.addEventListener("change", () =>
            this.updateCourseOptions()
        );
        this.clearAllBtn.addEventListener("click", () => this.clearAll());
    }

    setupViewToggle() {
        this.listViewBtn.addEventListener("click", () => {
            this.listViewBtn.classList.add("bg-blue-100", "text-blue-700");
            this.semesterViewBtn.classList.remove(
                "bg-blue-100",
                "text-blue-700"
            );
            this.listViewSection.classList.remove("hidden");
            this.semesterViewSection.classList.add("hidden");
        });

        this.semesterViewBtn.addEventListener("click", () => {
            this.semesterViewBtn.classList.add("bg-blue-100", "text-blue-700");
            this.listViewBtn.classList.remove("bg-blue-100", "text-blue-700");
            this.semesterViewSection.classList.remove("hidden");
            this.listViewSection.classList.add("hidden");
            this.initializeSemesterView();
        });
    }

    populateSemesters() {
        this.semesterSelect.innerHTML =
            '<option value="">Select Semester</option>';
        Object.entries(this.curriculumData[this.currentBranch]).forEach(
            ([sem, data]) => {
                this.semesterSelect.innerHTML += `
                <option value="${sem}">Semester ${sem}</option>
            `;
            }
        );
    }

    updateCourseTypes() {
        const semester = this.semesterSelect.value;
        this.courseTypeSelect.innerHTML =
            '<option value="">Select Type</option>';
        this.courseNameSelect.innerHTML =
            '<option value="">Select Course</option>';

        if (!semester) return;

        const semesterData = this.curriculumData[this.currentBranch][semester];
        Object.keys(semesterData.courses).forEach((type) => {
            if (semesterData.courses[type].length > 0) {
                this.courseTypeSelect.innerHTML += `
                    <option value="${type}">${this.getCourseTypeLabel(
                    type
                )}</option>
                `;
            }
        });
    }

    updateCourseOptions() {
        const semester = this.semesterSelect.value;
        const courseType = this.courseTypeSelect.value;
        this.courseNameSelect.innerHTML =
            '<option value="">Select Course</option>';

        if (!semester || !courseType) return;

        let courses;
        if (courseType === "specialization" && this.currentSpecialization) {
            const specializations =
                this.currentBranch === "cse"
                    ? CSE_SPECIALIZATIONS
                    : ECE_SPECIALIZATIONS;
            courses =
                semester === "6"
                    ? specializations[this.currentSpecialization].courses
                          .semester6
                    : specializations[this.currentSpecialization].courses
                          .semester7;
        } else {
            courses =
                this.curriculumData[this.currentBranch][semester].courses[
                    courseType
                ];
        }

        if (!courses) return;

        courses.forEach((course) => {
            this.courseNameSelect.innerHTML += `
                <option value="${course.code}">${course.name}</option>
            `;
        });
    }

    initializeSemesterView() {
        const semesterContainer = document.querySelector(
            "#semesterViewSection > div"
        );
        semesterContainer.innerHTML = "";

        // Get all semesters
        const semesters = Object.keys(
            this.curriculumData[this.currentBranch]
        ).sort();

        semesters.forEach((sem) => {
            const data = this.curriculumData[this.currentBranch][sem];
            let coursesList = "";

            // Show all available course types for the semester
            Object.entries(data.courses).forEach(([type, courses]) => {
                if (courses && courses.length > 0) {
                    coursesList += this.generateCourseList(type, courses, sem);
                }
            });

            // Create semester card
            const card = document.createElement("div");
            card.className = "bg-white rounded-lg shadow p-4";
            card.innerHTML = `
                <h3 class="text-lg font-semibold mb-4">${data.name}</h3>
                ${coursesList}
            `;
            semesterContainer.appendChild(card);
        });

        // Add remove button to each course card
        const courseCards = document.querySelectorAll(".course-card");
        courseCards.forEach((card) => {
            const courseCode = card.dataset.courseCode;
            const removeButton = card.querySelector(".remove-course");
            if (removeButton) {
                removeButton.addEventListener("click", (e) => {
                    e.preventDefault();
                    if (
                        confirm("Are you sure you want to remove this course?")
                    ) {
                        this.removeCourse(courseCode);
                    }
                });
            }
        });
    }

    generateCourseList(type, courses, sem) {
        return `
            <div class="mb-4">
                <h4 class="text-sm font-medium text-gray-700 mb-2">${this.getCourseTypeLabel(
                    type
                )}</h4>
                <div class="space-y-2">
                    ${courses
                        .map((course) => {
                            const existingCourse = this.courses.find(
                                (c) => c.code === course.code
                            );
                            return `
                            <div class="flex items-center justify-between bg-gray-50 p-2 rounded ${
                                existingCourse
                                    ? "border-l-4 border-green-500"
                                    : ""
                            }">
                                <div class="flex items-center">
                                    ${
                                        existingCourse
                                            ? `<svg class="w-5 h-5 text-green-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                                        </svg>`
                                            : ""
                                    }
                                    <div>
                                        <div class="text-sm font-medium">${
                                            course.name
                                        }</div>
                                        <div class="text-xs text-gray-500">${
                                            course.code
                                        } • ${course.credits} credits</div>
                                        ${
                                            existingCourse
                                                ? `<div class="text-xs text-green-600 font-medium">Grade: ${Object.keys(
                                                      GRADES
                                                  ).find(
                                                      (key) =>
                                                          GRADES[key] ===
                                                          existingCourse.grade
                                                  )}</div>`
                                                : ""
                                        }
                                    </div>
                                </div>
                                <select 
                                    class="grade-select text-sm border-gray-300 rounded-md ${
                                        existingCourse ? "hidden" : ""
                                    }"
                                    data-course-code="${course.code}"
                                    data-semester="${sem}"
                                    data-type="${type}"
                                >
                                    <option value="">Grade</option>
                                    ${Object.entries(GRADES)
                                        .map(
                                            ([grade, value]) => `
                                            <option value="${value}">${grade}</option>
                                        `
                                        )
                                        .join("")}
                                </select>
                            </div>
                        `;
                        })
                        .join("")}
                </div>
            </div>
        `;
    }

    handleGradeChange(e) {
        const select = e.target;
        const grade = parseInt(select.value);
        if (!grade && grade !== 0) return;

        const courseCode = select.dataset.courseCode;
        const semester = select.dataset.semester;
        const type = select.dataset.type;

        if (
            type === "institute_elective" &&
            this.selectedInstituteElectives.has(courseCode)
        ) {
            alert(
                "This institute elective has already been selected in another semester"
            );
            select.value = "";
            return;
        }

        const selectedCourse = this.curriculumData[this.currentBranch][
            semester
        ].courses[type].find((c) => c.code === courseCode);

        const course = {
            semester: parseInt(semester),
            code: courseCode,
            name: selectedCourse.name,
            type: this.getCourseTypeLabel(type),
            credits: selectedCourse.credits,
            grade: grade,
            id: Date.now(),
        };

        if (type === "institute_elective") {
            this.selectedInstituteElectives.add(courseCode);
            this.disableInstituteElectiveInOtherSemesters(courseCode);
        }

        this.addCourse(course);
        this.updateResults();

        // Refresh the semester view to show the updated UI
        this.initializeSemesterView();
    }

    disableInstituteElectiveInOtherSemesters(courseCode) {
        const semesterViews =
            this.semesterViewSection.querySelectorAll(".grade-select");
        semesterViews.forEach((select) => {
            if (
                select.dataset.type === "institute_elective" &&
                select.dataset.courseCode === courseCode &&
                !select.disabled
            ) {
                select.disabled = true;
                select.value = "";
            }
        });
    }

    handleFormSubmit(e) {
        e.preventDefault();

        const semester = parseInt(this.semesterSelect.value);
        const courseType = this.courseTypeSelect.value;
        const courseCode = this.courseNameSelect.value;
        const grade = parseInt(this.gradeSelect.value);

        if (
            !semester ||
            !courseType ||
            !courseCode ||
            (!grade && grade !== 0)
        ) {
            alert("Please fill all fields");
            return;
        }

        // Check if course already exists
        if (this.courses.some((c) => c.code === courseCode)) {
            alert("This course has already been added");
            return;
        }

        let selectedCourse;
        const semesterData = this.curriculumData[this.currentBranch][semester];

        // Find the course in the curriculum
        if (courseType === "specialization" && this.currentSpecialization) {
            const specializations =
                this.currentBranch === "cse"
                    ? CSE_SPECIALIZATIONS
                    : ECE_SPECIALIZATIONS;
            const specializationCourses = [
                ...specializations[this.currentSpecialization].courses
                    .semester6,
                ...specializations[this.currentSpecialization].courses
                    .semester7,
            ];
            selectedCourse = specializationCourses.find(
                (c) => c.code === courseCode
            );
        } else {
            selectedCourse = semesterData.courses[courseType].find(
                (c) => c.code === courseCode
            );
        }

        if (!selectedCourse) {
            alert("Course not found in curriculum");
            return;
        }

        const course = {
            semester,
            code: courseCode,
            name: selectedCourse.name,
            type: courseType,
            credits: selectedCourse.credits,
            grade: grade,
        };

        // Add course and update UI
        this.courses.push(course);
        this.saveToStorage();
        this.renderCourses();
        this.updateResults();

        // Reset form
        this.form.reset();
        this.updateCourseOptions();

        // Add flash effect to button
        const submitButton = e.target.querySelector('button[type="submit"]');
        submitButton.classList.add("ring-2", "ring-green-500");
        setTimeout(() => {
            submitButton.classList.remove("ring-2", "ring-green-500");
        }, 2000);
    }

    addCourse(course) {
        this.courses.push(course);

        const row = document.createElement("tr");
        row.innerHTML = `
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                <div class="font-medium">${course.name}</div>
                <div class="text-gray-500">Semester ${course.semester} - ${
            course.type
        }</div>
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">${
                course.credits
            }</td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                ${
                    Object.entries(GRADES).find(
                        ([_, value]) => value === course.grade
                    )[0]
                }
            </td>
            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <button 
                    class="text-red-600 hover:text-red-900 delete-course"
                    data-code="${course.code}"
                >
                    Remove
                </button>
            </td>
        `;
        this.courseTableBody.appendChild(row);
    }

    removeCourse(courseCode) {
        // Remove from courses array
        this.courses = this.courses.filter(
            (course) => course.code !== courseCode
        );

        // Remove from selected electives if it's an elective
        this.selectedInstituteElectives.delete(courseCode);

        // Remove from custom courses if it's a custom course
        this.customCourses = this.customCourses.filter(
            (course) => course.code !== courseCode
        );

        // Save the updated state
        this.saveToStorage();

        // Update the UI
        this.renderCourses();
        this.updateResults();
        this.initializeSemesterView();
    }

    renderCourses() {
        // Update table view for desktop
        this.courseTableBody.innerHTML = "";

        // Add desktop table rows
        this.courses.forEach((course) => {
            const row = document.createElement("tr");
            row.className = "hover:bg-gray-50 transition-colors duration-200";
            row.innerHTML = `
                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="font-medium text-gray-900">${course.name}</div>
                    <div class="text-sm text-gray-500">${course.code}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${course.credits}
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${
                        Object.entries(GRADES).find(
                            ([_, value]) => value === course.grade
                        )[0]
                    }
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-sm">
                    <button class="text-red-600 hover:text-red-800 font-medium delete-course" data-code="${
                        course.code
                    }">
                        Remove
                    </button>
                </td>
            `;
            this.courseTableBody.appendChild(row);
        });

        // Update mobile view (keep existing mobile code)
        const mobileContainer = document.getElementById("courseCardsMobile");
        mobileContainer.innerHTML = "";

        this.courses.forEach((course) => {
            const card = document.createElement("div");
            card.className = "bg-gray-50 rounded-lg p-4 border border-gray-200";
            card.innerHTML = `
                <div class="flex justify-between items-start">
                    <div>
                        <h3 class="font-medium text-gray-900">${
                            course.name
                        }</h3>
                        <p class="text-sm text-gray-500 mt-0.5">${
                            course.code
                        }</p>
                    </div>
                    <span class="text-sm font-medium text-green-700">
                        Grade: ${
                            Object.entries(GRADES).find(
                                ([_, value]) => value === course.grade
                            )[0]
                        }
                    </span>
                </div>
                <div class="flex justify-between items-center mt-3 pt-3 border-t border-gray-200">
                    <span class="text-sm text-gray-600">Credits: ${
                        course.credits
                    }</span>
                    <button class="text-red-600 hover:text-red-800 text-sm font-medium delete-course" data-code="${
                        course.code
                    }">
                        Remove
                    </button>
                </div>
            `;
            mobileContainer.appendChild(card);
        });

        // Add event listeners to delete buttons
        document.querySelectorAll(".delete-course").forEach((button) => {
            button.addEventListener("click", () => {
                if (confirm("Are you sure you want to remove this course?")) {
                    this.removeCourse(button.dataset.code);
                }
            });
        });

        // Show/hide result card and update stats
        this.updateResults();
    }

    updateResults() {
        if (this.courses.length === 0) {
            this.resultCard.classList.add("hidden");
            return;
        }

        // Calculate semester-wise stats
        const semesterGPAs = {};
        const semesterCredits = {};
        const semesterWeightedSums = {};

        this.courses.forEach((course) => {
            const sem = parseInt(course.semester); // Parse semester to number
            if (!semesterGPAs[sem]) {
                semesterGPAs[sem] = 0;
                semesterCredits[sem] = 0;
                semesterWeightedSums[sem] = 0;
            }
            semesterGPAs[sem] += course.grade * course.credits;
            semesterCredits[sem] += course.credits;
            semesterWeightedSums[sem] += course.grade * course.credits;
        });

        // Calculate total stats
        let totalCredits = 0;
        let totalWeightedSum = 0;

        Object.keys(semesterGPAs).forEach((sem) => {
            totalCredits += semesterCredits[sem];
            totalWeightedSum += semesterGPAs[sem];
        });

        // Update UI
        this.resultCard.classList.remove("hidden");

        // Update CGPA
        const cgpa = totalWeightedSum / totalCredits;
        document.getElementById("cgpaResult").textContent = cgpa.toFixed(2);

        // Update current semester GPA
        const currentSem = Math.max(...Object.keys(semesterGPAs).map(Number));
        const currentGPA =
            semesterGPAs[currentSem] / semesterCredits[currentSem];
        this.gpaResult.textContent = currentGPA.toFixed(2);

        // Update total credits
        this.totalCredits.textContent = totalCredits;

        // Update SGPA chart
        const sgpaLabels = [];
        const sgpaData = [];

        // Sort semesters and calculate SGPA for each
        Object.keys(semesterGPAs)
            .sort((a, b) => a - b)
            .forEach((sem) => {
                sgpaLabels.push(`Sem ${sem}`);
                const sgpa = semesterGPAs[sem] / semesterCredits[sem];
                sgpaData.push(sgpa.toFixed(2));
            });

        // Update sgpa chart
        if (this.sgpaChart) {
            this.sgpaChart.data.labels = sgpaLabels;
            this.sgpaChart.data.datasets[0].data = sgpaData;
            this.sgpaChart.update();
        }

         // Update CGPA chart
        const cgpaLabels = [];
        const cgpaData = [];
        let cumulativeSum = 0;
        let cumulativeCredits = 0;

        Object.keys(semesterWeightedSums)
            .sort((a, b) => a - b)
            .forEach((sem) => {
                cgpaLabels.push(`Sem ${sem}`);
                cumulativeSum += semesterWeightedSums[sem];
                cumulativeCredits += semesterCredits[sem];

                const semesterCGPA = (cumulativeSum / cumulativeCredits).toFixed(2);
                cgpaData.push(semesterCGPA);
            });

        if (this.cgpaChart) {
            this.cgpaChart.data.labels = cgpaLabels;
            this.cgpaChart.data.datasets[0].data = cgpaData;
            this.cgpaChart.update();
        }

    }

    updateCGPAChart(semesterWeightedSums, semesterCredits) {
        const labels = [];
        const data = [];
        let cumulativeSum = 0;
        let cumulativeCredits = 0;
    
        // Sort semesters and calculate cumulative CGPA for each
        Object.keys(semesterWeightedSums)
            .sort((a, b) => a - b)
            .forEach((sem) => {
                labels.push(`Sem ${sem}`);
                cumulativeSum += semesterWeightedSums[sem];
                cumulativeCredits += semesterCredits[sem];
    
                const cgpa = (cumulativeSum / cumulativeCredits).toFixed(2);
                data.push(cgpa);
            });
    
        // Update chart
        this.cgpaChart.data.labels = labels;
        this.cgpaChart.data.datasets[0].data = data;
        this.cgpaChart.update();
    }
    
    

    updateSGPAChart(semesterGPAs, semesterCredits) {
        const labels = [];
        const data = [];

        // Sort semesters and calculate SGPA for each
        Object.keys(semesterGPAs)
            .sort((a, b) => a - b)
            .forEach((sem) => {
                labels.push(`Sem ${sem}`);
                const sgpa = semesterGPAs[sem] / semesterCredits[sem];
                data.push(sgpa.toFixed(2));
            });

        // Update chart
        this.sgpaChart.data.labels = labels;
        this.sgpaChart.data.datasets[0].data = data;
        this.sgpaChart.update();
    }

    clearAll() {
        if (
            confirm(
                "Are you sure you want to clear all data? This cannot be undone."
            )
        ) {
            // Clear all data
            this.courses = [];
            this.selectedInstituteElectives.clear();
            this.customCourses = [];

            // Clear storage
            this.clearStorage();

            // Reload the page instead of manual UI updates
            window.location.reload();
        }
    }

    loadFromStorage() {
        try {
            const savedState = localStorage.getItem("gradeCalculatorState");
            return savedState ? JSON.parse(savedState) : null;
        } catch (error) {
            console.error("Failed to load state:", error);
            return null;
        }
    }

    clearStorage() {
        try {
            localStorage.removeItem("gradeCalculatorState");
            return true;
        } catch (error) {
            console.error("Failed to clear storage:", error);
            return false;
        }
    }

    initializeSpecializationSelect() {
        const specializationSelect = document.getElementById(
            "specializationSelect"
        );
        specializationSelect.addEventListener("change", () => {
            this.currentSpecialization = specializationSelect.value;
            this.updateCurriculum();
            this.initializeSemesterView();
        });
    }

    updateSpecializationOptions() {
        const specializationSelect = document.getElementById(
            "specializationSelect"
        );
        specializationSelect.innerHTML =
            '<option value="">No Specialization</option>';

        const specializations =
            this.currentBranch === "cse"
                ? CSE_SPECIALIZATIONS
                : ECE_SPECIALIZATIONS;

        Object.entries(specializations).forEach(([key, spec]) => {
            specializationSelect.innerHTML += `
                <option value="${key}">${spec.name}</option>
            `;
        });
    }

    updateCurriculum() {
        const curriculum = this.curriculumData[this.currentBranch];

        // Handle specialization courses
        if (this.currentSpecialization) {
            const specializations =
                this.currentBranch === "cse"
                    ? CSE_SPECIALIZATIONS
                    : ECE_SPECIALIZATIONS;
            const specializationData =
                specializations[this.currentSpecialization];

            // Ensure courses object exists
            curriculum[6].courses = curriculum[6].courses || {};
            curriculum[7].courses = curriculum[7].courses || {};

            curriculum[6].courses.specialization =
                specializationData.courses.semester6;
            curriculum[7].courses.specialization =
                specializationData.courses.semester7;
        }

        // Handle Honors courses
        for (let sem = 5; sem <= 8; sem++) {
            curriculum[sem].courses = curriculum[sem].courses || {};
            if (this.isHonors) {
                curriculum[sem].courses.honors = [HONORS_COURSES[sem]];
            } else {
                delete curriculum[sem].courses.honors;
            }
        }

        // Handle BTP courses
        curriculum[6].courses = curriculum[6].courses || {};
        curriculum[7].courses = curriculum[7].courses || {};
        curriculum[6].courses.btp = [BTP_COURSES[6]];
        curriculum[7].courses.btp = [BTP_COURSES[7]];

        // Refresh view
        this.initializeSemesterView();
    }

    initializeHonorsAndBTP() {
        const honorsSelect = document.getElementById("honorsSelect");
        honorsSelect.addEventListener("change", () => {
            this.isHonors = honorsSelect.value === "yes";
            this.updateCurriculum();
            this.initializeSemesterView();
        });

        // BTP is mandatory, so always show it
        this.updateCurriculum();
    }

    getCourseTypeLabel(type) {
        if (type === "honors") {
            return "Honors Project";
        } else if (type === "btp") {
            return "Bachelor Thesis Project";
        } else if (type === "specialization") {
            const specializations =
                this.currentBranch === "cse"
                    ? CSE_SPECIALIZATIONS
                    : ECE_SPECIALIZATIONS;
            return `${
                specializations[this.currentSpecialization].name
            } Specialization`;
        } else if (type === "custom") {
            return "Custom Course";
        }
        return COURSE_TYPES[type];
    }

    // Update validation for credit requirements
    validateCredits() {
        const btpCredits = this.courses
            .filter((c) => c.type === "Bachelor Thesis Project")
            .reduce((sum, c) => sum + c.credits, 0);

        const honorsCredits = this.courses
            .filter((c) => c.type === "Honors Project")
            .reduce((sum, c) => sum + c.credits, 0);

        if (btpCredits < 8) {
            alert("You need to complete 8 credits of Bachelor Thesis Project");
            return false;
        }

        if (this.isHonors && honorsCredits < 8) {
            alert(
                "You need to complete 8 credits of Honors Project for Honors degree"
            );
            return false;
        }

        return true;
    }

    initializeCustomCourseForm() {
        const form = document.getElementById("customCourseForm");
        form.addEventListener("submit", (e) =>
            this.handleCustomCourseSubmit(e)
        );
    }

    handleCustomCourseSubmit(e) {
        e.preventDefault();

        const customCourse = {
            name: document.getElementById("customCourseName").value,
            code:
                document.getElementById("customCourseCode").value ||
                `CUSTOM${Date.now()}`,
            credits: parseInt(
                document.getElementById("customCourseCredits").value
            ),
            semester: parseInt(
                document.getElementById("customCourseSemester").value
            ),
            type: document.getElementById("customCourseType").value,
            branch: this.currentBranch,
            timestamp: new Date().toISOString(),
        };

        // Add to custom courses
        this.customCourses.push(customCourse);

        // Save to storage
        this.saveToStorage();

        // Send email directly
        this.sendCustomCourseEmail(customCourse);

        // Add to curriculum
        this.addCustomCourseToCurriculum(customCourse);

        // Reset form
        e.target.reset();
        alert("Course added successfully! Admin will be notified.");
    }

    sendCustomCourseEmail(course) {
        const emailBody = `
Hi,

A new course has been suggested for the IIITS Grade Calculator:

Course Name: ${course.name}
Credits: ${course.credits}
Semester: ${course.semester}
Type: ${COURSE_TYPES[course.type]}
Branch: ${course.branch.toUpperCase()}

Thanks!`;

        // Open default email client with pre-filled content
        window.location.href = `mailto:varunrmantri23@gmail.com?subject=New Course Suggestion - IIITS Grade Calculator&body=${encodeURIComponent(
            emailBody
        )}`;
    }

    loadCustomCourses() {
        const savedCustomCourses = localStorage.getItem("customCourses");
        if (savedCustomCourses) {
            this.customCourses = JSON.parse(savedCustomCourses);
            this.customCourses.forEach((course) =>
                this.addCustomCourseToCurriculum(course)
            );
        }
    }

    addCustomCourseToCurriculum(course) {
        const curriculum = this.curriculumData[course.branch];
        if (!curriculum[course.semester].courses.custom) {
            curriculum[course.semester].courses.custom = [];
        }
        curriculum[course.semester].courses.custom.push({
            code: course.code,
            name: course.name,
            credits: course.credits,
        });
        this.initializeSemesterView();
    }

    // New unified storage handling
    initializeFromStorage() {
        const savedState = this.loadFromStorage();
        if (savedState) {
            this.courses = savedState.courses || [];
            this.selectedInstituteElectives = new Set(
                savedState.selectedInstituteElectives || []
            );
            this.currentSpecialization = savedState.currentSpecialization || "";
            this.isHonors = savedState.isHonors || false;
            this.customCourses = savedState.customCourses || [];

            // Update UI with saved state
            document.getElementById("specializationSelect").value =
                this.currentSpecialization;
            document.getElementById("honorsSelect").value = this.isHonors
                ? "yes"
                : "no";

            // Render courses and update results (which includes the chart)
            this.renderCourses();
        }
    }

    saveToStorage() {
        const state = {
            currentBranch: this.currentBranch,
            courses: this.courses,
            selectedInstituteElectives: Array.from(
                this.selectedInstituteElectives
            ),
            currentSpecialization: this.currentSpecialization,
            isHonors: this.isHonors,
            customCourses: this.customCourses,
            lastUpdated: new Date().toISOString(),
        };

        try {
            localStorage.setItem("gradeCalculatorState", JSON.stringify(state));
            return true;
        } catch (error) {
            console.error("Failed to save state:", error);
            return false;
        }
    }

    setupSemesterViewGradeSelects() {
        // Add event delegation for grade selects in semester view
        document
            .querySelector("#semesterViewSection")
            .addEventListener("change", (e) => {
                if (e.target.classList.contains("grade-select")) {
                    this.handleSemesterViewGradeChange(e.target);
                }
            });
    }

    handleSemesterViewGradeChange(select) {
        const grade = parseInt(select.value);
        if (!grade && grade !== 0) return;

        const courseCode = select.dataset.courseCode;
        const semester = parseInt(select.dataset.semester);
        const type = select.dataset.type;

        // Check if course already exists
        if (this.courses.some((c) => c.code === courseCode)) {
            alert("This course has already been added");
            select.value = "";
            return;
        }

        // Find the course in curriculum
        let selectedCourse;
        if (type === "specialization" && this.currentSpecialization) {
            const specializations =
                this.currentBranch === "cse"
                    ? CSE_SPECIALIZATIONS
                    : ECE_SPECIALIZATIONS;
            const specializationCourses = [
                ...specializations[this.currentSpecialization].courses
                    .semester6,
                ...specializations[this.currentSpecialization].courses
                    .semester7,
            ];
            selectedCourse = specializationCourses.find(
                (c) => c.code === courseCode
            );
        } else {
            selectedCourse = this.curriculumData[this.currentBranch][
                semester
            ].courses[type].find((c) => c.code === courseCode);
        }

        if (!selectedCourse) {
            alert("Course not found");
            select.value = "";
            return;
        }

        // Create course object
        const course = {
            semester,
            code: courseCode,
            name: selectedCourse.name,
            type,
            credits: selectedCourse.credits,
            grade,
        };

        // Add course and update UI
        this.courses.push(course);
        this.saveToStorage();
        this.renderCourses();
        this.updateResults();
        this.initializeSemesterView();
    }

    initializeChart() {
        const ctx = document.getElementById("sgpaChart").getContext("2d");
        this.sgpaChart = new Chart(ctx, {
            type: "line",
            data: {
                labels: [],
                datasets: [
                    {
                        label: "SGPA",
                        data: [],
                        borderColor: "rgb(59, 130, 246)",
                        backgroundColor: "rgba(59, 130, 246, 0.1)",
                        tension: 0.4,
                        fill: true,
                    },
                ],
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: false,
                    },
                },
                scales: {
                    y: {
                        min: 0,
                        max: 10,
                        ticks: {
                            stepSize: 2,
                        },
                    },
                },
            },
        });

        const gtx = document.getElementById("cgpaChart").getContext("2d");
        this.cgpaChart = new Chart(gtx, {
            type: "line",
            data: {
                labels: [],
                datasets: [
                    {
                        label: "CGPA",
                        data: [],
                        borderColor: "rgb(59, 130, 246)",
                        backgroundColor: "rgba(59, 130, 246, 0.1)",
                        tension: 0.4,
                        fill: true,
                    },
                ],
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        display: false,
                    },
                },
                scales: {
                    y: {
                        min: 0,
                        max: 10,
                        ticks: {
                            stepSize: 2,
                        },
                    },
                },
            },
        });
    }
}

// Initialize the calculator
const calculator = new GradeCalculator();

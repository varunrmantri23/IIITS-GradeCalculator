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

// Updated curriculum structure with semester-wise distribution
const CURRICULUM = {
    1: {
        name: "Semester 1",
        courses: {
            institute_core: [
                { code: "ICS101", name: "Computer Programming", credits: 4 },
                {
                    code: "IMA101",
                    name: "Discrete Structures and Matrix Algebra",
                    credits: 4,
                },
                {
                    code: "IEC101",
                    name: "Overview of Computers Workshop",
                    credits: 2,
                },
                { code: "IEC102", name: "Digital Logic Design", credits: 4 },
            ],
            ssham: [
                {
                    code: "ISK101",
                    name: "Essential English",
                    credits: 2,
                },
                {
                    code: "SSH001",
                    name: "Foundations in Human Values and Ethics",
                    credits: 2,
                },
                { code: "SSH002", name: "Energy and Environment", credits: 2 },
            ],
        },
    },
    2: {
        name: "Semester 2",
        courses: {
            institute_core: [
                {
                    code: "IMA102",
                    name: "Probability and Statistics",
                    credits: 4,
                },
                {
                    code: "ICS201",
                    name: "Data Structures and Algorithms",
                    credits: 4,
                },
                { code: "IEC204", name: "Signals and Systems", credits: 4 },
            ],
            program_core: [
                { code: "ICS103", name: "Computer Architecture", credits: 4 },
            ],
            ssham: [
                {
                    code: "ISK102",
                    name: "Operational Communication",
                    credits: 2,
                },
            ],
        },
    },
    3: {
        name: "Semester 3",
        courses: {
            institute_core: [
                {
                    code: "IMA103",
                    name: "Real Analysis, Numerical Analysis and Calculus",
                    credits: 4,
                },
                {
                    code: "ICS102",
                    name: "Object Oriented Programming",
                    credits: 4,
                },
            ],
            program_core: [
                {
                    code: "ICS202",
                    name: "Advanced Data Structures and Algorithms",
                    credits: 4,
                },
                { code: "ICS203", name: "Operating Systems", credits: 4 },
                {
                    code: "ICS204",
                    name: "Database Management Systems",
                    credits: 4,
                },
            ],
            ssham: [
                {
                    code: "ISK201",
                    name: "Professional Communication",
                    credits: 2,
                },
            ],
        },
    },
    4: {
        name: "Semester 4",
        courses: {
            institute_core: [
                {
                    code: "IEC255",
                    name: "Computer and Communication Networks",
                    credits: 4,
                },
            ],
            program_core: [
                {
                    code: "ICS301",
                    name: "Fundamentals of Full Stack Development",
                    credits: 4,
                },
                { code: "ICS400", name: "Theory of Computation", credits: 4 },
                { code: "ICS341", name: "Artificial Intelligence", credits: 4 },
            ],
            ssham: [
                {
                    code: "ISK202",
                    name: "Advanced Communication Skills",
                    credits: 2,
                },
            ],
        },
    },
    5: {
        name: "Semester 5",
        courses: {
            program_core: [
                {
                    code: "ICS302",
                    name: "Framework Driven Front-End Development",
                    credits: 4,
                },
            ],
            program_elective: [
                {
                    code: "PE001",
                    name: "Agent Based Modelling & Simulations",
                    credits: 3,
                },
                { code: "PE002", name: "Cloud Computing", credits: 3 },
                { code: "PE003", name: "Compiler Design", credits: 3 },
                {
                    code: "PE004",
                    name: "Computer Graphics and Multimedia",
                    credits: 3,
                },
            ],
        },
    },
    6: {
        name: "Semester 6",
        courses: {
            program_core: [
                {
                    code: "ICS303",
                    name: "Web Services and Backend Development",
                    credits: 4,
                },
            ],
            program_elective: [
                { code: "PE005", name: "Computer Vision", credits: 3 },
                { code: "PE006", name: "Data Mining", credits: 3 },
                { code: "PE007", name: "Distributed Computing", credits: 3 },
                {
                    code: "PE008",
                    name: "High-Performance Computing",
                    credits: 3,
                },
            ],
        },
    },
    7: {
        name: "Semester 7",
        courses: {
            program_elective: [
                { code: "PE009", name: "Information Retrieval", credits: 3 },
                { code: "PE010", name: "Machine Learning", credits: 3 },
                {
                    code: "PE011",
                    name: "Natural Language Processing",
                    credits: 3,
                },
            ],
        },
    },
    8: {
        name: "Semester 8",
        courses: {
            program_elective: [
                {
                    code: "PE012",
                    name: "Principles of Cyber Physical System",
                    credits: 3,
                },
                {
                    code: "PE013",
                    name: "Soft Computing and evolutionary AI",
                    credits: 3,
                },
            ],
        },
    },
};

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
        this.saveDataBtn = document.getElementById("saveData");
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
        this.saveDataBtn.addEventListener("click", () => this.saveData());
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
        this.initializeSemesterView();

        // Reset form
        this.form.reset();
        this.courseTypeSelect.innerHTML =
            '<option value="">Select Type</option>';
        this.courseNameSelect.innerHTML =
            '<option value="">Select Course</option>';
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

        // Update card view for mobile
        const mobileContainer = document.getElementById("courseCardsMobile");
        mobileContainer.innerHTML = "";

        this.courses.forEach((course) => {
            // Add to table view (desktop)
            const row = document.createElement("tr");
            row.innerHTML = `
                <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    <div class="font-medium">${course.name}</div>
                    <div class="text-gray-500">${course.code}</div>
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
                    <button class="text-red-600 hover:text-red-900 delete-course" data-code="${
                        course.code
                    }">
                        Remove
                    </button>
                </td>
            `;
            this.courseTableBody.appendChild(row);

            // Add to card view (mobile)
            const card = document.createElement("div");
            card.className = "bg-gray-50 rounded-lg p-4 relative";
            card.innerHTML = `
                <div class="flex justify-between items-start mb-2">
                    <div>
                        <h3 class="font-medium text-gray-900">${
                            course.name
                        }</h3>
                        <p class="text-sm text-gray-500">${course.code}</p>
                    </div>
                    <div class="flex items-center space-x-3">
                        <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            course.grade >= 8
                                ? "bg-green-100 text-green-800"
                                : course.grade >= 6
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                        }">
                            Grade: ${
                                Object.entries(GRADES).find(
                                    ([_, value]) => value === course.grade
                                )[0]
                            }
                        </span>
                        <button class="text-red-600 hover:text-red-900 delete-course" data-code="${
                            course.code
                        }">
                            <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
                            </svg>
                        </button>
                    </div>
                </div>
                <div class="flex justify-between items-center text-sm text-gray-500">
                    <span>Credits: ${course.credits}</span>
                    <span>Type: ${this.getCourseTypeLabel(course.type)}</span>
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

        // Show/hide result card
        if (this.courses.length > 0) {
            this.resultCard.classList.remove("hidden");
        } else {
            this.resultCard.classList.add("hidden");
        }
    }

    updateResults() {
        if (this.courses.length === 0) {
            this.resultCard.classList.add("hidden");
            return;
        }

        const semesterGPAs = {};
        const semesterCredits = {};

        this.courses.forEach((course) => {
            if (!semesterGPAs[course.semester]) {
                semesterGPAs[course.semester] = 0;
                semesterCredits[course.semester] = 0;
            }
            semesterGPAs[course.semester] += course.credits * course.grade;
            semesterCredits[course.semester] += course.credits;
        });

        let totalCredits = 0;
        let totalWeightedSum = 0;

        Object.keys(semesterGPAs).forEach((sem) => {
            const semGPA = semesterGPAs[sem] / semesterCredits[sem];
            totalCredits += semesterCredits[sem];
            totalWeightedSum += semesterGPAs[sem];
        });

        const cgpa = totalWeightedSum / totalCredits;

        this.resultCard.classList.remove("hidden");
        this.resultCard.innerHTML = `
            <h2 class="text-lg font-semibold mb-4">Your Results</h2>
            
            <div class="mb-6">
                <h3 class="text-md font-medium mb-2">Semester-wise GPA</h3>
                <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
                    ${Object.keys(semesterGPAs)
                        .map(
                            (sem) => `
                        <div class="p-3 bg-gray-50 rounded-lg">
                            <p class="text-sm text-gray-600">Semester ${sem}</p>
                            <p class="text-lg font-bold">${(
                                semesterGPAs[sem] / semesterCredits[sem]
                            ).toFixed(2)}</p>
                            <p class="text-xs text-gray-500">${
                                semesterCredits[sem]
                            } credits</p>
                        </div>
                    `
                        )
                        .join("")}
                </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div class="p-4 bg-blue-50 rounded-lg">
                    <p class="text-sm text-blue-600">CGPA</p>
                    <p class="text-2xl font-bold text-blue-900">${cgpa.toFixed(
                        2
                    )}</p>
                </div>
                <div class="p-4 bg-gray-50 rounded-lg">
                    <p class="text-sm text-gray-600">Total Credits</p>
                    <p class="text-2xl font-bold text-gray-900">${totalCredits}</p>
                </div>
            </div>
        `;
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

            // Reset UI
            this.courseTableBody.innerHTML = "";
            this.updateResults();
            this.initializeSemesterView();

            // Reset dropdowns
            document.getElementById("specializationSelect").value = "";
            document.getElementById("honorsSelect").value = "no";
            this.isHonors = false;

            // Update curriculum
            this.updateCurriculum();
        }
    }

    saveData() {
        if (this.saveToStorage()) {
            alert("Data saved successfully!");
        } else {
            alert("Failed to save data. Please try again.");
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
            this.currentBranch = savedState.currentBranch || "cse";
            this.courses = savedState.courses || [];
            this.selectedInstituteElectives = new Set(
                savedState.selectedInstituteElectives || []
            );
            this.currentSpecialization = savedState.currentSpecialization || "";
            this.isHonors = savedState.isHonors || false;
            this.customCourses = savedState.customCourses || [];

            // Update UI
            this.branchSelect.value = this.currentBranch;
            document.getElementById("specializationSelect").value =
                this.currentSpecialization;
            document.getElementById("honorsSelect").value = this.isHonors
                ? "yes"
                : "no";

            this.updateSpecializationOptions();
            this.updateCurriculum();
            this.renderCourses();
            this.updateResults();
            this.initializeSemesterView();

            // Add custom courses to curriculum
            this.customCourses.forEach((course) =>
                this.addCustomCourseToCurriculum(course)
            );
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
}

// Initialize the calculator
const calculator = new GradeCalculator();

const GRADES = {
    O: 10,
    A: 9,
    B: 8,
    C: 7,
    D: 6,
    E: 5,
    F: 0,
};

const COURSE_TYPES = {
    institute_core: "Institute Core",
    program_core: "Program Core",
    program_elective: "Program Elective",
    institute_elective: "Institute Elective",
    ssham: "SSHAM",
    specialization: "Specialization Course",
    honors: "Honors Project",
    btp: "Bachelor Thesis Project",
};

// Institute Electives (can be taken in semesters 5-8)
const INSTITUTE_ELECTIVES = [
    { code: "IIE001", name: "Introduction to Data Analytics", credits: 3 },
    { code: "IIE002", name: "Internet of Things", credits: 3 },
    { code: "IIE003", name: "Brain Computer Interface", credits: 3 },
    { code: "IIE004", name: "Geo-spatial and Temporal Analytics", credits: 3 },
];

// SSHAM Electives for semesters 5-8
const SSHAM_ELECTIVES = [
    { code: "SSH501", name: "Bioinformatics", credits: 2 },
    { code: "SSH502", name: "Skills for Employability", credits: 2 },
    { code: "SSH503", name: "Quantitative and Reasoning Aptitude", credits: 2 },
    { code: "SSH504", name: "Personal Growth Programme", credits: 2 },
    {
        code: "SSH505",
        name: "Macro-economics and Personal Finance",
        credits: 2,
    },
    { code: "SSH506", name: "IT Project Management", credits: 2 },
    { code: "SSH507", name: "Innovation and Entrepreneurship", credits: 2 },
    { code: "SSH508", name: "Climate Change and its Implications", credits: 2 },
    { code: "SSH509", name: "ICT for Development", credits: 2 },
    {
        code: "QIC101",
        name: "Quantum Information & Computing",
        credits: 2,
    },
];

// BTP Courses
const BTP_COURSES = {
    6: { code: "BTP601", name: "Bachelor Thesis Project Part 1", credits: 4 },
    7: { code: "BTP701", name: "Bachelor Thesis Project Part 2", credits: 4 },
};

// Honors Courses
const HONORS_COURSES = {
    5: { code: "HON501", name: "Honors Project 1", credits: 4 },
    6: { code: "HON601", name: "Honors Project 2", credits: 4 },
    7: { code: "HON701", name: "Honors Project 3", credits: 4 },
    8: { code: "HON801", name: "Honors Project 4", credits: 4 },
};

// Program Electives
const CSE_PROGRAM_ELECTIVES = [
    { code: "PE001", name: "Agent Based Modelling & Simulations", credits: 3 },
    { code: "PE002", name: "Cloud Computing", credits: 3 },
    { code: "PE003", name: "Compiler Design", credits: 3 },
    { code: "PE004", name: "Computer Graphics and Multimedia", credits: 3 },
    { code: "PE005", name: "Computer Vision", credits: 3 },
    { code: "PE006", name: "Data Mining", credits: 3 },
    { code: "PE007", name: "Distributed Computing", credits: 3 },
    { code: "PE008", name: "High-Performance Computing", credits: 3 },
    { code: "PE009", name: "Information Retrieval", credits: 3 },
    { code: "PE010", name: "Machine Learning", credits: 3 },
    { code: "PE011", name: "Natural Language Processing", credits: 3 },
    { code: "PE012", name: "Principles of Cyber Physical System", credits: 3 },
    { code: "PE013", name: "Soft Computing and evolutionary AI", credits: 3 },
];

const ECE_PROGRAM_ELECTIVES = [
    { code: "ECE001", name: "Advanced VLSI", credits: 3 },
    { code: "ECE002", name: "Automotive Electronics", credits: 3 },
    { code: "ECE003", name: "Digital System Design", credits: 3 },
    { code: "ECE004", name: "Electronic Packaging", credits: 3 },
    { code: "ECE005", name: "Measurement and Instrumentation", credits: 3 },
    {
        code: "ECE006",
        name: "Microprocessors and Microcontrollers",
        credits: 3,
    },
    { code: "ECE007", name: "Microsensors and Actuators", credits: 3 },
    {
        code: "ECE008",
        name: "Microwave Engineering and Radar Systems",
        credits: 3,
    },
    { code: "ECE009", name: "Model-based Signal Analysis", credits: 3 },
    { code: "ECE010", name: "Opto Nano Electronics", credits: 3 },
    { code: "ECE011", name: "Pattern Recognition", credits: 3 },
    { code: "ECE012", name: "Wireless Communication", credits: 3 },
];

// Specializations
const CSE_SPECIALIZATIONS = {
    AI_ML: {
        name: "Artificial Intelligence and Machine Learning",
        courses: {
            semester6: [
                { code: "SAI001", name: "Machine Learning", credits: 3 },
                { code: "SAI002", name: "Deep Learning", credits: 3 },
                { code: "SAI003", name: "Reinforcement Learning", credits: 3 },
            ],
            semester7: [
                {
                    code: "SAI004",
                    name: "Industry Applications of AI & ML",
                    credits: 3,
                },
                { code: "SAI005", name: "AI & ML Project", credits: 4 },
            ],
        },
    },
    DATA_SCIENCE: {
        name: "Data Science",
        courses: {
            semester6: [
                {
                    code: "IIE001",
                    name: "Introduction to Data Analytics",
                    credits: 3,
                },
                { code: "SDS002", name: "Advanced Data Analytics", credits: 3 },
                { code: "SDS003", name: "Python for Data Science", credits: 3 },
            ],
            semester7: [
                { code: "SDS004", name: "Big Data Analytics", credits: 3 },
                {
                    code: "SDS005",
                    name: "Industry Applications of Data Science",
                    credits: 3,
                },
                { code: "SDS006", name: "Data Science Project", credits: 4 },
            ],
        },
    },
    CYBER_SECURITY: {
        name: "Cyber Security",
        courses: {
            semester6: [
                {
                    code: "SCS001",
                    name: "Introduction to Cyber Security",
                    credits: 3,
                },
                {
                    code: "SCS002",
                    name: "Network and Data Security",
                    credits: 3,
                },
                { code: "SCS003", name: "Threat Intelligence", credits: 3 },
            ],
            semester7: [
                {
                    code: "SCS004",
                    name: "Cyber Security Regulations",
                    credits: 3,
                },
                { code: "SCS005", name: "Security Project", credits: 4 },
            ],
        },
    },
};

const ECE_SPECIALIZATIONS = {
    CPS: {
        name: "Cyber Physical Systems",
        courses: {
            semester6: [
                { code: "SCPS001", name: "Internet of Things", credits: 3 },
                {
                    code: "SCPS002",
                    name: "Intelligent and Autonomous Systems",
                    credits: 3,
                },
                {
                    code: "SCPS003",
                    name: "Digital Twins: Concepts and Applications",
                    credits: 3,
                },
            ],
            semester7: [
                {
                    code: "SCPS004",
                    name: "Industry Applications of CPS",
                    credits: 3,
                },
                { code: "SCPS005", name: "CPS Project", credits: 4 },
            ],
        },
    },
    WIRELESS: {
        name: "Next Generation Wireless Communication",
        courses: {
            semester6: [
                { code: "SWC001", name: "Wireless Communication", credits: 3 },
                {
                    code: "SWC002",
                    name: "Advanced Wireless Communication",
                    credits: 3,
                },
                {
                    code: "SWC003",
                    name: "5G Technologies and Applications",
                    credits: 3,
                },
            ],
            semester7: [
                {
                    code: "SWC004",
                    name: "Industry Applications of 5G",
                    credits: 3,
                },
                { code: "SWC005", name: "Wireless Project", credits: 4 },
            ],
        },
    },
    DATA_SCIENCE: {
        name: "Data Science",
        courses: {
            semester6: [
                {
                    code: "IIE001",
                    name: "Introduction to Data Analytics",
                    credits: 3,
                },
                { code: "SDS002", name: "Advanced Data Analytics", credits: 3 },
                { code: "SDS003", name: "Python for Data Science", credits: 3 },
            ],
            semester7: [
                { code: "SDS004", name: "Big Data Analytics", credits: 3 },
                {
                    code: "SDS005",
                    name: "Industry Applications of Data Science",
                    credits: 3,
                },
                { code: "SDS006", name: "Data Science Project", credits: 4 },
            ],
        },
    },
};

// Base curricula
const BASE_CSE_CURRICULUM = {
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
                    credits: 4,
                },
                { code: "IEC102", name: "Digital Logic Design", credits: 4 },
            ],
            ssham: [
                { code: "ISK101", name: "Essential English", credits: 2 },
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
                {
                    code: "QIC101",
                    name: "Quantum Information & Computing",
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
            program_elective: CSE_PROGRAM_ELECTIVES,
            institute_elective: INSTITUTE_ELECTIVES,
            ssham: SSHAM_ELECTIVES,
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
            program_elective: CSE_PROGRAM_ELECTIVES,
            institute_elective: INSTITUTE_ELECTIVES,
            ssham: SSHAM_ELECTIVES,
        },
    },
    7: {
        name: "Semester 7",
        courses: {
            program_elective: CSE_PROGRAM_ELECTIVES,
            institute_elective: INSTITUTE_ELECTIVES,
            ssham: SSHAM_ELECTIVES,
        },
    },
    8: {
        name: "Semester 8",
        courses: {
            program_elective: CSE_PROGRAM_ELECTIVES,
            institute_elective: INSTITUTE_ELECTIVES,
            ssham: SSHAM_ELECTIVES,
        },
    },
};

const BASE_ECE_CURRICULUM = {
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
                    credits: 4,
                },
                { code: "IEC102", name: "Digital Logic Design", credits: 4 },
            ],
            ssham: [
                { code: "ISK101", name: "Essential English", credits: 2 },
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
                {
                    code: "IEC103",
                    name: "Basic Electronics Circuits",
                    credits: 4,
                },
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
                    code: "IMA200",
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
                { code: "IEC330", name: "Control Systems", credits: 4 },
                {
                    code: "IEC111",
                    name: "Circuit and Network Analysis",
                    credits: 4,
                },
                { code: "IEC201", name: "Embedded Systems", credits: 4 },
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
                    code: "IEC400",
                    name: "Fundamentals of Communication",
                    credits: 4,
                },
                { code: "ICS400", name: "Theory of Computation", credits: 4 },
                { code: "IEC202", name: "Analog Circuits", credits: 4 },
                {
                    code: "IEC301",
                    name: "Electromagnetics and Transmission Lines",
                    credits: 4,
                },
            ],
            ssham: [
                {
                    code: "ISK202",
                    name: "Advanced Communication Skills",
                    credits: 2,
                },
                {
                    code: "QIC101",
                    name: "Quantum Information & Computing",
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
                    code: "IEC302",
                    name: "Digital Signal Processing",
                    credits: 4,
                },
                { code: "IEC342", name: "Introduction to VLSI", credits: 4 },
            ],
            program_elective: ECE_PROGRAM_ELECTIVES,
            institute_elective: INSTITUTE_ELECTIVES,
            ssham: SSHAM_ELECTIVES,
        },
    },
    6: {
        name: "Semester 6",
        courses: {
            program_elective: ECE_PROGRAM_ELECTIVES,
            institute_elective: INSTITUTE_ELECTIVES,
            ssham: SSHAM_ELECTIVES,
        },
    },
    7: {
        name: "Semester 7",
        courses: {
            program_elective: ECE_PROGRAM_ELECTIVES,
            institute_elective: INSTITUTE_ELECTIVES,
            ssham: SSHAM_ELECTIVES,
        },
    },
    8: {
        name: "Semester 8",
        courses: {
            program_elective: ECE_PROGRAM_ELECTIVES,
            institute_elective: INSTITUTE_ELECTIVES,
            ssham: SSHAM_ELECTIVES,
        },
    },
};

// Helper functions
const updateCurriculumWithBTPAndHonors = (curriculum) => {
    const updatedCurriculum = { ...curriculum };

    // Add BTP to semesters 6-7
    if (!updatedCurriculum[6].courses.btp) {
        updatedCurriculum[6].courses.btp = [BTP_COURSES[6]];
    }
    if (!updatedCurriculum[7].courses.btp) {
        updatedCurriculum[7].courses.btp = [BTP_COURSES[7]];
    }

    // Add Honors slots to semesters 5-8
    for (let sem = 5; sem <= 8; sem++) {
        if (!updatedCurriculum[sem].courses.honors) {
            updatedCurriculum[sem].courses.honors = [HONORS_COURSES[sem]];
        }
    }

    return updatedCurriculum;
};

// Create final curricula
const CSE_CURRICULUM = updateCurriculumWithBTPAndHonors(BASE_CSE_CURRICULUM);
const ECE_CURRICULUM = updateCurriculumWithBTPAndHonors(BASE_ECE_CURRICULUM);

export {
    GRADES,
    COURSE_TYPES,
    CSE_CURRICULUM,
    ECE_CURRICULUM,
    CSE_SPECIALIZATIONS,
    ECE_SPECIALIZATIONS,
    INSTITUTE_ELECTIVES,
    HONORS_COURSES,
    BTP_COURSES,
    SSHAM_ELECTIVES,
};

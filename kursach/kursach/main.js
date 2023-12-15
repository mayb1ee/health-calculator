// ???????? ???? User
class User {
    constructor(height, gender, age, weight, goal) {
        this.height = height;
        this.gender = gender;
        this.age = age;
        this.weight = weight;
        this.goal = goal;
    }

    static validateInput(physicalCharacteristics) {
        return (
            physicalCharacteristics.height &&
            physicalCharacteristics.gender &&
            physicalCharacteristics.age &&
            physicalCharacteristics.weight &&
            physicalCharacteristics.goal
        );
    }
}

// ???????? ???? PhysicalCharacteristics
class PhysicalCharacteristics {
    constructor(height, gender, age, weight, goal) {
        this.height = height;
        this.gender = gender;
        this.age = age;
        this.weight = weight;
        this.goal = goal;
    }
}

// ???????? ???? OptimalPhysicalCharacteristics
class OptimalPhysicalCharacteristics {
    // ??? ?? ?????? ?????? ?????? ??? ?????????? ??????????? ???????? ?????????????
}

// ???????? ???? Diet
class Diet {
    // ??? ?? ?????? ?????? ?????? ??? ?????????? ???????
}

// ???????? ???? SystemServer
class SystemServer {
    static calculateDiet(physicalCharacteristics) {
        console.log("Calculating diet:", physicalCharacteristics);
    }

    static calculateOptimalCharacteristics(physicalCharacteristics) {
        console.log("Calculating optimal characteristics:", physicalCharacteristics);
    }
}

// ???????? ???? Tooltip
class Tooltip {
    static showTooltip(text, lang) {
        const tooltip = document.getElementById("tooltip");
        tooltip.textContent = text;
        tooltip.style.display = "block";

        if (lang === "en") {
            tooltip.style.fontFamily = "Arial, sans-serif";
        } else {
            tooltip.style.fontFamily = "'Times New Roman', Times, serif";
        }

        tooltip.style.left = "50%";
        tooltip.style.transform = "translateX(-50%)";
        tooltip.style.bottom = "20px";
    }

    static hideTooltip() {
        const tooltip = document.getElementById("tooltip");
        tooltip.style.display = "none";
    }

    static checkAndHighlightFields() {
        const errorMessage = document.getElementById("errorMessage");
        const fields = document.querySelectorAll("input, select");
        fields.forEach(field => {
            if (!field.value) {
                field.style.border = "2px solid red";
                field.addEventListener("input", () => {
                    field.style.border = "";
                    errorMessage.style.display = "none";
                });
            }
        });
    }
}

// ... (????????? ???????)

function showError(message) {
    const errorMessage = document.getElementById("errorMessage");
    errorMessage.textContent = message;
    errorMessage.style.display = "block";

    // ?????????? ????? ? ????? Tooltip
    Tooltip.checkAndHighlightFields();
}

function calculateDiet() {
    const physicalCharacteristics = getUserInput();

    if (!User.validateInput(physicalCharacteristics)) {
        showError("Fill in all fields correctly!");
        return;
    }

    // ?????????? ????? ? ????? SystemServer
    SystemServer.calculateDiet(physicalCharacteristics);
}

function calculateOptimalCharacteristics() {
    const physicalCharacteristics = getUserInput();

    if (!User.validateInput(physicalCharacteristics)) {
        showError("Fill in all fields correctly!");
        return;
    }

    // ?????????? ????? ? ????? SystemServer
    SystemServer.calculateOptimalCharacteristics(physicalCharacteristics);
}

// ??????? ????????? ??????? ????? ??? ????????? ?????
function addEventListeners() {
    document.getElementById("calculateDiet").addEventListener("mouseover", () => {
        // ?????????? ????? ? ????? Tooltip
        Tooltip.showTooltip('Diet will be presented as a daily norm of calories, proteins, fats, and carbohydrates.', 'en');
    });

    document.getElementById("calculateDiet").addEventListener("mouseout", () => {
        // ?????????? ????? ? ????? Tooltip
        Tooltip.hideTooltip();
    });

    document.getElementById("calculateOptimal").addEventListener("mouseover", () => {
        // ?????????? ????? ? ????? Tooltip
        Tooltip.showTooltip('Optimal physical characteristics will be presented as ideal weight and normal pulse.', 'en');
    });

    document.getElementById("calculateOptimal").addEventListener("mouseout", () => {
        // ?????????? ????? ? ????? Tooltip
        Tooltip.hideTooltip();
    });

    document.querySelectorAll(".button").forEach(element => {
        element.addEventListener("mouseout", () => {
            // ?????????? ????? ? ????? Tooltip
            Tooltip.hideTooltip();
        });

        // ??????? ?????? ????? ??? ????????? ????? ??? ?????
        element.addEventListener("click", () => {
            const physicalCharacteristics = getUserInput();

            if (!User.validateInput(physicalCharacteristics)) {
                showError("Fill in all fields correctly!");
                return;
            }
        });
    });
}

// ??????? ????????? ??????? ????? ??? ????????? ?????
function getUserInput() {
    const height = document.getElementById("height").value;
    const gender = document.querySelector('input[name="gender"]:checked');
    const age = document.getElementById("age").value;
    const weight = document.getElementById("weight").value;
    const goal = document.getElementById("goal").value;

    return new PhysicalCharacteristics(height, gender ? gender.value : "", age, weight, goal);
}

// ?????????? ???????, ??? ?????? ???????? ?????
addEventListeners();

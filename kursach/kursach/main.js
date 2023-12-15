// Клас, що представляє користувача з фізичними характеристиками
class User {
    constructor(height, gender, age, weight, goal) {
        this.height = height;
        this.gender = gender;
        this.age = age;
        this.weight = weight;
        this.goal = goal;
    }

    // Статичний метод для перевірки коректності введених фізичних характеристик
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

// Клас, що представляє фізичні характеристики користувача
class PhysicalCharacteristics {
    constructor(height, gender, age, weight, goal) {
        this.height = height;
        this.gender = gender;
        this.age = age;
        this.weight = weight;
        this.goal = goal;
    }
}

// Клас, що містить методи для розрахунку оптимальних фізичних характеристик
class OptimalPhysicalCharacteristics {
    static calculateIdealWeight(height, age, gender) {
        const k = gender === 'male' ? 0.9 : 0.85;
        return height - 100 + (age / 10) / 2 * k;
    }

    static calculateNormalPulse(age) {
        return 220 - age;
    }
}

// Клас, що представляє серверну логіку для розрахунку дієти
class SystemServer {
    static calculateDiet(physicalCharacteristics) {
        console.log('Calculating diet:', physicalCharacteristics);
    }

    static calculateOptimalCharacteristics(physicalCharacteristics) {
        const idealWeight = OptimalPhysicalCharacteristics.calculateIdealWeight(
            physicalCharacteristics.height,
            physicalCharacteristics.age,
            physicalCharacteristics.gender
        );

        const normalPulse = OptimalPhysicalCharacteristics.calculateNormalPulse(
            physicalCharacteristics.age
        );

        // Вивести результати на сторінку HTML
        document.getElementById('idealWeight').textContent = idealWeight.toFixed(3);
        document.getElementById('normalPulse').textContent = normalPulse.toFixed(3);

        console.log("Calculating optimal characteristics:");
        console.log("Ideal Weight:", idealWeight);
        console.log("Normal Pulse:", normalPulse);
    }
}

// Клас, що представляє логіку для розрахунку дієти
class Diet {
    static calculateCalories(physicalCharacteristics, goal) {
        const { gender, weight, height, age } = physicalCharacteristics;
        let calories;

        if (gender === 'male') {
            calories = 88.362 + 13.397 * weight + 4.799 * height - 5.677 * age;
        } else {
            calories = 447.593 + 9.247 * weight + 3.098 * height - 4.330 * age;
        }

        if (goal === 'maintain') {
            return calories;
        } else if (goal === 'lose') {
            return calories * 0.9;
        } else if (goal === 'gain') {
            return calories * 1.1;
        }

        return calories;
    }

    static calculateProteins(calories, goal) {
        if (goal === 'maintain' || goal === 'lose') {
            return (calories * 0.3) / 4;
        } else if (goal === 'gain') {
            return (calories * 0.4) / 4;
        }

        return 0;
    }

    static calculateFats(calories, goal) {
        if (goal === 'maintain' || goal === 'gain') {
            return (calories * 0.3) / 9;
        } else if (goal === 'lose') {
            return (calories * 0.25) / 9;
        }

        return 0;
    }

    static calculateCarbs(calories, proteins, fats) {
        return (calories - (proteins * 4 + fats * 9)) / 4;
    }

    // Заповнення даних про дієту на сторінці HTML
    static fillDietMenu(physicalCharacteristics, goal) {
        const calories = this.calculateCalories(physicalCharacteristics, goal);
        const proteins = this.calculateProteins(calories, goal);
        const fats = this.calculateFats(calories, goal);
        const carbs = this.calculateCarbs(calories, proteins, fats);

        document.getElementById('calories').textContent = calories.toFixed(3);
        document.getElementById('proteins').textContent = proteins.toFixed(3);
        document.getElementById('fats').textContent = fats.toFixed(3);
        document.getElementById('carbs').textContent = carbs.toFixed(3);
    }
}

// Клас, що представляє логіку для відображення підказок
class Tooltip {
    static showTooltip(text, lang) {
        const tooltip = document.getElementById('tooltip');
        tooltip.textContent = text;
        tooltip.style.display = 'block';

        if (lang === 'en') {
            tooltip.style.fontFamily = 'Arial, sans-serif';
        } else {
            tooltip.style.fontFamily = "'Times New Roman', Times, serif";
        }

        tooltip.style.left = '50%';
        tooltip.style.transform = 'translateX(-50%)';
        tooltip.style.bottom = '20px';
    }

    static hideTooltip() {
        const tooltip = document.getElementById('tooltip');
        tooltip.style.display = 'none';
    }

    // Перевірка та підсвічення неправильних полів
    static checkAndHighlightFields() {
        const errorMessage = document.getElementById('errorMessage');
        const fields = document.querySelectorAll('input, select');
        fields.forEach((field) => {
            if (!field.value) {
                field.style.border = '2px solid red';
                field.addEventListener('input', () => {
                    field.style.border = '';
                    errorMessage.style.display = 'none';
                });
            }
        });
    }
}

// Виведення помилки та підсвічення неправильних полів
function showError(message) {
    const errorMessage = document.getElementById('errorMessage');
    errorMessage.textContent = message;
    errorMessage.style.display = 'block';

    Tooltip.checkAndHighlightFields();
}

// Додавання обробників подій до кнопок
function addEventListeners() {
    document.getElementById('calculateDiet').addEventListener('mouseover', () => {
        Tooltip.showTooltip(
            'Diet will be presented as a daily norm of calories, proteins, fats, and carbohydrates.',
            'en'
        );
    });

    document.getElementById('calculateDiet').addEventListener('mouseout', () => {
        Tooltip.hideTooltip();
    });

    document.getElementById('calculateOptimal').addEventListener('mouseover', () => {
        Tooltip.showTooltip(
            'Optimal physical characteristics will be presented as ideal weight and normal pulse.',
            'en'
        );
    });

    document.getElementById('calculateOptimal').addEventListener('mouseout', () => {
        Tooltip.hideTooltip();
    });

    document.querySelectorAll('.button').forEach((element) => {
        element.addEventListener('mouseout', () => {
            Tooltip.hideTooltip();
        });

        element.addEventListener('click', () => {
            const physicalCharacteristics = getUserInput();

            if (!physicalCharacteristics) {
                return; // Вихід, якщо введені характеристики некоректні
            }

            if (!User.validateInput(physicalCharacteristics)) {
                showError('Fill in all fields correctly!');
                return;
            }

            if (element.id === 'calculateDiet') {
                SystemServer.calculateDiet(physicalCharacteristics);
                Diet.fillDietMenu(physicalCharacteristics, physicalCharacteristics.goal);
            } else if (element.id === 'calculateOptimal') {
                SystemServer.calculateOptimalCharacteristics(physicalCharacteristics);
            }
        });
    });
}

// Забезпечення обрання чоловічої статі за умовчанням
document.getElementById('genderSelection').querySelector('input[value="male"]').checked = true;

// Отримання фізичних характеристик користувача
function getUserInput() {
    const height = document.getElementById('height').value;
    const gender = document.querySelector('input[name="gender"]:checked');
    const age = document.getElementById('age').value;
    const weight = document.getElementById('weight').value;
    const goal = document.getElementById('goal').value;

    // Перевірка коректності введених характеристик
    if (
        (height < 100 || height > 250) ||
        (weight < 30 || weight > 350) ||
        (age < 18 || age > 130)
    ) {
        showError('Enter your real physical characteristics!');
        return null;
    }

    return new PhysicalCharacteristics(height, gender ? gender.value : '', age, weight, goal);
}

// Додавання обробників подій
addEventListeners();

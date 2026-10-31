const form = document.querySelector("#form");
const type = document.querySelector("#type");
const studentContainer = document.querySelector("#studentContainer");
const studentId = document.querySelector("#studentId");
const guestContainer = document.querySelector("#guestContainer");
const accessCode = document.querySelector("#accessCode");
const output = document.querySelector("#output");

function updateFields() {
    const value = type.value;

    if (value === "student") {
        studentContainer.hidden = false;
        studentId.required = true;
        guestContainer.hidden = true;
        accessCode.required = false;
    } else if (value === "guest") {
        studentContainer.hidden = true;
        studentId.required = false;
        guestContainer.hidden = false;
        accessCode.required = true;
    } else {
        studentContainer.hidden = true;
        studentId.required = false;
        guestContainer.hidden = true;
        accessCode.required = false;
    }
}

type.addEventListener("change", updateFields);
updateFields();

const textFields = [
    form.firstName,
    form.lastName,
    form.email,
    studentId,
    accessCode
];

textFields.forEach(field => {
    field.addEventListener("input", function () {
        if (field.value.trim() !== "") {
            field.classList.add("filled");
        } else {
            field.classList.remove("filled");
        }
    });
});

// Ensure they choose a date later than the current date
function isPastDate(value) {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const chosen = new Date(value + "T00:00:00");

    return chosen <= today;
}

form.addEventListener("submit", function (event) {
    event.preventDefault();
    output.textContent = "";

    const firstName = form.firstName.value.trim();
    const lastName = form.lastName.value.trim();
    const email = form.email.value.trim();
    const ticketType = type.value;
    const selectedDate = form.eventDate.value;
    const studentNumber = studentId.value.trim();
    const guestCode = accessCode.value.trim();

    const errors = [];

    if (!firstName) {
        errors.push("Enter your first name");
    }

    if (!lastName) {
        errors.push("Enter your last name");
    }

    if (!email || !form.email.validity.valid) {
        errors.push("Enter a valid email address");
    }

    if (!ticketType) {
        errors.push("Select a ticket type");
    }

    if (ticketType === "student" && !/^\d{9}$/.test(studentNumber)) {
        errors.push("Student I# must be 9 digits");
    }

    if (ticketType === "guest" && guestCode !== "EVENT131") {
        errors.push("Enter the guest access code: EVENT131");
    }

    if (!selectedDate) {
        errors.push("Select an event date");
    } else if (isPastDate(selectedDate)) {
        errors.push("Choose a date later than today");
    }

    if (errors.length > 0) {
        output.innerHTML = `
        <ul>
            ${errors.map(error => `<li>${error}</li>`).join("")}
        </ul>
        `;
        return;
    }

    output.innerHTML = `
    <h2>Ticket Created</h2>
    <p>${firstName} ${lastName}</p>
    <p>${email}</p>
    <p>${selectedDate}</p>
    `;

    form.reset();

    textFields.forEach(field => {
        field.classList.remove("filled");
    });
    
    updateFields();
});
          

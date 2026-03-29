const buttons = document.querySelectorAll(".answers button");
const places = document.querySelectorAll(".place");
const answers = document.querySelector(".answers");

let dragged = null;

const correct = {
    swan: "лебедь",
    lion: "лев",
    pegas: "пегас"
};


buttons.forEach(button => {

    button.draggable = true;

    button.addEventListener("dragstart", () => {
        dragged = button;
        setTimeout(() => button.style.opacity = "0.5", 0);
    });

    button.addEventListener("dragend", () => {
        button.style.opacity = "1";
    });

});


places.forEach(place => {

    place.addEventListener("dragover", e => {
        e.preventDefault();
    });

    place.addEventListener("drop", e => {
        e.preventDefault();

        if (!dragged) return;

        const existing = place.querySelector("button");

        if (existing && existing !== dragged) {
            answers.appendChild(existing);
        }

        place.appendChild(dragged);

        checkAnswer(place);
    });

});


answers.addEventListener("dragover", e => {
    e.preventDefault();
});

answers.addEventListener("drop", e => {
    e.preventDefault();

    if (!dragged) return;

    answers.appendChild(dragged);

    resetBorders();
});


function checkAnswer(place) {

    const type = place.parentElement.classList[0];
    const button = place.querySelector("button");

    if (!button) return;

    const text = button.textContent.trim().toLowerCase();

    if (text === correct[type]) {
        place.style.border = "2px dashed #38d66b";
    } else {
        place.style.border = "2px dashed #ff4d4d";
    }

}


function resetBorders() {

    places.forEach(place => {
        if (!place.querySelector("button")) {
            place.style.border = "1px dashed rgba(255,255,255,.5)";
        }
    });

}
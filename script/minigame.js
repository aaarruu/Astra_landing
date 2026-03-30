const buttons = document.querySelectorAll(".answers button");
const places = document.querySelectorAll(".place");
const answers = document.querySelector(".answers");

let dragged = null;
let draggedClone = null;
let startX = 0, startY = 0;

const correct = {
    swan: "лебедь",
    lion: "лев",
    pegas: "пегас"
};


buttons.forEach(button => {

    button.draggable = true;

    button.addEventListener("dragstart", () => {
        dragged = button;
        e.dataTransfer.setData("text/plain", button.textContent); 
        e.dataTransfer.effectAllowed = "move";                    
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
        dragged = null;                 

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
    dragged = null;  
});


// Мобилка

buttons.forEach(button => {

    button.addEventListener("touchstart", (e) => {
        e.preventDefault();
        dragged = button;
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
        
      
        draggedClone = button.cloneNode(true);
        draggedClone.style.position = "fixed";
        draggedClone.style.left = `${startX - 30}px`;
        draggedClone.style.top = `${startY - 30}px`;
        draggedClone.style.width = `${button.offsetWidth}px`;
        draggedClone.style.opacity = "0.6";
        draggedClone.style.pointerEvents = "none";
        draggedClone.style.zIndex = "9999";
        document.body.appendChild(draggedClone);
        
        button.style.opacity = "0.3";
    });

    button.addEventListener("touchmove", (e) => {
        e.preventDefault();
        if (!draggedClone) return;
        
        const touch = e.touches[0];
        draggedClone.style.left = `${touch.clientX - 30}px`;
        draggedClone.style.top = `${touch.clientY - 30}px`;
    });

    button.addEventListener("touchend", (e) => {
        e.preventDefault();
        if (!dragged) return;
        
        if (draggedClone) {
            draggedClone.remove();
            draggedClone = null;
        }
        
        const touch = e.changedTouches[0];
        const elemUnderTouch = document.elementFromPoint(touch.clientX, touch.clientY);
        const targetPlace = elemUnderTouch.closest(".place");
        
        if (targetPlace) {
            const existing = targetPlace.querySelector("button");
            if (existing && existing !== dragged) {
                answers.appendChild(existing);
            }
            targetPlace.appendChild(dragged);
            checkAnswer(targetPlace);
        } else {
            answers.appendChild(dragged);
            resetBorders();
        }
        
        dragged.style.opacity = "1";
        dragged = null;
    });
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

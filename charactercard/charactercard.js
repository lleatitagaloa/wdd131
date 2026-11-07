const character = {
    name: "Snortleblat",
    class: "Swamp Beast Diplomat",
    level: 5,
    health: 100,
    image: "images/snortleblat.png",

    attacked: function() {
        this.health -= 20;

        if (this.health <= 0) {
            this.health = 0;
            alert("Character Died");
        }
    },

    levelUp: function() {
        this.level += 1;
    }
};

document.querySelector("img").setAttribute("src", character.image);
document.querySelector("img").setAttribute("alt", character.name);

document.querySelector("h2").textContent = character.name;

document.querySelector("#class").textContent = `Class: ${character.class}`;
document.querySelector("#level").textContent = `Level: ${character.level}`;
document.querySelector("#health").textContent = `Health: ${character.health}`;

document.querySelector("#attacked").addEventListener("click", function() {
    character.attacked();
    document.querySelector("#health").textContent = `Health: ${character.health}`;
});

document.querySelector("#levelUp").addEventListener("click", function() {
    character.levelUp();
    document.querySelector("#level").textContent = `Level: ${character.level}`;
});

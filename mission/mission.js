
let selectElem = document.querySelector('select');
let logo = document.querySelector('img');

selectElem.addEventListener('change', changeTheme);

function changeTheme() {
    let current = selectElem.value;
    if (current == 'dark') {
        logo.src = "images/byui-logo-white.png";
        //document.body.style.backgroundColor = "black";
        //document.body.style.color = "white";
        document.body.classList.add("dark");
    } else {
        logo.src = "images/byui-logo-blue.webp";
        document.body.style.backgroundColor = "white";
        document.body.style.color = "black";
    }
}           
                    
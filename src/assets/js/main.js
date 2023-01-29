// add hovered class to selected list item
let list = document.querySelectorAll('.navigation li');

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function activeLink() {
    list.forEach(item => {
        item.classList.remove('hovered');
    });
    this.classList.add('hovered');
}

list.forEach(item => item.addEventListener('mouseover', activeLink));

// Menu Toggle
let toggle = document.querySelector('.toggle');
let navigation = document.querySelector('.navigation');
let main = document.querySelector('.main');

toggle.onclick = function () {
    navigation.classList.toggle('active');
    main.classList.toggle('active');
};

list.forEach(item =>
    item.addEventListener('click', () => {
        if (navigation.classList.contains('active')) {
            navigation.classList.remove('active');
        }

        if (main.classList.contains('active')) {
            main.classList.remove('active');
        }
    })
);
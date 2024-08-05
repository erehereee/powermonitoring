const button = document.getElementById('hamburger-button');

const energyList = document.getElementById('energy-list');
const energyListItem = document.getElementById('energy-list-item');

const phaseButton = document.getElementById('change-button');


const socket = io();

socket.on("connect", () => {
  console.log("Connected");
});




button.addEventListener('click', function() {
    const buttonClass = document.querySelector('.container .sidebar');
    buttonClass.classList.toggle('hide');
});

energyList.addEventListener('mouseleave', function() {
    energyList.classList.add('hide');
    energyListItem.classList.add('hide');
});
energyList.addEventListener('click', function() {
    energyList.classList.toggle('hide');
    energyListItem.classList.toggle('hide');
});

phaseButton.addEventListener('click', function() {
    const buttonClassLN = document.querySelector('.container .main-content .main-dashboard .top .gauge-1phase');
    const buttonClassLL = document.querySelector('.container .main-content .main-dashboard .top .gauge-3phase');
    const titleText = document.querySelector('.container .main-content .main-dashboard .top .selector .title h3');
    const testGet1 = buttonClassLN.getAttribute('class');
    buttonClassLN.classList.toggle('hide');
    buttonClassLL.classList.toggle('hide');
    if(testGet1 == "gauge-1phase hide") {
        titleText.innerHTML = 'Voltage/Current 1 Phase';
    }
    else {
        titleText.innerHTML = 'Voltage/Current 3 Phase';
    }
});


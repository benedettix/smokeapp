const quitDateInfo = document.getElementById('quitDateInfo');
const elapsed = document.getElementById('elapsed');
const noCigarNumber = document.getElementById('no-cigar-number');
const saveBtn = document.getElementById('saveBtn');
const moneySaved = document.getElementById('money-saved');

const dateInput = document.querySelector('[type="datetime-local"');
const numCigarsInput = document.querySelector('#num-cigars');
const pricePerPack = document.querySelector('#price-per-pack');

initApp();

saveBtn.addEventListener('click',saveData);

function saveData() {
    let qd = moment(dateInput.value).format();
    let ppp = pricePerPack.value;
    let noc = numCigarsInput.value;

    localStorage.newQuickDate = qd;
    localStorage.pricePerPack = ppp;
    localStorage.numberOfCigars = noc;

    displayQuitDate();
    displayLastCigarette();
    displayCigaretteNotSmoked();
    displayMoneySaved();
}

function displayQuitDate() {
    quitDateInfo.innerHTML = moment(localStorage.newQuickDate).format('LLL');
}

function displayLastCigarette() {
    elapsed.innerHTML = moment(localStorage.newQuitDate).fromNow();
}

function displayCigaretteNotSmoked() {
    let cigarPerMinute = (parseInt(localStorage.numberOfCigars) /24) /60;
    let qd = moment(localStorage.newQuickDate);
    let now = moment();
    let minutes = now.diff(qd, 'minutes'); // razlika u min
    noCigarNumber.innerHTML = (cigarPerMinute * minutes).toFixed(0);
    
}
function displayMoneySaved() {
    let priceOfOneCigar = parseInt(localStorage.pricePerPack) / 20;
    let qd = moment(localStorage.newQuickDate);
    let now = moment();
    let minutes = now.diff(qd, 'minutes'); // razlika u min
    let hourSaved = (priceOfOneCigar * parseInt(localStorage.numberOfCigars)) / 24;
    let minutSaved = hourSaved / 60;
    moneySaved.innerHTML = (minutSaved * minutes).toFixed(3);
}

function initApp() {
    if(localStorage.newQuickDate) {
        displayQuitDate();
        displayLastCigarette();
        displayCigaretteNotSmoked();
        displayMoneySaved();

        let loop = setInterval(displayLastCigarette,1000)
        let loop2 = setInterval(displayCigaretteNotSmoked,1000)
        let loop3 = setInterval(displayMoneySaved,1000)
    }
}
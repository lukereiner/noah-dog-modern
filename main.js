const leverUp = document.getElementById('lever-up');
const leverDown = document.getElementById('lever-down');
const responseArea = document.getElementById('output');
const testPhoto = document.getElementById('result');
const dogWinCount = document.getElementById('dog-win');
const dogLossCount = document.getElementById('dog-loss');
const dogCountPercent = document.getElementById('dog-percent');
const wagerDecrease = document.getElementById('minus');
const wagerDecrease1k = document.getElementById('minus1k');
const wagerIncrease = document.getElementById('plus');
const wagerIncrease1k = document.getElementById('plus1k');
const wagerNumber = document.getElementById('wager-number');
const wagerWallet = document.getElementById('wallet-amount');



// WAGERS
function wagerIncrement() {
  let numValue = parseInt(wagerNumber.textContent)
  numValue += 100;
  return wagerNumber.innerHTML = numValue;
}

function wagerIncrement1k() {
  let numValue = parseInt(wagerNumber.textContent)
  numValue += 1000;
  return wagerNumber.innerHTML = numValue;
}

function wagerDecrement() {
  let numValue = parseInt(wagerNumber.textContent)
  numValue -= 100;
  if (numValue < 0) {
    numValue = 0;
  }
  return wagerNumber.innerHTML = numValue;
}

function wagerDecrement1k() {
  let numValue = parseInt(wagerNumber.textContent)
  numValue -= 1000;
  if (numValue < 0) {
    numValue = 0;
  }
  return wagerNumber.innerHTML = numValue;
}

// IMAGES
const dogImages = {
    1 : 'noah-dog-media/dogs/dog-1.jpg',
    2 : 'noah-dog-media/dogs/dog-2.jpg',
    3 : 'noah-dog-media/dogs/dog-3.jpg',
    4 : 'noah-dog-media/dogs/dog-4.jpg',
    5 : 'noah-dog-media/dogs/dog-5.jpeg',
    6 : 'noah-dog-media/dogs/dog-6.jpg',
    7 : 'noah-dog-media/dogs/dog-7.jpg',
    8 : 'noah-dog-media/dogs/dog-8.jpg',
    9 : 'noah-dog-media/dogs/dog-9.jpg',
    10 : 'noah-dog-media/dogs/dog-10.jpg',
    11 : 'noah-dog-media/dogs/dog-11.jpeg',
    12 : 'noah-dog-media/dogs/dog-12.jpeg'
}

const noahImages = {
    1 : 'noah-dog-media/noah/photos/noah-1.jpg',
    2 : 'noah-dog-media/noah/photos/noah-2.jpeg',
    3 : 'noah-dog-media/noah/photos/noah-3.png',
    4 : 'noah-dog-media/noah/photos/noah-4.png',
    5 : 'noah-dog-media/noah/photos/noah-5.png',
    6 : 'noah-dog-media/noah/photos/noah-6.jpg',
    7 : 'noah-dog-media/noah/photos/noah-7.jpg',
    8 : 'noah-dog-media/noah/photos/noah-8.jpg',
    9 : 'noah-dog-media/noah/photos/noah-9.jpeg',
    10 : 'noah-dog-media/noah/photos/noah-10.jpeg',
    11 : 'noah-dog-media/noah/photos/noah-11.jpeg',
    12 : 'noah-dog-media/noah/photos/noah-12.jpeg',
}

// COUNT/CYCLE FUNCTIONS
let currentIndex = 1;
let dogWin = 0;
let dogLoss = 0;
let intervalId;
let walletCalc = 0;

// PIE

const ctx = document.getElementById('myChart');

const myPieChart = new Chart(ctx, {
    type: 'pie',
    data: {
        labels: ['Got that DAWG', 'Aint got it'],
        datasets: [{
            data: [parseInt(localStorage.getItem('dogWin')), parseInt(localStorage.getItem('dogLoss'))],
            backgroundColor: ['green', 'red'],
            hoverBackgroundColor: ['darkgreen', 'darkred']
        }]
    },
    options: {aspectRatio: 2.5}
});

function updateChartData() {
  myPieChart.data.datasets[0].data = [
    parseInt(localStorage.getItem('dogWin')),
    parseInt(localStorage.getItem('dogLoss'))
  ]
}

// Initialize local storage with default values if not already set
if (!localStorage.getItem('dogWin')) {
  localStorage.setItem('dogWin', 0);
}
if (!localStorage.getItem('dogLoss')) {
  localStorage.setItem('dogLoss', 0);
}

function imageCycle() {
  if (intervalId) return; // Prevent multiple intervals

  intervalId = setInterval(() => {
      testPhoto.innerHTML = `<img src="${noahImages[currentIndex]}"/>`

      currentIndex++;
      if (currentIndex > Object.keys(noahImages).length) {
          clearInterval(intervalId);
          intervalId = null;
          currentIndex = 1;
      }
  }, 240); // 0.24 seconds interval
}

let randomSuccess = () => {
  let wagerWalletAmt = parseInt(wagerNumber.textContent);
    let dogNum = Math.random();
    if (dogNum < .5 ){
      dogWin++;
      localStorage.setItem('dogWin', JSON.stringify(dogWin));
      updateChartData();
      myPieChart.update();
      displayCount();
      return true;
    } else {
      dogLoss++;
      localStorage.setItem('dogLoss', JSON.stringify(dogLoss));
      updateChartData();
      myPieChart.update();
      displayCount();
      return false;
    }
};

let gotThatDogShuffle = () => {
    return new Promise((resolve, reject) => {
      setTimeout(()=>{
        let success = randomSuccess();
        if(success){
          resolve('He`s got that DOG in `em');
          walletCalc += parseInt(wagerNumber.textContent);
          wagerWallet.innerHTML = walletCalc;
        } else {
          reject('He ain\'t got it...');
          walletCalc -= parseInt(wagerNumber.textContent);
          wagerWallet.innerHTML = walletCalc;
        }
      }, 3000);
    });
   };

async function gotThatDogRoulette() {
    try {
    let photoNum = Math.floor((Math.random() * 12)+1);
      let noahDog = await gotThatDogShuffle();
      responseArea.innerHTML = noahDog
      testPhoto.innerHTML = `<img src="${dogImages[photoNum]}"/>`
      const audio = new Audio('noah-dog-media/noah/videos/got-that-dog-audio.wav').play()
    } catch (reject) {
      responseArea.innerHTML = reject;
      testPhoto.innerHTML = `<img src="${noahImages[photoNum]}"/>`
    }
};

// Function to retrieve and display the count
function displayCount() {
  const dogWinCountTally = parseInt(localStorage.getItem('dogWin'));
  const dogLossCountTally = parseInt(localStorage.getItem('dogLoss'));

  dogWinCount.innerHTML = dogWinCountTally;
  dogLossCount.innerHTML = dogLossCountTally;

  let winLossSum = dogWinCountTally + dogLossCountTally;
  let percentCount = dogWinCountTally / winLossSum;
  dogCountPercent.innerHTML = (percentCount * 100).toFixed(0);

  // Update your UI elements with the counts here
}

leverDown.hidden = true;
responseArea.innerHTML = '';

function pullLever() {
    leverUp.hidden = true;
    leverDown.hidden = false;
    responseArea.innerHTML = '';
}

function releaseLever() {
    leverDown.hidden = true;
    leverUp.hidden = false;
    let photoNum = Math.floor((Math.random() * 12)+1);
    testPhoto.innerHTML = `<img src="${noahImages[photoNum]}"/>`
    gotThatDogRoulette();
    imageCycle();
}

// PLAYING THE GAME
wagerIncrease.onclick = wagerIncrement;
wagerIncrease1k.onclick = wagerIncrement1k;
wagerDecrease.onclick = wagerDecrement;
wagerDecrease1k.onclick = wagerDecrement1k;
leverUp.onmousedown = pullLever;
leverDown.onmouseup = releaseLever;
document.addEventListener('DOMContentLoaded', (event => {
    //localStorage.clear();
    console.log(supabase);
    localStorage.setItem('dogWin', '0');
    localStorage.setItem('dogLoss', '0');
    updateChartData();
    myPieChart.update();
    leverDown.addEventListener('click', releaseLever);
    /* leverDown.addEventListener('touchstart', () => {
      leverUp.hidden = true;
      leverDown.hidden = false;
    })
    leverDown.addEventListener('touchend', () => {
      leverUp.hidden = false;
      leverDown.hidden = true;
    }) */
}));

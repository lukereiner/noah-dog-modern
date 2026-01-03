let randomSuccess = () => {
    let num = Math.random();
    if (num < .5 ){
      return true;
    } else {
      return false;
    }
   };
   
   // This function returns a promise that resolves half of the time and rejects half of the time
let gotThatDogShuffle = () => {
return new Promise((resolve, reject) => {
  console.log('We all hear him say it... but does Noah really got that DAWG in him?');
  setTimeout(()=>{
    let success = randomSuccess();
    if(success){
      resolve('He`s got that DOG in `em');
    } else {
      reject('He ain\'t got it...');
    }
  }, 1000);
});
};

   //module.exports = gotThatDogShuffle;

async function gotThatDogRoulette() {
try {
  let noahDog = await gotThatDogShuffle();
  console.log(noahDog);
  console.log('show pic of murphy')
} catch (error) {
  console.log(error);
  console.log('show pic of noah')
}
};

gotThatDogRoulette();

module.exports = gotThatDogRoulette;

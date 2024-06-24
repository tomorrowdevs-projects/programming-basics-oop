const probCalculator = require( './probCalculator.js' ); // For CommonJS environment

function init(){
    const hat = new probCalculator.Hat({black:6}, {red:4}, {green:3});
    const probability = probCalculator.experiment(hat, {red:2,green:1}, 5, 2000);

    console.log(probability);
}

init();
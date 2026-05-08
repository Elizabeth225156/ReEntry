let earthRadius = 20908800; // ft
let gravitationalField = 31.2; // ft/sec^2

function altitude(velocity, flightAngle){
    let alt = 0;
    alt = velocity * Math.sin(flightAngle);
    return alt;
}

function velocity(){
    const k1 = 0; //find later
    
}
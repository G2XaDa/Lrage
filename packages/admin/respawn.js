
function findClosestHospital(player) {
    const hospitals = [
        { x: -248.1632, y: 6336.486, z: 32.42628 },
    ];

    let closestHospital = null;
    let minDistance = Infinity;

    hospitals.forEach((hospital) => {
        const distance = player.dist(hospital.x, hospital.y, hospital.z);
        if (distance < minDistance) {
            minDistance = distance;
            closestHospital = hospital;
        }
    });

    return closestHospital;
}

function respawnAtClosestHospital(player) {
    const hospitalLocation = findClosestHospital(player);

    if (hospitalLocation) {
        player.spawn(new mp.Vector3(hospitalLocation.x, hospitalLocation.y, hospitalLocation.z));
    } else {
        player.spawn(new mp.Vector3(0, 0, 72));
    }
}

mp.events.add('playerDeath', (player) => {
    player.health = 100;
    player.armour = 100;

    updateHUD(player);

    respawnAtClosestHospital(player);
});

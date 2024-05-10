const connection = require('../login/connections').connection;

mp.events.addCommand('veh', (player, fullText) => {
    if (!fullText) {
        player.outputChatBox('Usage: /veh [Vehicle]');
        return;
    }

    const vehicleModel = fullText.trim();

    const vehicle = mp.vehicles.new(mp.joaat(vehicleModel), player.position);

    player.putIntoVehicle(vehicle, 0);

    vehicle.numberPlate = 'XADA'

    player.outputChatBox(`Vehicle ${vehicleModel} spawned!`);
});

mp.events.addCommand('dv', (player) => {
    const vehicle = player.vehicle;
    if (vehicle) {
        vehicle.destroy();
        player.outputChatBox('Vehicle has been deleted');
    }
    else {
        player.outputChatBox('You are not in a vehicle!');
    }
});

mp.events.addCommand('help', (player) => {
    player.outputChatBox('No help for you bros over weibos! XiXi')
});

mp.events.addCommand('tp', (player, fullText) => {
    if (!fullText) {
        player.outputChatBox('Usage: /tp [X] [Y] [Z]');
        return;
    }
    entity.setCoords(xPos, yPos, zPos, clearArea);
});

mp.events.addCommand('night', (player) => {
    mp.world.time.set(21, 0, 0);
    player.outputChatBox('Time set to night!');
});

mp.events.addCommand('ooc', (player, fullText) => {
    if (!fullText) {
        player.outputChatBox('Usage: /ooc [Message]');
        return;
    }

    const text = fullText;
    let playerName = player.name

    player.outputChatBox(`${playerName} [OOC] ${text}`);
});

mp.events.addCommand('color', (player, fullText, r, g, b) => {
    if (player.vehicle) {
        player.vehicle.setColorRGB(parseInt(r), parseInt(g), parseInt(b));
        player.outputChatBox(`Vehicle color set to RGB(${r}, ${g}, ${b})`);
    } else {
        player.outputChatBox("You are not in a vehicle.");
    }
});

mp.events.addCommand('time', (player, fullText, hour, minute, second) => {
    if (!fullText) {
        player.outputChatBox("Usage /time [Hour] [Minute] [Second]");
        return;
    }
    mp.world.time.set(hour, minute, second);
});

mp.events.addCommand('plate', (player, _, plate) => {
    if (!_) {
        player.outputChatBox('Usage: /plate [Plate]')
    }
    if(player.vehicle) {
        player.vehicle.numberPlate = plate;
        player.outputChatBox(`Plate ${plate} applied!`)
    }
    else {
        player.outputChatBox('You are not in a vehicle')
    }
});

mp.events.addCommand('maxmods', (player, fullText, modType, modIndex) => {
    if (!fullText) {
        player.outputChatBox('Usage: /maxmods [Mod Type] [Mod Index]')
    }
    if (player.vehicle) {
        vehicle.setMod(modType, modIndex);
    }
    else {
        player.outputChatBox('You are not in a vehicle')
    }
})
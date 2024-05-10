require('./commands')
require('./events')
require('./respawn')

mp.events.add("playerChat", (player, message) => {
    mp.players.broadcast(`${player.name}: ${message}`);
});

mp.events.add('playerJoin', (player) => {
    player.health = 100;
    player.armour = 100;

    player.call('updateBars', [player.health, player.armour]);
});

mp.events.add('playerDeath', (player) => {
    player.health = 100;
    player.armour = 100;

    player.call('updateBars', [player.health, player.armour]);
});
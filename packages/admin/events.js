
function updateHUD(player) {
    player.call('updateBars', [player.health, player.armour]);
}

mp.events.add('playerJoin', (player) => {
    player.health = 100;
    player.armour = 100;

    updateHUD(player);
});

mp.events.add('playerDeath', (player) => {
    player.health = 100;
    player.armour = 100;

    updateHUD(player);

});

mp.events.add('playerTakeDamage', (player, damage, damager, weapon) => {

    player.health -= damage;
    player.armour -= damage; 

    player.health = Math.max(player.health, 0);
    player.armour = Math.max(player.armour, 0);

    updateHUD(player);

    player.outputChatBox(`You took ${damage} damage!`);

});

mp.events.addCommand('armor', (player) => {
    player.armour = 100;

    updateHUD(player);

    player.outputChatBox('You have been given 100 armor.');
});

mp.events.addCommand('health', (player) => {
    player.health = 100;

    updateHUD(player);

    player.outputChatBox('You have been given 100 health.');
});
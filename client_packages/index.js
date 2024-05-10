require('./admin')
require('./noclip');
require('passenger.js')
require('./Speedometer')

mp.gui.chat.show(false);
const chat = mp.browsers.new('package://xchat/index.html');
chat.markAsChat();

const hud = mp.browsers.new('package://hud/hud.html');
mp.events.add('updateBars', (health, armor) => {
    hud.execute(`updateBars(${health}, ${armor})`);
});

mp.events.add('render', () => {
    mp.game.ui.hideHudComponentThisFrame(3);
    mp.game.ui.hideHudComponentThisFrame(4);
});

mp.events.add('updateBars', (health, armor) => {
    mp.gui.execute(`updateBars(${health}, ${armor})`);
});





const connection = require('./connections').connection;

mp.events.add('playerJoin', (player) => {
    const socialID = player.rgscId;
    console.log(`[SERVER]: ${player.name} [SCID: ${player.rgscId}, ID: ${player.id}] logged in to the server.`);
    connection.query('INSERT INTO players (scID, posX, posY, posZ, isAdmin) VALUES ('+socialID+', 174, -919, 30.687, false)', function (err, result) {
        if (err) {
            switch(err.code) {
                case "ER_DUP_ENTRY":
                    console.log("The following error happened while inserting a new record to [players]: " + err);
                    connection.query('SELECT posX, posY, posZ, isAdmin FROM players WHERE scID = '+socialID+'', function (err, result) {
                        if (err) {
                            console.log('The following error happened while selecting scID from [players]: ' + err);
                            throw err;
                        }
                        else {
                            player.spawn(new mp.Vector3(result[0].posX, result[0].posY, result[0].posZ));
                        }
                    });
                    break;
                default:
                    console.log('The following error happened while inserting a new record to [players]: ' + err)
                    throw err;
            }
        }
        else {
            console.log(`New player registered: ${player.name}`);
        };
        player.spawn(new mp.Vector3(174, -919, 30.687));
    });
});


mp.events.add('playerQuit', (player, exitType, reason) => {
    const socialID = player.rgscId;
    pos = player.position
    console.log(`[SERVER]: ${player.name} [SCID: ${player.rgscId}, ID: ${player.id}] left the server.`);
    connection.query('UPDATE players SET posX = '+pos.x+', posY = '+pos.y+', posZ = '+pos.z+' WHERE scID = '+socialID+'', function (err, result) {
        if (err) {
            console.log(err);
            throw err;
        }
        else {
            console.log("Coordinates added to the database")
        }
    });
});

mp.events.addCommand("setadmin", (player, fullText, password, playerId) => {
    if (!password || !playerId) {
      player.outputChatBox("Usage: /setadmin [password] [player id]");
      return;
    }
  
    if (password !== "xada") {
      player.outputChatBox("Incorrect password.");
      return;
    }
  
    var parsedPlayerId = parseInt(playerId);
    if (isNaN(parsedPlayerId) || parsedPlayerId <= 0) {
      player.outputChatBox("Invalid player ID.");
      return;
    }
  
    var updateSql = "UPDATE players SET isAdmin = true WHERE id = ?";
    var updateValues = [parsedPlayerId];
  
    connection.query(updateSql, updateValues, function (err, updateResult) {
      if (err) {
        player.outputChatBox("Error updating admin status: " + err);
        throw err;
      }
  
      if (updateResult.affectedRows > 0) {
        player.outputChatBox("Admin status updated successfully for player with ID " + parsedPlayerId);
      } else {
        player.outputChatBox("Player with ID " + parsedPlayerId + " not found in the database.");
      }
    });
  });
  
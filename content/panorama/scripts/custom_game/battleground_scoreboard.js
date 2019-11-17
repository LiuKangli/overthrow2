"use strict";

(function()	{
	GameEvents.Subscribe("battleground_show_scoreboard", ShowBattlegroundScoreboard);
	CustomNetTables.SubscribeNetTableListener("battleground_scoreboard", UpdateBattlegroundScoreboard);
})();

function ShowBattlegroundScoreboard() {
	$("#BGScore").style.visibility = 'visible';
}

function UpdateBattlegroundScoreboard(keys) {

	var data = CustomNetTables.GetTableValue(keys, "scoreboard");

	for (var i = 1; i <= 24; i++) {
		if (data[i].hero) {
			$('#BGScoreRow' + i).style.visibility = 'visible'
			$('#BGScoreLabel' + i).text = data[i].score
			$('#BGScoreHero' + i).heroname = data[i].hero

		} else {
			$('#BGScoreRow' + i).style.visibility = 'collapse'
		}
	}
}
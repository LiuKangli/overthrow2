var voteidtoname = {};
var votenametoid = {};
var votesblank = {};

function Vote(vote,id) 
{
    // $.Msg(vote);
    // $.Msg(id);
    var check = $("#SettingsList").GetChild(vote).GetChild(id+2).GetChild(1);
    if (!check.checked)
    {
      check.checked = true;
    }
    {
      GameEvents.SendCustomGameEventToServer("OPVote", {vote: voteidtoname[vote], id: id});
      for (var button_id in votesblank[vote]) 
      {
        if (button_id != id)
        {
          votesblank[vote][button_id].GetChild(1).checked = false;
        }
      }
    }
}

function SetOnactivate(panel,vote,button) 
{
  panel.SetPanelEvent("onactivate", function () {
  Vote(vote,button);
});
}

function SetOnmouseover(panel,text) 
{
  panel.SetPanelEvent("onmouseover", function () {
    $.DispatchEvent("DOTAShowTextTooltip", panel, text);
  });
}

function SetOnmouseout(panel) 
{
  panel.SetPanelEvent("onmouseout", function () {
    $.DispatchEvent("DOTAHideTextTooltip", panel);
  });
}

(function()
{
    $("#SettingsList").visible = false;
    // StartSettings();
    // GameEvents.Subscribe("updatevote", UpdateVote);
    SubscribeToNetTableKey('pregame_votes', 'votes_data', function(kv) {
      if (kv)
      {
        $("#SettingsList").visible = true;
        // $.Msg(kv);
        var vote_id = 0;
        for (var votename in kv) 
        {
          voteidtoname[vote_id] = votename;
          votenametoid[votename] = vote_id;
          votesblank[vote_id] = {};
          $("#SettingsList").BLoadLayoutSnippet("Vote");
          $("#SettingsList").GetChild(vote_id).GetChild(0).text = $.Localize(votename);
          $("#SettingsList").GetChild(vote_id).GetChild(1).SetImage(kv[votename].image);
          var button_id = 0;
          var def_button_id = null;
          for (var buttonid in kv[votename]) 
          {
            if (buttonid != "image" && buttonid != "default")
            {
              if (kv[votename].default == buttonid)
              {
                def_button_id = button_id;
              }
              $("#SettingsList").GetChild(vote_id).BLoadLayoutSnippet("VoteButton");
              var thisbutton = $("#SettingsList").GetChild(vote_id).GetChild(button_id+2);
              thisbutton.GetChild(0).text = $.Localize(kv[votename][buttonid].name);
              if (kv[votename][buttonid].tooltip) SetOnmouseover(thisbutton,$.Localize(kv[votename][buttonid].tooltip));
              SetOnmouseout(thisbutton);
              SetOnactivate(thisbutton.GetChild(1),vote_id,button_id);
              votesblank[vote_id][button_id] = thisbutton;
              button_id++;
            }
          }
          if (def_button_id != null)
          {
            Vote(vote_id,def_button_id);
          }
          vote_id++;
        }
        if (vote_id > 0) $("#SettingsList").visible = true;
      }
      else
      {
        $("#SettingsList").visible = false;
      }
    });
    SubscribeToNetTableKey('pregame_votes', 'votes', function(kv) {
      // $.Msg(kv);
      // $.Msg(votesblank);
      var allvotes = {};
      for (var vote_id in votesblank) 
      {
        allvotes[vote_id] = {};
        for (var button_id in votesblank[vote_id]) 
        {
          allvotes[vote_id][button_id] = 0;
        }
      }
      
      // $.Msg(allvotes);
      for (var pid in kv.players) 
      {
        for (var votename in kv.players[pid]) 
        {
          allvotes[votenametoid[votename]][kv.players[pid][votename]] += 1;
        }
      }
      // $.Msg(allvotes);
      for (var vote_id in allvotes) 
      {
        var all = 0;
        for (var button_id in allvotes[vote_id]) 
        {
          all += allvotes[vote_id][button_id];
        }
        // $.Msg(all);
        if (all > 0)
        {
          var maxnum = 0;
          var maxid = 0;
          for (var button_id in allvotes[vote_id]) 
          {
            var thisnum = allvotes[vote_id][button_id]/all;
            var prclbl = $("#SettingsList").GetChild(parseInt(vote_id, 10)).GetChild(parseInt(button_id, 10)+2).GetChild(2);
            prclbl.text = (thisnum*100).toFixed(0)+"%";
            if (prclbl.BHasClass("MaxPrc")) prclbl.RemoveClass("MaxPrc");
            if (maxnum < thisnum)
            {
              maxnum = thisnum;
              maxid = button_id;
            }
          }
          $("#SettingsList").GetChild(parseInt(vote_id, 10)).GetChild(parseInt(maxid, 10)+2).GetChild(2).AddClass("MaxPrc");
        }
      }
      //     $("#SchetYes").text = data.yes+"("+((data.yes/all)*100).toFixed(0)+"%)";
      //     $("#SchetNo").text = data.no+"("+((data.no/all)*100).toFixed(0)+"%)";
    });
})();
function OnSpellStart( event )
    local teams = {}
    teams[DOTA_TEAM_GOODGUYS] = DOTA_TEAM_BADGUYS
    teams[DOTA_TEAM_BADGUYS] = DOTA_TEAM_GOODGUYS
	event.target:SetTeam(teams[event.target:GetTeam()])
end
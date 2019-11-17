require("common/timers")
require("common/utils")
require("common/match_events")
require("common/webapi")
require("common/patreons")

require("common/disable_help")
require("common/smart_random")
require("common/cosmetic_abilities")

if GetMapName() ~= "battleground" then
	require("common/courier")
end

LinkLuaModifier("modifier_donator", "common/modifier_donator", LUA_MODIFIER_MOTION_NONE)

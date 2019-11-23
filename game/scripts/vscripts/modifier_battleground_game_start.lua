modifier_battleground_game_start = class({})

function modifier_battleground_game_start:IsHidden() return true end
function modifier_battleground_game_start:IsDebuff() return true end
function modifier_battleground_game_start:IsPurgable() return false end

function modifier_battleground_game_start:CheckState()
	local states = {
		[MODIFIER_STATE_STUNNED] = true,
		[MODIFIER_STATE_SILENCED] = true,
		[MODIFIER_STATE_INVULNERABLE] = true,
		[MODIFIER_STATE_FROZEN] = true,
		[MODIFIER_STATE_COMMAND_RESTRICTED] = true,
		[MODIFIER_STATE_NOT_ON_MINIMAP] = true

	}
	return states
end
modifier_battleground_disconnected = class({})

function modifier_battleground_disconnected:IsHidden() return true end
function modifier_battleground_disconnected:IsDebuff() return false end
function modifier_battleground_disconnected:IsPurgable() return false end

function modifier_battleground_disconnected:OnCreated(keys)
	if IsServer() then
		self.original_pos = self:GetParent():GetAbsOrigin()
		self:GetParent():AddNoDraw()
		self:GetParent():SetAbsOrigin(-20000, -20000, 0)
	end
end

function modifier_battleground_disconnected:OnDestroy()
	if IsServer() then
		self:GetParent():RemoveNoDraw()
		FindClearSpaceForUnit(self:GetParent(), self.original_pos, true)
	end
end

function modifier_battleground_disconnected:CheckState()
	local states = {
		[MODIFIER_STATE_STUNNED] = true,
		[MODIFIER_STATE_SILENCED] = true,
		[MODIFIER_STATE_MUTED] = true,
		[MODIFIER_STATE_INVULNERABLE] = true,
		[MODIFIER_STATE_MAGIC_IMMUNE] = true,
		[MODIFIER_STATE_ATTACK_IMMUNE] = true,
		[MODIFIER_STATE_UNSELECTABLE] = true,
		[MODIFIER_STATE_FROZEN] = true,
		[MODIFIER_STATE_COMMAND_RESTRICTED] = true,
		[MODIFIER_STATE_NOT_ON_MINIMAP] = true,
		[MODIFIER_STATE_NO_HEALTH_BAR] = true,
		[MODIFIER_STATE_OUT_OF_GAME] = true
	}
	return states
end
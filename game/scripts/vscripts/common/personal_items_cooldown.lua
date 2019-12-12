_G.lastTimeBuyItemWithCooldown = {}
local infinityCooldown = 999999

_G.itemsCooldownForPlayer = {
	["item_disable_help_custom"] = 10,
	["item_mute_custom"] = 10,
}

function CDOTA_Item:HasPersonalCooldown()
	return itemsCooldownForPlayer[self:GetName()] and true
end

function CDOTA_BaseNPC:CheckPersonalCooldown(itemName)
	local buyerEntIndex = self:GetEntityIndex()
	local unique_key = itemName .. "_" .. buyerEntIndex
	local playerID = self:GetPlayerID()
	if _G.lastTimeBuyItemWithCooldown[unique_key] == nil or (_G.itemsCooldownForPlayer[itemName] and (GameRules:GetGameTime() - _G.lastTimeBuyItemWithCooldown[unique_key]) >= _G.itemsCooldownForPlayer[itemName]) then
		_G.lastTimeBuyItemWithCooldown[unique_key] = GameRules:GetGameTime()
		return true
	elseif _G.itemsCooldownForPlayer[itemName] then
		if _G.itemsCooldownForPlayer[itemName] < infinityCooldown then
			CustomGameEventManager:Send_ServerToPlayer(PlayerResource:GetPlayer(playerID), "display_custom_error", { message = "#fast_buy_items" })
		else
			CustomGameEventManager:Send_ServerToPlayer(PlayerResource:GetPlayer(playerID), "display_custom_error", { message = "#you_can_buy_only_one_item" })
		end
		return false
	end
	return true
end
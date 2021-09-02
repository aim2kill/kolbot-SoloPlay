/*
 *    @filename   	Sorceress.MeteorbBuild.js
 *	  @author	  	isid0re, theBGuy
 *    @desc      	Sorceress meteorb build
 */

var finalBuild = {
	caster: true,
	skillstab: 8, //fire
	wantedskills: [64, 56, 65], // frozen orb, meteor, cold mastery
	usefulskills: [47, 61, 42], // fireball, fire mastery, static
	precastSkills: [40], // Frozen armor
	mercAuraName: "Holy Freeze",
	mercAuraWanted: 114,
	mercDiff: 1,
	stats: [
		["strength", 48], ["vitality", 165], ["strength", 61], ["vitality", 252], ["strength", 127], ["dexterity", "block"], ["vitality", "all"]
	],
	skills: [
		[36, 1], // Fire Bolt
		[37, 1], // Warmth
		[40, 1], // Frozen Armor
		[39, 1], // Ice Bolt
		[45, 1], // Ice Blast
		[42, 1], // Static
		[43, 1], // Telekensis
		[41, 1], // Inferno
		[46, 1], // Blaze
		[44, 1], // Frost nova
		[47, 7], // Fireball
		[54, 1], // Teleport
		[55, 1], // Glacial Spike
		[51, 1], // Firewall
		[47, 14], // Fireball
		[59, 1], // Blizzard
		[56, 1], // Meteor
		[64, 1], // Frozen Orb
		[61, 1], // Fire Mastery
		[65, 1], // cold mastery
		[56, 20], // Meteor
		[64, 20], // Frozen Orb
		[65, 12], // cold mastery
		[47, 20], // Fire Ball
		[61, 20], // Fire Mastery
		[36, 20], // Firebolt
	],
	autoEquipTiers: [ // autoequip final gear
		//weapon
		"[name] == swirlingcrystal && [quality] == set && [flag] != ethereal # [skilllightningmastery]+[skillfiremastery]+[skillcoldmastery] >= 3 # [tier] == 100000 + tierscore(item)", //tals orb
		//Helmet
		"[name] == deathmask && [quality] == set && [flag] != ethereal # [coldresist] == 15 && [lightresist] == 15 # [tier] == 100000", //tals mask
		//belt
		"[name] == meshbelt && [quality] == set && [flag] != ethereal # [itemmagicbonus] >= 10 # [tier] == 100000 + tierscore(item)", //tals belt
		//boots
		"[name] == battleboots && [quality] == unique && [flag] != ethereal # [itemmagicbonus] >= 50 # [tier] == 5000 + tierscore(item)", //war traveler
		"[name] == scarabshellboots && [quality] == unique # [strength]+[vitality] >= 20 # [tier] == 100000 + tierscore(item)", //sandstorm treks
		//armor
		"[name] == lacqueredplate && [quality] == set # [coldresist] >= 1 # [tier] == 100000", //tals armor
		//shield
		"[name] == roundshield && [quality] == unique && [flag] != ethereal # [enhanceddefense] >= 180 # [tier] == 50000 + tierscore(item)", //mosers
		"[name] == hyperion && [flag] == runeword # [fhr] >= 20 && [enhanceddefense] >= 130 && [fireresist] >= 50 # [tier] == 100000", //Sanctuary
		//gloves
		"[name] == lightgauntlets && [quality] == unique && [flag] != ethereal # [fcr] >= 20 # [tier] == 100000 + tierscore(item)", //magefist
		//ammy
		"[name] == amulet && [quality] == set # [lightresist] == 33 # [tier] == 100000", //tals ammy
		//rings
		"[type] == ring && [quality] == unique # [dexterity] >= 20 # [tier] == 100000", //ravenfrost
		"[type] == ring && [quality] == unique # [itemmagicbonus] >= 30 # [tier] == 100000", //nagelring
		//Charms
		"[name] == smallcharm && [quality] == magic # [fireresist]+[lightresist]+[coldresist]+[poisonresist] >= 20 && [maxhp] >= 20 # [invoquantity] == 3 && [finalcharm] == true && [charmtier] == 1000 + charmscore(item)",
		"[name] == smallcharm && [quality] == magic # [fireresist]+[lightresist]+[coldresist]+[poisonresist] >= 20 && [itemmagicbonus] >= 7 # [invoquantity] == 3 && [finalcharm] == true && [charmtier] == 1000 + charmscore(item)",
		"[name] == smallcharm && [quality] == magic # [fireresist]+[lightresist]+[coldresist]+[poisonresist] >= 20 && [fhr] >= 5 # [invoquantity] == 1 && [finalcharm] == true && [charmtier] == 1000 + charmscore(item)",
		"[name] == grandcharm && [quality] == magic # [coldskilltab] == 1 # [invoquantity] == 1 && [finalcharm] == true && [charmtier] == 1000 + charmscore(item)",
		"[name] == grandcharm && [quality] == magic # [fireskilltab] == 1 # [invoquantity] == 1 && [finalcharm] == true && [charmtier] == 1000 + charmscore(item)",
		//Switch
		"[name] == crystalsword && [flag] == runeword # [plusskillbattleorders] >= 1 # [secondarytier] == 100000",
		"[type] == shield # [itemallskills] >= 1 # [secondarytier] == 100000 + tierscore(item)", //Any 1+ all skill shield
		//merc
		"[type] == armor && [flag] == runeword # [enhanceddefense] >= 200 && [enhanceddamage] >= 300 # [merctier] == 100000",	//Fortitude
		"[name] == demonhead && [quality] == unique && [flag] == ethereal # [strength] >= 25 && [enhanceddefense] >= 100 # [merctier] == 50000",	//Eth Andy's
	]
};
/**
*	@filename	a1chests.js
*	@author		theBGuy
*	@desc		Open super-chests in configured act 1 areas
*/

function a1chests() {
	print('ÿc8Kolbot-SoloPlayÿc0: starting a1 chests');
	me.overhead("a1 chests");

	let areas = [sdk.areas.CaveLvl2, sdk.areas.UndergroundPassageLvl2, sdk.areas.HoleLvl2, sdk.areas.PitLvl2];

	Town.doChores();

	for (let i = 0; i < areas.length; i++) {
		try {
			// Don't run pits for its chest, when it was cleared during the pits script
			if (((me.sorceress && me.charlvl >= 80) || me.barbarian) && areas[i] === sdk.areas.PitLvl2) {
				continue;
			}

			print("ÿc8Kolbot-SoloPlayÿc0: Moving to " + Pather.getAreaName(areas[i]));
			me.overhead("Moving to " + Pather.getAreaName(areas[i]));
			Pather.journeyTo(areas[i]);
			Precast.doPrecast();
			Misc.openChestsInArea(areas[i]);
			Town.doChores();
		} catch (e) {
			print("ÿc8Kolbot-SoloPlayÿc0: Failed to move to " + Pather.getAreaName(areas[i]));
			print("ÿc8Kolbot-SoloPlayÿc0: " + e);
			continue;
		}
	}

	return true;
}

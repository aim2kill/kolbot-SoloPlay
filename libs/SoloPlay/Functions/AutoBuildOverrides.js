/**
*  @filename    AutoBuildOverrides.js
*  @author      theBGuy
*  @credit      alogwe - orignal author
*  @desc        modified AutoBuild for easier use with Kolbot-SoloPlay
*
*/
js_strict(true);

includeIfNotIncluded("SoloPlay/Functions/Globals.js");
includeIfNotIncluded("SoloPlay/Functions/MiscOverrides.js");
includeIfNotIncluded("SoloPlay/Functions/CubingOverrides.js");
includeIfNotIncluded("SoloPlay/Functions/PrototypeOverrides.js");
includeIfNotIncluded("SoloPlay/Functions/RunewordsOverrides.js");

const AutoBuild = new function AutoBuild () {
	Config.AutoBuild.DebugMode && (Config.AutoBuild.Verbose = true);
	const debug = !!Config.AutoBuild.DebugMode;
	const verbose = !!Config.AutoBuild.Verbose;
	let currAutoBuild;
	let configUpdateLevel = 0, lastSuccessfulUpdateLevel = 0;

	const log = (message) => FileTools.appendText(getLogFilename(), message + "\n");
	const getCurrentScript = () => getScript(true).name.toLowerCase();

	// Apply all Update functions from the build template in order from level 1 to me.charlvl.
	// By reapplying all of the changes to the Config object, we preserve
	// the state of the Config file without altering the saved char config.
	function applyConfigUpdates () {
		let cLvl = me.charlvl;
		debug && this.print("Updating Config from level " + configUpdateLevel + " to " + cLvl);
		let reapply = true;

		while (configUpdateLevel < cLvl) {
			configUpdateLevel += 1;
			Skill.init();
			if (currAutoBuild[configUpdateLevel] !== undefined) {
				currAutoBuild[configUpdateLevel].Update.apply(Config);
				lastSuccessfulUpdateLevel = configUpdateLevel;
			} else if (reapply) {
				// re-apply from the last successful update - this is helpful if inside the build file there are conditional statements
				currAutoBuild[lastSuccessfulUpdateLevel].Update.apply(Config);
				reapply = false;
			}
		}
	}

	function getBuildType () {
		let build = CharInfo.getActiveBuild();
		if (!build) {
			this.print("Config.AutoBuild.Template is either 'false', or invalid (" + build + ")");
			throw new Error("Invalid build template, read libs/config/Builds/README.txt for information");
		}
		return build;
	}

	function getLogFilename () {
		let d = new Date();
		let dateString = d.getMonth() + "_" + d.getDate() + "_" + d.getFullYear();
		return "logs/AutoBuild." + me.realm + "." + me.charname + "." + dateString + ".log";
	}

	function getTemplateFilename () {
		let className = sdk.player.class.nameOf(me.classid);
		let build = getBuildType();
		let template = "SoloPlay/BuildFiles/" + className + "/" + className + "." + build + "Build.js";
		return template.toLowerCase();
	}

	function initialize () {
		let currentScript = getCurrentScript();
		let template = getTemplateFilename();
		this.print("Including build template " + template + " into " + currentScript);
		if (!include(template)) throw new Error("Failed to include template: " + template);
		if (["Start", "Stepping", "Leveling"].includes(CharInfo.getActiveBuild())) {
			currAutoBuild = build.AutoBuildTemplate;
		} else {
			currAutoBuild = finalBuild.AutoBuildTemplate;
		}

		// Only load() helper thread from default.dbj if it isn't loaded
		if (currentScript === "libs\\soloplay\\soloplay.js" && !getScript("libs\\SoloPlay\\Threads\\AutoBuildThread.js")) {
			load("libs/SoloPlay/Threads/AutoBuildThread.js");
			delay(500);
		}

		// All threads except autobuildthread.js use this event listener
		// to update their thread-local Config object
		if (currentScript !== "libs\\SoloPlay\\Threads\\AutoBuildThread.js") {
			addEventListener("scriptmsg", levelUpHandler);
		}

		// Resynchronize our Config object with all past changes
		// made to it by AutoBuild system
		applyConfigUpdates();
	}

	function levelUpHandler (obj) {
		if (typeof obj === "object" && obj.hasOwnProperty("event") && obj.event === "level up") {
			applyConfigUpdates();
		}
	}

	// Only print to console from autobuildthread.js,
	// but log from all scripts
	function myPrint () {
		let args = Array.prototype.slice.call(arguments);
		args.unshift("AutoBuild:");
		let result = args.join(" ");
		verbose && print.call(this, result);
		debug && log.call(this, result);
	}

	this.print = myPrint;
	this.initialize = initialize;
	this.applyConfigUpdates = applyConfigUpdates;
};

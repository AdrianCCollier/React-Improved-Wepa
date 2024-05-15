import coffeepot from './coffeepot.mp3';
import future from './future.mp3';
import gabagool from './gabagool.mp3'; // Fixed typo from np3 to mp3
import hailTheMagicConch from './hailTheMagicConch.mp3';
import isThisTheKrustyKrab from './isThisTheKrustyKrab.mp3';
import jellyFishJam from './JellyfishJam.mp3';
import mrKrabsRobotSongOriginal from './MrKrabsRobotSongOriginal.mp3';
import mrKrabsRobotSongRemix from './MrKrabsRobotSongRemix.mp3';
import myLeg from './MYLEG.mp3';
import neHoyMenoy from './NEHOYMENOY.mp3';
import defaultSound from './notification.mp3';
import patrickScreaming from './Patrick_Screaming.mp3';
import redBoneCarlWheezer from './Redbone - Carl Wheezer.mp3';
import sellingChocolate from './sellingChocolate.mp3';
import spongeBobandPatrickRobBank from './spongebobAndPatrickRobABank.mp3';
import whoYouCallinPinhead from './whoYouCallinPinhead.mp3';
import wumbo from './wumbo.mp3';

function formatSoundName(name) {
  // Replace camelCase and other separators with spaces and capitalize each word
  return name
    .replace(/([a-z])([A-Z])/g, '$1 $2') // camelCase to separate words
    .replace(/([A-Z])/g, ' $1') // Handle all-uppercase words
    .replace(/[-_]/g, ' ') // Replace dashes and underscores with spaces
    .trim()
    .replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize each word
}

// Exporting all sounds as an object
const sounds = {
  defaultSound,
  coffeepot,
  future,
  gabagool,
  hailTheMagicConch,
  isThisTheKrustyKrab,
  jellyFishJam,
  mrKrabsRobotSongOriginal,
  mrKrabsRobotSongRemix,
  myLeg,
  neHoyMenoy,
  patrickScreaming,
  redBoneCarlWheezer,
  sellingChocolate,
  spongeBobandPatrickRobBank,
  whoYouCallinPinhead,
  wumbo,
};

// Create an array of formatted sound names for the dropdown
const soundOptions = Object.keys(sounds).map((key) => ({
  key,
  displayName: formatSoundName(key),
}));

export { sounds, soundOptions };

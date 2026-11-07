import test from 'node:test';
import assert from 'node:assert/strict';
import {
  BASE_FRAME_WIDTH,
  BASE_FRAME_HEIGHT,
  computeFrameUnit,
  isMobileViewport,
  getSceneConfig,
  getDesktopLayoutCoordinates,
  getChapterCards,
  getAnimationTimelineDelays,
} from './frame';

test('computeFrameUnit scales correctly with viewport width', () => {
  assert.equal(computeFrameUnit(1440), 1);
  assert.equal(computeFrameUnit(720), 0.5);
  assert.equal(computeFrameUnit(2880), 2);
});

test('isMobileViewport matches 820px boundary', () => {
  assert.equal(isMobileViewport(820), true);
  assert.equal(isMobileViewport(821), false);
  assert.equal(isMobileViewport(390), true);
  assert.equal(isMobileViewport(1440), false);
});

test('getSceneConfig has exact aspect ratio and video overlay dimensions', () => {
  const scene = getSceneConfig();
  assert.equal(scene.aspectRatio, '9 / 8');
  assert.equal(scene.videoStyle.width, '100%');
  assert.equal(scene.videoStyle.height, '112.5%');
  assert.equal(scene.videoStyle.top, '-6.25%');
  assert.equal(scene.mobileShift.left, '18%');
  assert.equal(scene.mobileShift.transform, 'translateX(-18%)');
});

test('desktop layout coordinates match prompt specifications precisely', () => {
  const coords = getDesktopLayoutCoordinates();
  // Nav
  assert.equal(coords.logo.x, 31);
  assert.equal(coords.logo.y, 23);
  assert.equal(coords.logo.fontSize, 29.5);

  assert.equal(coords.navPill.x, 443);
  assert.equal(coords.navPill.y, 13);
  assert.equal(coords.navPill.width, 546);
  assert.equal(coords.navPill.height, 50);
  assert.equal(coords.navPill.radius, 25);
  assert.equal(coords.navPill.itemSpacing, 54);
  assert.equal(coords.navPill.paddingLeft, 49);

  assert.equal(coords.joinNav.x, 1311);
  assert.equal(coords.joinNav.y, 14);
  assert.equal(coords.joinNav.width, 105);
  assert.equal(coords.joinNav.height, 45);
  assert.equal(coords.joinNav.fontSize, 18.5);

  // Kicker & Headline
  assert.equal(coords.kicker.y, 203);
  assert.equal(coords.kicker.fontSize, 40.5);
  assert.equal(coords.headline.y, 261);
  assert.equal(coords.headline.fontSize, 143.5);
  assert.equal(coords.headline.lineHeight, 118);

  // Buttons
  assert.equal(coords.joinButton.x, 550);
  assert.equal(coords.joinButton.y, 617);
  assert.equal(coords.joinButton.width, 144);
  assert.equal(coords.joinButton.height, 59);

  assert.equal(coords.watchButton.x, 707);
  assert.equal(coords.watchButton.y, 619);
  assert.equal(coords.watchButton.width, 184);
  assert.equal(coords.watchButton.height, 58);

  // Chapters header
  assert.equal(coords.chaptersTitle.x, 137);
  assert.equal(coords.chaptersTitle.y, 866);
  assert.equal(coords.chaptersTitle.fontSize, 36);
  assert.equal(coords.chaptersLink.rightX, 1308);
  assert.equal(coords.chaptersLink.fontSize, 22);
});

test('chapter cards are 378x273 at x=133, 531, 929 and y=913 with 20px gap and right edge at 1307', () => {
  const cards = getChapterCards();
  assert.equal(cards.length, 3);

  assert.equal(cards[0].x, 133);
  assert.equal(cards[0].y, 913);
  assert.equal(cards[0].width, 378);
  assert.equal(cards[0].height, 273);

  assert.equal(cards[1].x, 531);
  assert.equal(cards[1].y, 913);

  assert.equal(cards[2].x, 929);
  assert.equal(cards[2].y, 913);

  // 133 + 378 = 511; 531 - 511 = 20 gap
  assert.equal(cards[1].x - (cards[0].x + cards[0].width), 20);
  // 531 + 378 = 909; 929 - 909 = 20 gap
  assert.equal(cards[2].x - (cards[1].x + cards[1].width), 20);
  // 929 + 378 = 1307, aligned with 1308 right boundary
  assert.equal(cards[2].x + cards[2].width, 1307);
});

test('animation timeline staggers headline lines exactly 0.16s (160ms) apart', () => {
  const delays = getAnimationTimelineDelays();
  assert.equal(delays.headlineLine2 - delays.headlineLine1, 160);
  assert.ok(delays.kickerUnblur < delays.headlineLine1);
  assert.ok(delays.headlineLine2 < delays.sublineRise);
  assert.ok(delays.sublineRise < delays.buttonsRise);
  assert.ok(delays.buttonsRise < delays.chaptersHeaderRise);
  assert.ok(delays.chaptersHeaderRise < delays.card1Rise);
});

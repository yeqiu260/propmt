/**
 * Pure layout and animation calculation utilities for Meadowbell Hero
 */

export interface Coordinate {
  x?: number;
  y?: number;
  rightX?: number;
  width?: number;
  height?: number;
  fontSize?: number;
  lineHeight?: number;
  radius?: number;
  itemSpacing?: number;
  paddingLeft?: number;
}

export interface ChapterCardInfo {
  id: string;
  number: number;
  title: string;
  synopsis: string;
  imageUrl: string;
  x: number;
  y: number;
  width: number;
  height: number;
  radius: number;
}

export const BASE_FRAME_WIDTH = 1440;
export const BASE_FRAME_HEIGHT = 1280;
export const MOBILE_BREAKPOINT = 820;

export function computeFrameUnit(viewportWidth: number): number {
  return viewportWidth / BASE_FRAME_WIDTH;
}

export function isMobileViewport(viewportWidth: number): boolean {
  return viewportWidth <= MOBILE_BREAKPOINT;
}

export function getSceneConfig() {
  return {
    plateUrl: 'https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/3ca5d10d-ea2f-4907-876f-33bde169469e.jpg',
    videoUrl: 'https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/d2cb5bef-f92b-4e91-ae93-8dc6555e56ac.mp4',
    aspectRatio: '9 / 8',
    videoStyle: {
      width: '100%',
      height: '112.5%',
      top: '-6.25%',
      left: '0%',
    },
    mobileShift: {
      left: '18%',
      transform: 'translateX(-18%)',
    },
  };
}

export function getDesktopLayoutCoordinates(): Record<string, Coordinate> {
  return {
    logo: { x: 31, y: 23, fontSize: 29.5 },
    navPill: { x: 443, y: 13, width: 546, height: 50, radius: 25, itemSpacing: 54, paddingLeft: 49, fontSize: 19.5 },
    joinNav: { x: 1311, y: 14, width: 105, height: 45, fontSize: 18.5 },
    kicker: { y: 203, fontSize: 40.5 },
    headline: { y: 261, fontSize: 143.5, lineHeight: 118 },
    subline: { y: 522, fontSize: 21.2, lineHeight: 27 },
    joinButton: { x: 550, y: 617, width: 144, height: 59, fontSize: 22 },
    watchButton: { x: 707, y: 619, width: 184, height: 58, fontSize: 19.5 },
    chaptersTitle: { x: 137, y: 866, fontSize: 36 },
    chaptersLink: { rightX: 1308, fontSize: 22 },
  };
}

export function getChapterCards(): ChapterCardInfo[] {
  return [
    {
      id: 'chapter-1',
      number: 1,
      title: 'The Great Tomato Mystery',
      synopsis: 'A vegetable garden adventure with tomato stakes and a cozy cottage.',
      imageUrl: 'https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/cd2d844f-ae3f-4fa9-8067-b077530b6e71.webp',
      x: 133,
      y: 913,
      width: 378,
      height: 273,
      radius: 15,
    },
    {
      id: 'chapter-2',
      number: 2,
      title: 'High Hill Shepherd',
      synopsis: 'The boy and dog venture along a breezy path among gentle sheep above the sea.',
      imageUrl: 'https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/48f5b97e-c27c-4afd-9427-eb35aebd1751.webp',
      x: 531,
      y: 913,
      width: 378,
      height: 273,
      radius: 15,
    },
    {
      id: 'chapter-3',
      number: 3,
      title: 'Kite Over Hollyoak',
      synopsis: 'A girl in a straw hat flies a cheerful kite on a sun-drenched afternoon ridge.',
      imageUrl: 'https://d2ol7oe51mr4n9.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/cde5384e-ce4d-423f-925a-451b779066e0.webp',
      x: 929,
      y: 913,
      width: 378,
      height: 273,
      radius: 15,
    },
  ];
}

export function getAnimationTimelineDelays() {
  const line1 = 360;
  const line2 = line1 + 160; // 0.16s apart
  return {
    navDrop: 0,
    kickerUnblur: 240,
    headlineLine1: line1,
    headlineLine2: line2,
    sublineRise: 660,
    buttonsRise: 800,
    chaptersHeaderRise: 940,
    card1Rise: 1040,
    card2Rise: 1140,
    card3Rise: 1240,
  };
}

import { TCalculatorFields, TCalculatorForm } from 'constants/types';

export const DEFAULT_VALUES: Omit<TCalculatorForm, 'calculatorGen' | 'pokemon1' | 'pokemon2'> = {
  level1: 100,
  gender1: 'MALE',
  evatk1: 0,
  evdef1: 0,
  evhp1: 0,
  evspatk1: 0,
  evspdef1: 0,
  evspeed1: 0,
  ivatk1: 31,
  ivdef1: 31,
  ivhp1: 31,
  ivspatk1: 31,
  ivspdef1: 31,
  ivspeed1: 31,
  modatk1: 0,
  moddef1: 0,
  modspatk1: 0,
  modspdef1: 0,
  modspeed1: 0,
  nature1: undefined,
  ability1: undefined,
  item1: undefined,
  status1: undefined,
  currenthp1: 0,
  level2: 100,
  gender2: 'MALE',
  evatk2: 0,
  evdef2: 0,
  evhp2: 0,
  evspatk2: 0,
  evspdef2: 0,
  evspeed2: 0,
  ivatk2: 31,
  ivdef2: 31,
  ivhp2: 31,
  ivspatk2: 31,
  ivspdef2: 31,
  ivspeed2: 31,
  modatk2: 0,
  moddef2: 0,
  modspatk2: 0,
  modspdef2: 0,
  modspeed2: 0,
  nature2: undefined,
  ability2: undefined,
  item2: undefined,
  status2: undefined,
  currenthp2: 100,
  cannonade1: false,
  cannonade2: false,
  isAuroraVeil1: false,
  isAuroraVeil2: false,
  isBattery1: false,
  isBattery2: false,
  isHelpingHand1: false,
  isHelpingHand2: false,
  isLightScreen1: false,
  isLightScreen2: false,
  isProtected1: false,
  isProtected2: false,
  isReflect1: false,
  isReflect2: false,
  isSeeded1: false,
  isSeeded2: false,
  isSR1: false,
  isSR2: false,
  isTailwind1: false,
  isTailwind2: false,
  spikes1: 0,
  spikes2: 0,
  steelsurge1: false,
  steelsurge2: false,
  vinelash1: false,
  vinelash2: false,
  volcalith1: false,
  volcalith2: false,
  wildfire1: false,
  wildfire2: false,
  move1_1: undefined,
  move1_2: undefined,
  move2_1: undefined,
  move2_2: undefined,
  move3_1: undefined,
  move3_2: undefined,
  move4_1: undefined,
  move4_2: undefined,
};

export const SIDE_FIELD: { [key in keyof Omit<TCalculatorFields, 'spikes'>]: string } = {
  isLightScreen: 'Light Screen',
  isReflect: 'Reflect',
  isProtected: 'Protect',
  isSR: 'Stealth Rock',
  isSeeded: 'Leech Seed',
  isTailwind: 'Tailwind',
  isHelpingHand: 'Helping Hand',
  cannonade: 'Cannonade',
  isAuroraVeil: 'Aurora Veil',
  isBattery: 'Battery',
  steelsurge: 'Steelsurge',
  vinelash: 'Vinelash',
  volcalith: 'Volcalith',
  wildfire: 'Wildfire',
};

export const getDefaultValues = (
  pokemon1?: number,
  pokemon2?: number
): Omit<TCalculatorForm, 'calculatorGen'> => {
  return {
    ...(!!pokemon1 && { pokemon1 }),
    ...(!!pokemon2 && { pokemon2 }),
    ...DEFAULT_VALUES,
  };
};

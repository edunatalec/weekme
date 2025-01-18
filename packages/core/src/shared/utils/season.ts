import { SeasonName } from 'src/shared/entities';

export const getSeasonName = (season: SeasonName): string => {
  return (<{ [Key in SeasonName]: string }>{
    FALL: 'Outono',
    SPRING: 'Primavera',
    SUMMER: 'Verão',
    WINTER: 'Inverno',
  })[season];
};

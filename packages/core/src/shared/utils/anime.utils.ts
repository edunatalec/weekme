import { AnimeStatus } from 'src/shared/entities';

export const WEEKDAYS = [
  'Domingo',
  'Segunda-feira',
  'Terça-feira',
  'Quarta-feira',
  'Quinta-feira',
  'Sexta-feira',
  'Sábado',
];

export const getWeekdayName = (weekday: number): string => {
  return WEEKDAYS[weekday];
};

export const getStatusName = (status: AnimeStatus): string => {
  return (<{ [Key in AnimeStatus]: string }>{
    FINISHED: 'Finalizado',
    HIATUS: 'Hiatus',
    RELEASING: 'Em lançamento',
    TO_RELEASE: 'Para lançar',
  })[status];
};

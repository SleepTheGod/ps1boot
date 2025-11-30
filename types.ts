export enum AppState {
  POWER_OFF = 'POWER_OFF',
  STARTUP_LOGO = 'STARTUP_LOGO',
  BLACK_SCREEN = 'BLACK_SCREEN', // Simulating the seek/no-disk check
  BIOS_MENU = 'BIOS_MENU',
  MEMORY_CARD = 'MEMORY_CARD',
  CD_PLAYER = 'CD_PLAYER'
}

export interface NavItem {
  id: string;
  label: string;
  x: number;
  y: number;
}
import {type ClassValue, clsx} from "clsx"
import {twMerge} from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const hexToRgba = (hex: string | undefined, opacity: number = 0.3): string => {
  if (!hex) return 'rgba(0, 0, 0, 0.3)';
  const cleanHex = hex.replace('#', '');
  const isShortHex = cleanHex.length === 3;
  const r = parseInt(isShortHex ? cleanHex[0] + cleanHex[0] : cleanHex.substring(0, 2), 16);
  const g = parseInt(isShortHex ? cleanHex[1] + cleanHex[1] : cleanHex.substring(2, 4), 16);
  const b = parseInt(isShortHex ? cleanHex[2] + cleanHex[2] : cleanHex.substring(4, 6), 16);
  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
};

export const price = (value: number | string) => {
  if (value) {
    return `$  ${Number(value).toLocaleString('en-AU').toString()}        `
  }

  return ''

};


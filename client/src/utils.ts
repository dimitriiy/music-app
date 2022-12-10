import { duration } from "@mui/material";

export const getId = () => Math.random().toString(36).slice(2);

export const storage = {
  set<T>(key: string, value: T) {
    localStorage.setItem(key, JSON.stringify(value));
  },
  get<T>(key: string): T | null {
    return localStorage.getItem(key)
      ? JSON.parse(localStorage.getItem(key) as string)
      : null;
  },
};

export const formatDuration = (duration: number) => {
  const min = +Math.floor(duration / 60);
  const sec = +Math.floor(duration % 60);

  const formatMin = min < 9 ? `0${min}` : min;
  const formatSec = sec < 9 ? `0${sec}` : sec;

  return `${formatMin}:${formatSec}`;
};

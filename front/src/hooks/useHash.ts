import { useSyncExternalStore } from 'react';

function subscribe(callback: () => void) {
  window.addEventListener('hashchange', callback);
  // # を削除
  return () => window.removeEventListener('hashchange', callback);
}

function getSnapshot() {
  return window.location.hash.replace('#', '');
}

function getServerSnapshot() {
  return ''; // SSR時は空のハッシュを返す
}

export function useHash() {
  const hash = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const setHash = (newHash: string) => {
    window.location.hash = newHash;
  };

  return [hash, setHash] as const;
}

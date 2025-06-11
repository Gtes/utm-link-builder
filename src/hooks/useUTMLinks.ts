import { useCallback, useEffect, useState } from 'react';

import z from 'zod';

export type UTMLink = z.infer<ReturnType<typeof z.object<{ id: z.ZodString }>>>;

const STORAGE_KEY = 'utm-links';

const getStoredLinks = (): UTMLink[] => {
  const raw = localStorage.getItem(STORAGE_KEY);
  return raw ? JSON.parse(raw) : [];
};

export const useUTMLinks = () => {
  const [links, setLinks] = useState<UTMLink[]>([]);

  useEffect(() => {
    setLinks(getStoredLinks());
  }, []);

  const saveToStorage = (updated: UTMLink[]) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    setLinks(updated);
  };

  const addLink = useCallback((link: UTMLink) => {
    const updated = [link, ...getStoredLinks()];
    saveToStorage(updated);
  }, []);

  const deleteLink = useCallback((id: string) => {
    const updated = getStoredLinks().filter((l) => l.id !== id);
    saveToStorage(updated);
  }, []);

  const updateLink = useCallback((link: UTMLink) => {
    const updated = getStoredLinks().map((l) => (l.id === link.id ? link : l));
    saveToStorage(updated);
  }, []);

  const getLinkById = useCallback((id: string) => {
    return getStoredLinks().find((l) => l.id === id);
  }, []);

  return {
    links,
    addLink,
    deleteLink,
    updateLink,
    getLinkById,
  };
};

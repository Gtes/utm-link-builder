import { useState } from 'react';

export const useCopyToClipboard = (timeout = 2000) => {
  const [copiedValue, setCopiedValue] = useState<string | null>(null);
  const [isCopying, setIsCopying] = useState(false);

  const copy = async (text: string) => {
    if (isCopying) return;

    try {
      await navigator.clipboard.writeText(text);
      setCopiedValue(text);
      setIsCopying(true);

      setTimeout(() => {
        setCopiedValue(null);
        setIsCopying(false);
      }, timeout);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return { copiedValue, isCopying, copy };
};

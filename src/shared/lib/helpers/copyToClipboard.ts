export const copyToClipboard = async (textToCopy: string) => {
  if (!navigator.clipboard) return;
  await navigator.clipboard.writeText(textToCopy);
};

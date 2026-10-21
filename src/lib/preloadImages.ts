/**
 * Pré-carregador assíncrono de imagens externas (ex: Google Drive).
 * Cria instâncias de Image() em segundo plano para forçar o download
 * e cache das imagens pelo navegador antes de liberar a interface.
 */
export async function preloadImages(
  urls: string[],
  onProgress?: (loaded: number, total: number) => void
): Promise<void> {
  if (!urls || urls.length === 0) return;

  let loadedCount = 0;
  const total = urls.length;

  const promises = urls.map((url) => {
    return new Promise<void>((resolve) => {
      if (typeof window === 'undefined') {
        resolve();
        return;
      }

      const img = new window.Image();
      let isSettled = false;

      const handleComplete = () => {
        if (isSettled) return;
        isSettled = true;
        loadedCount += 1;
        if (onProgress) {
          onProgress(loadedCount, total);
        }
        resolve();
      };

      img.onload = handleComplete;
      img.onerror = handleComplete; // Não interrompe as outras imagens se uma falhar
      img.src = url;

      // Se a imagem já estiver no cache do navegador
      if (img.complete) {
        handleComplete();
      }
    });
  });

  await Promise.all(promises);
}

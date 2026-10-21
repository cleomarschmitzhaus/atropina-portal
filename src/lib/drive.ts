/**
 * Utilitários para reproduzir arquivos públicos do Google Drive no site
 * utilizando o proxy de streaming ultra-rápido da Cloudflare.
 *
 * O Cloudflare Worker repassa as requisições com suporte a Range requests (bytes),
 * permitindo adiantar/voltar nas faixas e liberando CORS sem os bloqueios do Google.
 */

export const AUDIO_WORKER_URL =
  process.env.NEXT_PUBLIC_AUDIO_WORKER_URL ||
  'https://atropina-audio.cleomar-schmitzhaus.workers.dev';

/** Extrai o ID de um arquivo do Drive a partir de diferentes formatos de link. */
export function extractDriveId(url: string): string | null {
  if (!url) return null;
  const idParam = url.match(/[?&]id=([a-zA-Z0-9_-]{20,})/);
  if (idParam) return idParam[1];
  const filePath = url.match(/\/file\/d\/([a-zA-Z0-9_-]{20,})/);
  if (filePath) return filePath[1];
  return null;
}

/** Monta o link de streaming de áudio através do Cloudflare Worker. */
export function getDriveStreamUrl(fileId: string): string {
  return `${AUDIO_WORKER_URL}/?id=${fileId}`;
}

/**
 * Converte o `src` de uma faixa vinda do Apps Script para o link de streaming no Worker.
 * Links que não são do Drive (ex: arquivos locais) são mantidos como estão.
 */
export function toStreamableSrc(src: string, fallbackId?: string): string {
  if (!src) return src;
  const isDriveLink = /drive\.google\.com|docs\.google\.com|drive\.usercontent\.google\.com/.test(src);
  if (!isDriveLink) return src;
  const id = extractDriveId(src) || fallbackId;
  return id ? getDriveStreamUrl(id) : src;
}

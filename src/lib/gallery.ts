import { GALLERY_SCRIPT_URL, FALLBACK_BACKGROUNDS } from './constants';

const GALLERY_CACHE_KEY = 'atropina_gallery_urls_v1';

let inFlightPromise: Promise<string[]> | null = null;
let memoryCache: string[] | null = null;

/**
 * Busca e compartilha as URLs da galeria com deduplicação de requisições em andamento,
 * cache em memória/sessionStorage e fallback local caso a rede ou o Drive oscile.
 */
export async function fetchGalleryImageUrls(): Promise<string[]> {
  if (memoryCache && memoryCache.length > 0) {
    return memoryCache;
  }

  if (typeof window !== 'undefined') {
    try {
      const cached = sessionStorage.getItem(GALLERY_CACHE_KEY);
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed) && parsed.length > 0) {
          memoryCache = parsed;
          return parsed;
        }
      }
    } catch {
      // Ignora falhas de sessionStorage (ex: modo privado restrito)
    }
  }

  if (inFlightPromise) {
    return inFlightPromise;
  }

  inFlightPromise = (async () => {
    try {
      const res = await fetch(GALLERY_SCRIPT_URL);
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }

      const data: unknown = await res.json();
      let rawList: Array<{ url?: string }> = [];

      if (Array.isArray(data)) {
        rawList = data;
      } else if (
        data &&
        typeof data === 'object' &&
        'data' in data &&
        Array.isArray((data as { data: unknown }).data)
      ) {
        rawList = (data as { data: Array<{ url?: string }> }).data;
      }

      const urls = rawList
        .map((item) => (typeof item?.url === 'string' ? item.url.trim() : ''))
        .filter(Boolean);

      if (urls.length > 0) {
        memoryCache = urls;
        if (typeof window !== 'undefined') {
          try {
            sessionStorage.setItem(GALLERY_CACHE_KEY, JSON.stringify(urls));
          } catch {
            // Ignora quota de storage
          }
        }
        return urls;
      }

      return FALLBACK_BACKGROUNDS;
    } catch (error) {
      console.error('Usando fallback local de imagens da galeria:', error);
      return FALLBACK_BACKGROUNDS;
    } finally {
      inFlightPromise = null;
    }
  })();

  return inFlightPromise;
}

/**
 * Embaralhamento Fisher-Yates imparcial.
 */
export function shuffleArray<T>(array: readonly T[]): T[] {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

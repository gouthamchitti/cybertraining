// Cache management utility for client-side caching

// Cache storage keys prefix
const CACHE_PREFIX = 'cybertrainer_cache_';

// Cache item interface
interface CacheItem<T> {
  data: T;
  expiry: number;
}

// Set cache item with expiration
export const setCacheItem = <T>(key: string, data: T, expiryInMinutes: number = 60): void => {
  if (typeof window === 'undefined') {
    return;
  }
  
  const now = Date.now();
  const expiryTime = now + (expiryInMinutes * 60 * 1000);
  
  const cacheItem: CacheItem<T> = {
    data,
    expiry: expiryTime
  };
  
  try {
    localStorage.setItem(`${CACHE_PREFIX}${key}`, JSON.stringify(cacheItem));
  } catch (error) {
    console.error('Error setting cache item:', error);
    // If localStorage is full, clear old cache items
    clearOldCacheItems();
    try {
      localStorage.setItem(`${CACHE_PREFIX}${key}`, JSON.stringify(cacheItem));
    } catch (retryError) {
      console.error('Failed to set cache item after clearing old items:', retryError);
    }
  }
};

// Get cache item
export const getCacheItem = <T>(key: string): T | null => {
  if (typeof window === 'undefined') {
    return null;
  }
  
  const cachedData = localStorage.getItem(`${CACHE_PREFIX}${key}`);
  
  if (!cachedData) {
    return null;
  }
  
  try {
    const cacheItem: CacheItem<T> = JSON.parse(cachedData);
    
    // Check if cache has expired
    if (Date.now() > cacheItem.expiry) {
      removeCacheItem(key);
      return null;
    }
    
    return cacheItem.data;
  } catch (error) {
    console.error('Error parsing cache item:', error);
    removeCacheItem(key);
    return null;
  }
};

// Remove cache item
export const removeCacheItem = (key: string): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(`${CACHE_PREFIX}${key}`);
  }
};

// Clear all cache items
export const clearCache = (): void => {
  if (typeof window === 'undefined') {
    return;
  }
  
  // Get all keys in localStorage
  const keys = Object.keys(localStorage);
  
  // Remove all items with the cache prefix
  keys.forEach(key => {
    if (key.startsWith(CACHE_PREFIX)) {
      localStorage.removeItem(key);
    }
  });
};

// Clear old cache items (items that have expired)
export const clearOldCacheItems = (): void => {
  if (typeof window === 'undefined') {
    return;
  }
  
  const now = Date.now();
  const keys = Object.keys(localStorage);
  
  keys.forEach(key => {
    if (key.startsWith(CACHE_PREFIX)) {
      try {
        const cachedData = localStorage.getItem(key);
        if (cachedData) {
          const cacheItem: CacheItem<any> = JSON.parse(cachedData);
          if (now > cacheItem.expiry) {
            localStorage.removeItem(key);
          }
        }
      } catch (error) {
        // If there's an error parsing the item, remove it
        localStorage.removeItem(key);
      }
    }
  });
};

// Cache with fetch API
export const cachedFetch = async <T>(
  url: string,
  options?: RequestInit,
  expiryInMinutes: number = 60
): Promise<T> => {
  const cacheKey = `fetch_${url}_${JSON.stringify(options || {})}`;
  const cachedData = getCacheItem<T>(cacheKey);
  
  if (cachedData) {
    return cachedData;
  }
  
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    setCacheItem<T>(cacheKey, data, expiryInMinutes);
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

export default {
  setCacheItem,
  getCacheItem,
  removeCacheItem,
  clearCache,
  clearOldCacheItems,
  cachedFetch
};

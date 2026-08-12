const PREFIX = 'netforge:'

export function saveData<T>(key: string, value: T): void {
  localStorage.setItem(
    `${PREFIX}${key}`,
    JSON.stringify(value),
  )
}

export function loadData<T>(
  key: string,
  fallback: T,
): T {
  try {
    const value = localStorage.getItem(`${PREFIX}${key}`)

    return value === null
      ? fallback
      : (JSON.parse(value) as T)
  } catch {
    return fallback
  }
}

export function removeData(key: string): void {
  localStorage.removeItem(`${PREFIX}${key}`)
}

export function saveFavorite(
  id: string,
  enabled: boolean,
): void {
  const favorites = loadData<string[]>('favorites', [])

  const updated = enabled
    ? Array.from(new Set([...favorites, id]))
    : favorites.filter((item) => item !== id)

  saveData('favorites', updated)
}

export function getFavorites(): string[] {
  return loadData<string[]>('favorites', [])
}

export function saveNote(
  id: string,
  content: string,
): void {
  const notes = loadData<Record<string, string>>('notes', {})

  notes[id] = content

  saveData('notes', notes)
}

export function getNotes(): Record<string, string> {
  return loadData<Record<string, string>>('notes', {})
}

export function saveLastConfig(
  tool: string,
  config: unknown,
): void {
  saveData(`config:${tool}`, config)
}

export function getLastConfig<T>(
  tool: string,
  fallback: T,
): T {
  return loadData<T>(`config:${tool}`, fallback)
}

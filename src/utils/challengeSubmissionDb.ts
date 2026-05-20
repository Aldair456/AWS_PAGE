const DB_NAME = 'bcp-hackathon-submissions'
const STORE = 'lessonFiles'
const DB_VERSION = 1

function storeKey(challengeId: string, lessonId: string) {
  return `${challengeId}:${lessonId}`
}

export type StoredFileRecord = {
  name: string
  type: string
  lastModified: number
  size: number
  blob: Blob
}

function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION)
    req.onerror = () => reject(req.error ?? new Error('IDB open failed'))
    req.onsuccess = () => resolve(req.result)
    req.onupgradeneeded = () => {
      const db = req.result
      if (!db.objectStoreNames.contains(STORE)) {
        db.createObjectStore(STORE)
      }
    }
  })
}

/** Guarda una copia real de tus archivos en el navegador (IndexedDB); persiste tras recargar la página. */
export async function saveSubmissionFilesDb(
  challengeId: string,
  lessonId: string,
  files: File[],
): Promise<void> {
  const records: StoredFileRecord[] = files.map((f) => ({
    name: f.name,
    type: f.type || 'application/octet-stream',
    lastModified: f.lastModified,
    size: f.size,
    blob: f,
  }))
  const db = await openDb()
  await new Promise<void>((resolve, reject) => {
    const tx = db.transaction(STORE, 'readwrite')
    tx.onerror = () => reject(tx.error)
    tx.oncomplete = () => resolve()
    tx.objectStore(STORE).put(records, storeKey(challengeId, lessonId))
  })
  db.close()
}

export async function loadSubmissionFilesDb(
  challengeId: string,
  lessonId: string,
): Promise<File[]> {
  const db = await openDb()
  const records = await new Promise<StoredFileRecord[] | undefined>((resolve, reject) => {
    const tx = db.transaction(STORE, 'readonly')
    tx.onerror = () => reject(tx.error)
    const req = tx.objectStore(STORE).get(storeKey(challengeId, lessonId))
    req.onerror = () => reject(req.error ?? new Error('IDB get failed'))
    req.onsuccess = () => resolve(req.result as StoredFileRecord[] | undefined)
  })
  db.close()
  if (!records?.length) return []
  return records.map(
    (r) =>
      new File([r.blob], r.name, {
        type: r.type || 'application/octet-stream',
        lastModified: r.lastModified,
      }),
  )
}

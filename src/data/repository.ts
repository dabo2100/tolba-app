import { MemoryAppDataRepository } from './MemoryAppDataRepository'

// Replace only this adapter with an HTTP-backed repository when the API is ready.
// PostgreSQL must be accessed by the backend, never by the browser.
export const appDataRepository = new MemoryAppDataRepository()

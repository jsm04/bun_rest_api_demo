import { Database } from 'bun:sqlite'
import { seedDatabase } from './seed'
import type { UserBase } from './entities'

export const db = new Database('db.sqlite')

await seedDatabase(db)

export const UserDb = {
    findByEmail: (email: string): UserBase[] | unknown[] =>
        db.query('SELECT * FROM users WHERE email = ?;').all(email),
    getAll: () => db.query('SELECT * FROM users').all(),
    updatePasswordByEmail: (email: string, newPassword: string) => {
        const result = db
            .prepare('UPDATE users SET password = ? WHERE email = ?')
            .run(newPassword, email)
        return result.changes
    },
    deleteUserByEmail: (email: string) => {
        const result = db
            .prepare('DELETE FROM users WHERE email = ?')
            .run(email)
        return result.changes
    },
}

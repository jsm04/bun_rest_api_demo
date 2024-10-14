import { Database } from 'bun:sqlite'
import type { User, UserBase } from './entities'
import { faker } from '@faker-js/faker'

const queries_path = import.meta.dir + '/' + 'queries' + '/'

export async function seedDatabase(db: Database) {
    const init = async () => {
        const create_user_table = await Bun.file(
            queries_path + './create_user_table.sql'
        ).text()

        db.query(create_user_table).run()

        const create_user = await Bun.file(
            queries_path + './create_user.sql'
        ).text()

        const insert = db.prepare(create_user)

        const insertMany = db.transaction((users: UserBase[]) => {
            for (const user of users) {
                const { email, firstName, lastName, password, username } = user
                insert.run(username, email, password, firstName, lastName)
            }
        })

        insertMany(Array.from({ length: 100 }).map(() => createMockUser()))
    }

    await init().catch(console.log)
}

function createMockUser(): UserBase {
    return {
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        username: faker.internet.userName(),
    }
}

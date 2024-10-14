import { Hono } from 'hono'
import { UserDb } from './storage/db'
import type { UserBase } from './storage/entities'

const app = new Hono()

app.get('/api/users', async (c) => {
    try {
        const users = UserDb.getAll()
        return c.json(users)
    } catch (error) {
        console.log(error)
    }
})

app.get('/api/users/:email', (c) => {
    const email = c.req.param('email')
    if (!email) return c.json('No email was provided.')
    const user = UserDb.findByEmail(email)
    return c.json(user)
})
    .put(async (c) => {
        const email = c.req.param('email')
        if (!email) return c.json('No email was provided.')
        const user = UserDb.findByEmail(email)[0] as UserBase
        if (!user) return c.json('No user found')
        const body = await c.req.json()
        const { password, new_password } = body
        if (!password) return c.json('No password provided')
        if (!new_password) return c.json('No new password provided')
        if (password !== user.password) return c.json('Wrong password')
        const modified = UserDb.updatePasswordByEmail(email, new_password)
        return c.json(modified)
    })
    .delete(async (c) => {
        const email = c.req.param('email')
        if (!email) return c.json('No email was provided.')
        const user = UserDb.findByEmail(email)[0] as UserBase
        if (!user) return c.json('No user found')
        const body = await c.req.json()
        const { password } = body
        if (!password) return c.json('No password provided')
        if (password !== user.password) return c.json('Wrong password')
        const modified = UserDb.deleteUserByEmail(email)
        return c.json(modified)
    })

export default app

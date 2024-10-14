import { faker } from '@faker-js/faker'

export type OmitBaseRecord<T> = Omit<T, 'id' | 'createdAt'>
export type UserBase = OmitBaseRecord<User>

export type User = {
    id: number
    username: string
    email: string
    password: string
    firstName: string
    lastName: string
    createdAt: Date
}

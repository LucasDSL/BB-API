import { genSalt, hash } from "bcrypt"

export default async (password: string, next: Function): Promise<string> => {
  try {
    const salt = await genSalt()
    const hashedPassword = await hash(password, salt)
    return hashedPassword
  } catch (error) {
    return next(error)
  }
}

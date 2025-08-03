import { User } from "../models/user";

export interface CreateUserDTO extends Omit<User, 'id'>{ }
import { UserRole } from "../enums/user-roles.enum";

export interface User {
    id:number,
    username: string,
    password: string,
    role:UserRole
}
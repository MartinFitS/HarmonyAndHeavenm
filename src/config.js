import {config} from "dotenv"

config()

export const HOST = process.env.HOST;
export const DB = process.env.DB;
export const USERBD = process.env.USERBD;
export const PASSWORDUSERDB = process.env.PASSWORDUSERDB;
export const ADMINROLEPASSWORD = process.env.ADMINROLEPASSWORD;
export const VENDEDORROLEPASSWORD = process.env.VENDEDORROLEPASSWORD;
export const MASTER = process.env.MASTER;
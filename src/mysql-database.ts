import "dotenv/config"
import { MysqlAdapter } from '@builderbot/database-mysql'
import mysql from 'mysql2/promise'

const MYSQL_DB_HOST = process.env.MYSQL_DB_HOST 
const MYSQL_DB_USER = process.env.MYSQL_DB_USER
const MYSQL_DB_PASSWORD = process.env.MYSQL_DB_PASSWORD
const MYSQL_DB_NAME = process.env.MYSQL_DB_NAME
const MYSQL_DB_PORT = 3306

export type IDatabase = typeof MysqlAdapter

export const adapterDB = new MysqlAdapter({
    host: MYSQL_DB_HOST,
    user: MYSQL_DB_USER,
    database: MYSQL_DB_NAME,
    password: MYSQL_DB_PASSWORD,
    port: MYSQL_DB_PORT,
})

export const connection = mysql.createPool({
    host: MYSQL_DB_HOST,
    user: MYSQL_DB_USER,
    database: MYSQL_DB_NAME,
    password: MYSQL_DB_PASSWORD,
    port: MYSQL_DB_PORT
});

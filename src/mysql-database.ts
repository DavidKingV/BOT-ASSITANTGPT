import { MysqlAdapter } from '@builderbot/database-mysql'
import mysql from 'mysql2/promise'

const MYSQL_DB_HOST = 'localhost'
const MYSQL_DB_USER = 'root'
const MYSQL_DB_PASSWORD = ''
const MYSQL_DB_NAME = 'bot'
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

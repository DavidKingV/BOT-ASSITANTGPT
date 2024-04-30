import { MysqlAdapter } from '@builderbot/database-mysql'
import mysql from 'mysql2/promise'

const MYSQL_DB_HOST = 'db5015748462.hosting-data.io'
const MYSQL_DB_USER = 'dbu3066118'
const MYSQL_DB_PASSWORD = 'Botunif123@'
const MYSQL_DB_NAME = 'dbs12849036'
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

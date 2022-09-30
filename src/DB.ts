import dotenv from "dotenv"
import { Pool } from "pg"

dotenv.config()

const {
DB_host,
DB_name,
DB_user,
DB_ps,
 } = process.env

 const clint = new Pool({
    host:DB_host,
    database:DB_name,
    user:DB_user,
    password:DB_ps
 })

 export default clint;

import con from "../DB"

export type Book={
    title: string;
    author: string;
    total_pages: Number;
    type: string;
    summary:string;
}

export class BooksStore{
    async index(): Promise<Book[]>{
        try{
        const conn= await con.connect()
        const sql= 'SELECT * FROM BOOK'
        const result= await conn.query(sql)
        conn.release()
        return result.rows
        }catch(err){
        throw new Error(`error: ${err}`)
        }
    }
    async show(id: number): Promise<Book> {
        try {
            const conn = await con.connect();
            const sql = `SELECT * FROM book WHERE id=(${id})`;
            const result = await conn.query(sql);
            conn.release();
            return result.rows[0];
        } catch (err) {
            throw new Error(`Could not find book ${id}. Error: ${err}`)
        }
      }
    
    async create(): Promise<Book> {
        try {
            const conn = await con.connect()
            const sql =  `INSERT INTO book (title, author, total_pages, type, summary) VALUES('tes1', 'tes', '3', 'tes', 'tes') RETURNING *`
            const result = await conn.query(sql)
            conn.release()
            return result.rows[0]
          } catch (err) {
                throw new Error(`Failed to add the session with the following error: ${err}`)
          }
      }
    
      async delete(id: string): Promise<Book> {
          try {
        const sql = 'DELETE FROM books WHERE id=($1)'

        const conn = await con.connect()
    
        const result = await conn.query(sql, [id])
    
        const book = result.rows[0]
    
        conn.release()
    
        return book
          } catch (err) {
              throw new Error(`Could not delete book ${id}. Error: ${err}`)
          }
      }
}
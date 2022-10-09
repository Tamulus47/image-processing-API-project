import con from "../DB"

export type Book={
    id?: number;
    title?: string;
    author?: string;
    total_pages?: Number;
    type?: string;
    summary?:string;
}
export class BooksStore{
    async index(): Promise<Book[]>{
        try{
        const conn= await con.connect()
        const sql= 'SELECT * FROM book'
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
          const sql = `SELECT * FROM book WHERE id=($1)`;
          const result = await conn.query(sql, [id]);
          conn.release();
          return result.rows[0];
        } catch (error) {
          throw new Error(
            `Failed to get the session with the following error: ${error}`
          );
        }
      }
    
      async create(b: Book): Promise<Book> {
        try {
          const conn = await con.connect();
          const sql = 'INSERT INTO book (title, author, total_pages, type, summary) VALUES($1, $2, $3, $4, $5) RETURNING *';
          const result = await conn.query(sql, [b.title, b.author, b.total_pages, b.type, b.summary ]);
          conn.release();
          return result.rows[0];
        } catch (error) {
          throw new Error(
            `Failed to add the session with the following error: ${error}`
          );
        }
      }

      async delete(id: number): Promise<Book> {
        try {
          const conn = await con.connect();
          const sql = 'DELETE FROM book WHERE id=($1) RETURNING *';
          const result = await conn.query(sql, [id]);
          conn.release();
          return result.rows[0];
        } catch (error) {
          throw new Error(
            `Failed to delete session with the following error: ${error}`
          );
        }
      }

      async update(b: Book): Promise<Book> {
        try {
          const conn = await con.connect();
          const sql ='UPDATE book SET title=($1), author=($2) WHERE id=($3) RETURNING *';
          const result = await conn.query(sql, [b.title, b.author, b.id]);
          conn.release();
          return result.rows[0];
        } catch (error) {
          throw new Error(
            `Failed to update session with the following error: ${error}`
          );
        }
      }
}
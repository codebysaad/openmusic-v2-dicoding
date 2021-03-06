const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const InvariantError = require('../../exceptions/invariant-error');
const { mapDBToModel } = require('../../helpers/index');
const NotFoundError = require('../../exceptions/not-found-error');
const { statusMessage } = require('../../helpers/constanta');

class SongsService {
    constructor() {
      this._pool = new Pool();
    }
    
    async addSong(payload) {
      const songId = `song-${nanoid(16)}`;
      const insertedAt = new Date().toISOString();
      const query = {
          text: 'INSERT INTO songs VALUES($1, $2, $3, $4, $5, $6, $7, $7) RETURNING id',
          values: [songId, ...Object.values(payload), insertedAt],
        };
    
      const result = await this._pool.query(query);
      if (!result.rows[0].id) {
        throw new InvariantError(statusMessage.saveUnsuccessful);
      }
      
      return result.rows[0].id;
    }
    
    async getAllSongs() {
        const result = await this._pool.query('SELECT id, title, performer FROM songs');
        return result.rows.map(mapDBToModel);
    }

    async getSongById(id) {
        const query = {
          text: 'SELECT * FROM songs WHERE id = $1',
          values: [id],
        };
        const result = await this._pool.query(query);
  
        if (!result.rows.length) {
          throw new NotFoundError(statusMessage.songNotFound);
        }
    
        return result.rows.map(mapDBToModel)[0];
      }

    async updateSongById(id, { title, year, performer, genre, duration }) {
        const updatedAt = new Date().toISOString();
        const query = {
          text: 'UPDATE songs SET title = $1, year = $2, performer = $3, genre = $4, duration = $5 , updated_at = $6 WHERE id = $7 RETURNING id',
          values: [title, year, performer, genre, duration, updatedAt, id],
        };
     
        const result = await this._pool.query(query);
  
        if (!result.rows.length) {
          throw new NotFoundError(statusMessage.updateIdNotFound);
        }
      }

    async deleteSongById(id) {
        const query = {
          text: 'DELETE FROM songs WHERE id = $1 RETURNING id',
          values: [id],
        };
     
        const result = await this._pool.query(query);
     
        if (!result.rowCount) {
          throw new NotFoundError(statusMessage.deleteIdNotFound);
        }
      }
}  

module.exports = SongsService;

import { Connection } from "mysql";
import { Request, Response, NextFunction } from 'express';

const express = require("express");

function createRouter(db:Connection) {
  const router = express.Router();
  const owner = "";

  router.post('/category', (req: Request, res: Response, next: NextFunction) => {
    db.query(
      'INSERT INTO categories (name) VALUES (?)',
      [req.body.name],
      (error) => {
        if (error) {
          console.error(error);
          res.status(500).json({ status: 'error' });
        } else {
          res.status(200).json({ status: 'ok' });
        }
      }
    );
  });

  router.get('/category', function (req:Request, res:Response, next:NextFunction) {
    const page: number = parseInt(req.params.page || '0', 10);
    const result = 10 * page;
    db.query(
      'SELECT id, name FROM categories ORDER BY name LIMIT 10 OFFSET ?',
      [10 * result],
      (error, results) => {
        if (error) {
          console.log(error);
          res.status(500).json({ status: 'error' });
        } else {
          res.status(200).json(results);
        }
      }
    );
  });

  router.put('/category/:id', function (req: Request, res: Response, next: NextFunction) {
    db.query(
      'UPDATE categories SET name=? WHERE id=?',
      [req.body.name, req.params.id],
      (error) => {
        if (error) {
          res.status(500).json({ status: 'error' });
        } else {
          res.status(200).json({ status: 'ok' });
        }
      }
    );
  });

  router.delete('/category/:id', function (req: Request, res: Response, next: NextFunction) {
    db.query(
      'DELETE FROM categories WHERE id=?',
      [req.params.id],
      (error) => {
        if (error) {
          res.status(500).json({ status: 'error' });
        } else {
          res.status(200).json({ status: 'ok' });
        }
      }
    );
  });

  return router;
}
export {createRouter as categories};

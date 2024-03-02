const express = require("express");

function createRouter(db) {
  const router = express.Router();
  const owner = "";

  router.post('/category', (req, res, next) => {
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

  router.get('/category', function (req, res, next) {
    db.query(
      'SELECT id, name FROM categories ORDER BY name LIMIT 10 OFFSET ?',
      [10 * (req.params.page || 0)],
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

  router.put('/category/:id', function (req, res, next) {
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

  router.delete('/category/:id', function (req, res, next) {
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

module.exports = createRouter;

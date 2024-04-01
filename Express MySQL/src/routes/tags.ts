import {Connection} from 'mysql';
import {NextFunction, Request, Response} from 'express';

const express = require('express');

function createRouter(db: Connection) {
    const router = express.Router();
    const owner = '';

    router.post('/tags', (req: Request, res: Response, next: NextFunction) => {
        db.query('INSERT INTO tags (name, color) VALUES (?, ?)', [req.body.name, req.body.color], (error) => {
            if (error) {
                console.error(error);
                res.status(500).json({status: 'error'});
            } else {
                res.status(200).json({status: 'ok'});
            }
        });
    });

    router.get('/tags', function (req: Request, res: Response, next: NextFunction) {
        db.query('SELECT id, name, color FROM tags ORDER BY name', (error, results) => {
            if (error) {
                console.log(error);
                res.status(500).json({status: 'error'});
            } else {
                res.status(200).json(results);
            }
        });
    });

    router.put('/tags/:id', function (req: Request, res: Response, next: NextFunction) {
        db.query('UPDATE tags SET name=? color=? WHERE id=?', [req.body.name, req.body.color, req.params.id], (error) => {
            if (error) {
                res.status(500).json({status: 'error'});
            } else {
                res.status(200).json({status: 'ok'});
            }
        });
    });

    router.delete('/tags/:id', function (req: Request, res: Response, next: NextFunction) {
        db.query('DELETE FROM tags WHERE id=?', [req.params.id], (error) => {
            if (error) {
                res.status(500).json({status: 'error'});
            } else {
                res.status(200).json({status: 'ok'});
            }
        });
    });

    return router;
}

export {createRouter as tags};

import {Connection} from 'mysql';
import {NextFunction, Request, Response} from 'express';

const express = require('express');

function createRouter(db: Connection) {
    const router = express.Router();
    const owner = '';

    /**
     * @openapi
     *
     */
    router.post('/savings', (req: Request, res: Response, next: NextFunction) => {
        db.query(
            'INSERT INTO savings (name, amount, goal, icon, currency, tagId) VALUES (?,?,?,?,?,?)',
            [req.body.name, req.body.amount, req.body.goal, req.body.icon, req.body.currency, req.body.tag],
            (error) => {
                if (error) {
                    console.error(error);
                    res.status(500).json({status: 'error', error});
                } else {
                    res.status(200).json({status: 'ok'});
                }
            }
        );
    });

    router.get('/savings', function (req: Request, res: Response, next: NextFunction) {
        db.query(
            'SELECT id, name, tagId as tag, amount, goal, icon, currency FROM savings ORDER BY name',
            (error, results) => {
                if (error) {
                    console.log(error);
                    res.status(500).json({status: 'error'});
                } else {
                    res.status(200).json(results);
                }
            }
        );
    });

    router.get('/savings/:id', function (req: Request, res: Response, next: NextFunction) {
        db.query('SELECT id, name, categoryId FROM items WHERE id=?', [req.params.id], (error, results) => {
            if (error) {
                console.log(error);
                res.status(500).json({status: 'error'});
            } else if (results.length === 1) {
                res.status(200).json(results[0]);
            } else {
                res.status(404).json({});
            }
        });
    });

    router.put('/savings/:id', function (req: Request, res: Response, next: NextFunction) {
        db.query(
            'UPDATE savings SET name=? WHERE id=?',
            [req.body.name, req.params.id],
            (error) => {
                if (error) {
                    res.status(500).json({status: 'error', error});
                } else {
                    res.status(200).json(req.body);
                }
            }
        );
    });

    router.delete('/savings/:id', function (req: Request, res: Response, next: NextFunction) {
        db.query('DELETE FROM items WHERE id=?', [req.params.id], (error) => {
            if (error) {
                res.status(500).json({status: 'error', error});
            } else {
                res.status(200).json({status: 'ok'});
            }
        });
    });

    return router;
}

export {createRouter as savings};

import {Connection} from "mysql";
import {NextFunction, Request, Response} from 'express';

const express = require("express");

function createRouter(db: Connection) {
    const router = express.Router();
    const owner = "";

    /**
     * @openapi
     * /item/:
     *   post:
     *     summary: Creates item
     *     parameters:
     *       - in: body
     *         name: name
     *         schema:
     *           type: string
     *         required: true
     *         description: Name of the item
     *       - in: body
     *         name: categoryid
     *         schema:
     *           type: string
     *         required: true
     *         description: ID of category
     *     tags:
     *        - items
     *     responses:
     *       200:
     *         description: Returns ok.
     */
    router.post('/item', (req: Request, res: Response, next: NextFunction) => {
        db.query(
            'INSERT INTO items (name, categoryId) VALUES (?, ?)',
            [req.body.name, req.body.categoryId],
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

    router.get('/item', function (req: Request, res: Response, next: NextFunction) {
        const page: number = parseInt(req.params.page || '0', 10);
        const result = 10 * page;
        db.query(
            'SELECT id, name, categoryId FROM items ORDER BY name LIMIT 10 OFFSET ?',
            [10 * result],
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

    router.get('/item/:id', function (req: Request, res: Response, next: NextFunction) {
        db.query(
            'SELECT id, name, categoryId FROM items WHERE id=?',
            [req.params.id],
            (error, results) => {
                if (error) {
                    console.log(error);
                    res.status(500).json({status: 'error'});
                } else if (results.length === 1) {
                    res.status(200).json(results[0]);
                } else {
                    res.status(404).json({});
                }
            }
        );
    });

    router.put('/item/:id', function (req: Request, res: Response, next: NextFunction) {
        db.query(
            'UPDATE items SET name=?, categoryId=? WHERE id=?',
            [req.body.name, req.body.categoryId, req.params.id],
            (error) => {
                if (error) {
                    res.status(500).json({status: 'error', error});
                } else {
                    res.status(200).json({status: 'ok'});
                }
            }
        );
    });

    router.delete('/item/:id', function (req: Request, res: Response, next: NextFunction) {
        db.query(
            'DELETE FROM items WHERE id=?',
            [req.params.id],
            (error) => {
                if (error) {
                    res.status(500).json({status: 'error', error});
                } else {
                    res.status(200).json({status: 'ok'});
                }
            }
        );
    });

    return router;
}

export {createRouter as items};

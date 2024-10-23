import express from 'express';
import jwt, {Jwt} from 'jsonwebtoken';

export function validateToken(req: express.Request, res: express.Response, next: express.NextFunction) {
    if (req.headers['authorization']) {
        try {
            const authorization = req.headers['authorization'].split(' ');
            if (authorization[0] !== 'Bearer') {
                res.status(401).send({ errors: ['Token not found'] });
            } else {
                const decoded = jwt.verify(
                    authorization[1],
                    process.env.TOKEN_SECRET
                ) as Jwt&{id: string};
                res.locals.jwt = decoded;
                req.headers.user = decoded.id;
                next();
            }
        } catch (err) {
            res.status(403).send({ errors: ['Invalid token'] });
        }
    } else {
        res.status(401).send({ errors: ['Token not found'] });
    }
}
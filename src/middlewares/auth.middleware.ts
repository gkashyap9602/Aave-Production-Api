import { Request, Response, NextFunction } from 'express';
import { verifyToken } from '../utils/common.util'
import { responseWithStatus } from '../utils/response.util';

export const authenticateClient = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
        const decoded = verifyToken(authHeader);
        // @ts-ignore
        if (decoded && decoded.access=="client") {
            req.body.user = decoded;
            next();
        } else {
            return responseWithStatus(res, 400, {
                data: null,
                error: 'Unauthorized',
                message: '',
                status: 401
            })
        }
    } else {
        return responseWithStatus(res, 400, {
            data: null,
            error: 'Unauthorized',
            message: '',
            status: 401
        })
    }
}

export const authenticateAdmin = (req: Request, res: Response, next: NextFunction) => {
    let authHeader = req.headers.authorization;
    if (authHeader) {
        if (authHeader.startsWith('Bearer')) {
            [, authHeader] = authHeader.split(' ');
          };

        const decoded = verifyToken(authHeader);
        // console.log(decoded,"decoded-")
        // @ts-ignore
        if (decoded && decoded.access=="admin") {
            req.body.user = decoded;
            next();
        } else {
            return responseWithStatus(res, 400, {
                data: null,
                error: 'Unauthorized',
                message: '',
                status: 401
            })
        }
    } else {
        return responseWithStatus(res, 400, {
            data: null,
            error: 'Unauthorized',
            message: '',
            status: 401
        })
    }
}

export const authenticateBoth = (req: Request, res: Response, next: NextFunction) => {
    let authHeader = req.headers.authorization;
    if (authHeader) {
        if (authHeader.startsWith('Bearer')) {
            [, authHeader] = authHeader.split(' ');
          };
        const decoded = verifyToken(authHeader);
        // @ts-ignore
        if (decoded && (decoded.access=="admin" || decoded.access=="client")) {
            req.body.user = decoded;
            next();
        } else {
            return responseWithStatus(res, 400, {
                data: null,
                error: 'Unauthorized',
                message: '',
                status: 401
            })
        }
    } else {
        return responseWithStatus(res, 400, {
            data: null,
            error: 'Unauthorized',
            message: '',
            status: 401
        })
    }
}
import { Response, Request, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UserInterface } from '../interfaces/userInterface';


function isSuperAdmin(req: Request, res: Response, next: NextFunction) {
    // Ensure the user is authenticated first
    if (!(req as any).user) {
        return res.status(401).json({ message: 'Not authenticated' });
    }

    const user = (req as any).user;

    // Check if the user's role is 'admin'
    if (user.role !== 'Super Admin') {
        return res.status(403).json({ message: 'Access denied: Super Admins only', user: user });
    }

    next();
}


export default isSuperAdmin;
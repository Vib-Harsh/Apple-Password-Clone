import { Request, Response, NextFunction } from 'express';
import { userService } from '../services';
import { STATUS_CODE } from '../constants/status_code';

export const userController = {
  create: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await userService.createUser(req.body);
      res.status(STATUS_CODE.CREATED).json(user);
    } catch (error) {
      next(error);
    }
  },

  get: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await userService.getUser(req.params.id as string);
      if (!user) {
        res.status(STATUS_CODE.NOT_FOUND).json({ message: 'User not found' });
        return;
      }
      res.status(STATUS_CODE.OK).json(user);
    } catch (error) {
      next(error);
    }
  },

  getAll: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await userService.getAllUsers();
      res.status(STATUS_CODE.OK).json(users);
    } catch (error) {
      next(error);
    }
  },

  update: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await userService.updateUser(req.params.id as string, req.body);
      if (!user) {
        res.status(STATUS_CODE.NOT_FOUND).json({ message: 'User not found' });
        return;
      }
      res.status(STATUS_CODE.OK).json(user);
    } catch (error) {
      next(error);
    }
  },

  delete: async (req: Request, res: Response, next: NextFunction) => {
    try {
      const success = await userService.deleteUser(req.params.id as string);
      if (!success) {
        res.status(STATUS_CODE.NOT_FOUND).json({ message: 'User not found' });
        return;
      }
      res.status(STATUS_CODE.OK).json({ message: 'User deleted successfully' });
    } catch (error) {
      next(error);
    }
  },
};

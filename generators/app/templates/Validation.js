import { NextFunction, Request, Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import { ZodError, ZodSchema } from 'zod';

class Validation {
  static validate(schema: ZodSchema) {
    return (req: Request, res: Response, next: NextFunction) => {
      try {
        req.body = schema.parse(req.body);
        next();
      } catch (error) {
        console.log('error', error);

        if (error instanceof ZodError) {
          res.status(400).json({ success: false, error: error.issues });
        } else {
          res
            .status(500)
            .json({ success: false, error: 'Internal server error' });
        }
      }
    };
  }

  static validateParams(schema: ZodSchema) {
    return (req: Request, res: Response, next: NextFunction) => {
      try {
        req.params = schema.parse(req.params) as ParamsDictionary;
        next();
      } catch (error) {
        console.log('params validation error', error);

        if (error instanceof ZodError) {
          res.status(400).json({ success: false, error: error.issues });
        } else {
          res
            .status(500)
            .json({ success: false, error: 'Internal server error' });
        }
      }
    };
  }
}

export default Validation;

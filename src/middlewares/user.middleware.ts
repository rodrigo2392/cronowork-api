import express from "express";
import { CreateUserValidation, LoginUserValidation, UpdateUserValidation } from "../models/user.model";
import { validate } from "class-validator";

export async function createUserValidation(req: express.Request, res: express.Response, next: express.NextFunction) {
    const {email, password, name} = req.body;
    const userValidation = new CreateUserValidation()
    userValidation.email = email;
    userValidation.password = password;
    userValidation.name = name;

    const errors = await validate(userValidation);
    if (errors.length) {
        res.status(400).json({errors: Object.values(errors[0].constraints || [])})
      }
      else{
        next();
    }
}

export async function updateValidation(req: express.Request, res: express.Response, next: express.NextFunction) {
  const {name} = req.body;
  const userValidation = new UpdateUserValidation()
  userValidation.name = name;

  const errors = await validate(userValidation);
  if (errors.length) {
      res.status(400).json({errors: Object.values(errors[0].constraints || [])})
    }
    else{
      next();
  }
}

export async function loginValidation(req: express.Request, res: express.Response, next: express.NextFunction) {
  const {email, password} = req.body;
  const userValidation = new LoginUserValidation()
  userValidation.email = email;
  userValidation.password = password;

  const errors = await validate(userValidation);
  if (errors.length) {
      res.status(400).json({errors: Object.values(errors[0].constraints || [])})
    }
    else{
      next();
  }
}
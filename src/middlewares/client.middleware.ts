import express from "express";
import { CreateClientValidation, UpdateClientValidation } from "../models/client.model";
import { validate } from "class-validator";

export async function createClientValidation(req: express.Request, res: express.Response, next: express.NextFunction) {
    const {email, name} = req.body;
    const clientValidation = new CreateClientValidation()
    clientValidation.email = email;
    clientValidation.name = name;

    const errors = await validate(clientValidation);
    if (errors.length) {
        res.status(400).json({errors: Object.values(errors[0].constraints || [])})
      }
      else{
        next();
    }
}

export async function updateValidation(req: express.Request, res: express.Response, next: express.NextFunction) {
  const {name, email} = req.body;
  const clientValidation = new UpdateClientValidation()
  clientValidation.name = name;
  clientValidation.email = email;

  const errors = await validate(clientValidation);
  if (errors.length) {
      res.status(400).json({errors: Object.values(errors[0].constraints || [])})
    }
    else{
      next();
  }
}
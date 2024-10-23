import express from "express";
import { CreateProjectValidation, UpdateProjectValidation } from "../models/project.model";
import { validate } from "class-validator";

export async function createProjectValidation(req: express.Request, res: express.Response, next: express.NextFunction) {
    const {client, name} = req.body;
    const projectValidation = new CreateProjectValidation()
    projectValidation.name = name;
    projectValidation.client = client;

    const errors = await validate(projectValidation);
    if (errors.length) {
        res.status(400).json({errors: Object.values(errors[0].constraints || [])})
      }
      else{
        next();
    }
}

export async function updateValidation(req: express.Request, res: express.Response, next: express.NextFunction) {
  const {name} = req.body;
  const projectValidation = new UpdateProjectValidation()
  projectValidation.name = name;

  const errors = await validate(projectValidation);
  if (errors.length) {
      res.status(400).json({errors: Object.values(errors[0].constraints || [])})
    }
    else{
      next();
  }
}
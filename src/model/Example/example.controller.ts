import { Request, Response } from "express";
import { getRepository } from "typeorm";
import Example from "./example.entity";

// Get all examples
export const GetAll = async (req: Request, res: Response) => {
  const exampleRepo = getRepository(Example);
    try {
      const example = await exampleRepo.find({});
      res.status(200).json(example);
    } catch (error) {
      console.log(error);
      res.status(500).send(error);
    }
};

// Add example
export const addExample = async (req: Request, res: Response) => {
  const data = req.body;
  const exampleRepo = getRepository(Example);
  try {
      const example = await exampleRepo.save({
          id: data.id,
          value: data.value
      });
      res.status(200).send(example);
  } catch (error) {
      console.log(error);
      res.status(400).send(error);
  }
};

// Remove example
export const removeExample = async (req: Request, res: Response) => {
  const exampleRepo = getRepository(Example);
  try {
      await exampleRepo.delete({id: req.params.exId});
      res.status(200).send("Success");
  } catch (error) {
      res.status(400).send(error);
  }
};
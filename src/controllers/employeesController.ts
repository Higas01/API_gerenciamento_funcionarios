import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { json } from "stream/consumers";
const prisma = new PrismaClient();

interface IEmployees {
  first_name: string;
  last_name: string;
  age: number;
  salarie: number;
  job: string;
}

interface IUpdateEmployee {
  id: number;
  first_name?: string;
  last_name?: string;
  age?: number;
}

const registerEmployees = async (req: Request, res: Response) => {
  try {
    const { first_name, last_name, age }: IEmployees = req.body;

    if (!first_name || !last_name || !age) {
      res
        .status(411)
        .json({ message: "Todos os campos precisam ser preenchidos" });
      return;
    }

    if (typeof first_name !== "string" || typeof last_name !== "string") {
      res.status(400).json({
        message: "Campo nome e sobrenome precisa ser compostos por caracteres",
      });
      return;
    }

    if (typeof age !== "number") {
      res.status(400).json({
        message: "Campo idade precisa ser um número",
      });
      return;
    }

    const newEmployee = await prisma.employees.create({
      data: {
        first_name,
        last_name,
        age,
      },
    });

    res
      .status(201)
      .json([{ message: "Usuário cadastrado com sucesso" }, newEmployee]);
  } catch (error) {
    res
      .status(500)
      .json({ messsage: "Ocorreu algum erro, tente novamente mais tarde" });
  }
};

const getAllEmployees = async (req: Request, res: Response) => {
  const data = await prisma.employees.findMany({
    select: {
      first_name: true,
      last_name: true,
      age: true,
      Salaries: {
        select: {
          salary: true,
        },
      },
      Job: {
        select: {
          job: true,
        },
      },
    },
  });

  res.status(200).json(data);
};

const getEmployeeID = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const data = await prisma.employees.findUnique({
      where: {
        id: Number(id),
      },
      select: {
        first_name: true,
        last_name: true,
        age: true,
        Salaries: {
          select: {
            salary: true,
          },
        },
        Job: {
          select: {
            job: true,
          },
        },
      },
    });

    if (!data) {
      res.status(404).json({ messsage: "ID não existente" });
      return;
    }

    res.status(200).json(data);
  } catch (error) {
    res
      .status(500)
      .json({ messsage: "Ocorreu algum erro, tente novamente mais tarde" });
  }
};

const UpdateEmployees = async (req: Request, res: Response) => {
  try {
    const { id, first_name, last_name, age }: IUpdateEmployee = req.body;

    if (!id) {
      res.status(411).json({ message: "Campo ID precisa ser preenchido" });
    }

    const UpdateEmployee = await prisma.employees.update({
      where: {
        id: id,
      },
      data: {
        first_name,
        last_name,
        age,
      },
      select: {
        first_name: true,
        last_name: true,
        age: true,
        Salaries: {
          select: {
            salary: true,
          },
        },
        Job: {
          select: {
            job: true,
          },
        },
      },
    });

    res.status(200).json(UpdateEmployee);
  } catch (error) {
    res.status(500).json({
      message: "Ocorreu algum erro, por favor, tente novamente mais tarde",
    });
  }
};

const deleteEmployees = async (req: Request, res: Response) => {
  try {
    const { id }: { id: number } = req.body;
    if (!id) {
      res
        .status(411)
        .json({ message: "ID precisa ser obrigatoriamente preenchido" });
      return;
    }

    if (typeof id !== "number") {
      res
        .status(400)
        .json({ messsage: "ID precisa obrigatoriamente ser um número" });
      return;
    }

    const deleteEmployee = await prisma.employees.delete({
      where: {
        id: id,
      },
    });

    if (!deleteEmployee) {
      res.status(404).json({ message: "ID não existente" });
      return;
    }

    res.status(200).json({ message: "Usuário excluido com sucesso" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Ocorreu algum erro tente novamente mais tarde" });
  }
};

module.exports = {
  registerEmployees,
  deleteEmployees,
  getAllEmployees,
  getEmployeeID,
  UpdateEmployees,
};

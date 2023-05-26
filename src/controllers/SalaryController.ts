import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
const prisma = new PrismaClient();

const registerSalary = async (req: Request, res: Response) => {
  try {
    const { salary, employees_id }: Number | any = req.body;

    if (!salary || !employees_id) {
      res.status(411).json({
        message:
          "O campo salário e employees_id precisam ser obrigatoriamente preenchidos",
      });
      return;
    }

    if (typeof salary !== "number") {
      res
        .status(400)
        .json({ message: "O campo salário precisa ser um número" });
      return;
    }

    if (typeof employees_id !== "number") {
      res
        .status(400)
        .json({ message: "O campo employes_id precisa ser um número" });
      return;
    }

    const searchID = prisma.employees.findUnique({
      where: {
        id: employees_id,
      },
    });

    if (!searchID) {
      res.status(404).json({ message: "O usuário do funcionário não existe" });
      return;
    }

    await prisma.salaries.create({
      data: {
        employees_id,
        salary,
      },
    });

    const employeeWithSalary = await prisma.employees.findUnique({
      where: {
        id: employees_id,
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

    res
      .status(201)
      .json([
        { message: "Salário cadastrado com sucesso" },
        employeeWithSalary,
      ]);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Ocorreu um erro, tente novamente mais tarde" });
  }
};

const updateSalary = async (req: Request, res: Response) => {
  try {
    const { employees_id, salary }: { employees_id: number; salary: number } =
      req.body;

    if (!employees_id || !salary) {
      res.status(400).json({
        message: "Campos salary e Employees_id precisam ser preenchidos",
      });
      return;
    }

    if (typeof salary !== "number") {
      res
        .status(400)
        .json({ message: "Campo Job precisa ser composto por caracteres" });
      return;
    }

    if (typeof employees_id !== "number") {
      res.status(400).json({
        message: "Campo emloyees_id precisa ser composto por números",
      });
      return;
    }

    await prisma.salaries.update({
      where: {
        employees_id,
      },
      data: {
        salary,
      },
    });

    const EmployeeWithSalary = await prisma.employees.findUnique({
      where: {
        id: employees_id,
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

    res
      .status(200)
      .json([{ message: "Salário alterado com sucesso" }, EmployeeWithSalary]);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Ocorreu algum erro, tente novamente mais tarde" });
  }
};

module.exports = { registerSalary, updateSalary };

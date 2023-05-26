import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { json } from "stream/consumers";

const prisma = new PrismaClient();

interface IJob {
  employees_id: Number;
  job: String;
}

const registerJob = async (req: Request, res: Response) => {
  try {
    const { employees_id, job }: IJob = req.body;

    if (!employees_id || !job) {
      res.status(400).json({
        message: "Campos Job e Employees_id precisam ser preenchidos",
      });
      return;
    }

    if (typeof job !== "string") {
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

    const searchID = prisma.job.findUnique({
      where: {
        id: employees_id,
      },
    });

    if (!searchID) {
      res.status(404).json({ message: "O ID do usuário não existe" });
      return;
    }

    await prisma.job.create({
      data: {
        employees_id,
        job,
      },
    });

    const employeeWithJob = await prisma.employees.findUnique({
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
      .json([{ message: "Profissão registrada com sucesso" }, employeeWithJob]);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Ocorreu algum erro, tente novamente mais tarde" });
  }
};

const updateJob = async (req: Request, res: Response) => {
  try {
    const { employees_id, job }: { employees_id: number; job: string } =
      req.body;

    if (!employees_id || !job) {
      res.status(400).json({
        message: "Campos Job e Employees_id precisam ser preenchidos",
      });
      return;
    }

    if (typeof job !== "string") {
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

    await prisma.job.update({
      where: {
        employees_id,
      },
      data: {
        job,
      },
    });

    const EmployeeWithJob = await prisma.employees.findUnique({
      where: {
        id: employees_id,
      },
      include: {
        Job: true,
        Salaries: true,
      },
    });

    res
      .status(200)
      .json([{ message: "Cargo alterado com sucesso" }, EmployeeWithJob]);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Ocorreu algum erro, tente novamente mais tarde" });
  }
};

module.exports = { registerJob, updateJob };

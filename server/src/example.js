import { PrismaClient } from "@prisma/client";
import express from "express"
const router = express()
const prisma = new PrismaClient()

router.get("/", async (req, res) => {
    const allUsers = await prisma.user.findMany();
    res.json(allUsers)
})

router.post("/", async (req, res) => {
    const newUser = await prisma.user.create({ data: req.body })
    res.json(newUser)
})



router.put("/:id", async (req, res) => {
    const id = req.params.id
    const newAge = req.body.age
    const updateUser = await prisma.user.update({
        where: { id: parseInt(id) },
        data: { age: newAge }
    })
    res.json(updateUser)
})

router.delete("/:id", async (req, res) => {
    const id = req.params.id
    const deleteUser = await prisma.user.delete({
        where: { id: parseInt(id) }
    })
    res.json(deleteUser)
})

router.post("/house", async (req, res) => {
    const newHouse = await prisma.house.create({ data: req.body })
    res.json(newHouse)
})

router.get("/house", async (req, res) => {
    const allHouse = await prisma.house.findMany({
        include: {
            owner: true,
            buildBy: true
        }
    })
    res.json(allHouse)
})

router.get("/house/filter", async (req, res) => {
    const allHouse = await prisma.house.findMany({
        where: {
            wifePassword: {
                not: null,
            },
            owner: {
                age: {
                    gte: 50
                },
            },
        },
        orderBy: [
            {
                owner: {
                    firstName: "desc",
                },
            },
        ],
        include: {
            owner: true,
            buildBy: true
        }
    })
    res.json(allHouse)
})

export { router }
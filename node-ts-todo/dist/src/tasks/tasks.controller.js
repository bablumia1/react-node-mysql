"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskController = void 0;
const class_transformer_1 = require("class-transformer");
const tasks_entity_1 = require("./tasks.entity");
const index_1 = require("../../index");
const express_validator_1 = require("express-validator");
class TasksController {
    getAll(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let allTasks;
            try {
                allTasks = yield index_1.AppDataSource.getRepository(tasks_entity_1.Task).find({
                    where: { user: req.user },
                    order: {
                        date: 'ASC',
                    },
                });
                allTasks = (0, class_transformer_1.instanceToPlain)(allTasks);
                return res.json(allTasks).status(200);
            }
            catch (_error) {
                return res.status(500).json({ error: 'Internal Server Error' });
            }
        });
    }
    create(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const error = (0, express_validator_1.validationResult)(req);
            if (!error.isEmpty()) {
                return res.status(400).json({ error: error.array() });
            }
            const { title, description, date, priority, status } = req.body;
            const newTask = new tasks_entity_1.Task();
            newTask.title = title;
            newTask.description = description;
            newTask.date = date;
            newTask.priority = priority;
            newTask.status = status;
            newTask.user = req.user;
            let createdTask;
            try {
                createdTask = yield index_1.AppDataSource.getRepository(tasks_entity_1.Task).save(newTask);
                createdTask = (0, class_transformer_1.instanceToPlain)(createdTask);
                return res.json(createdTask).status(201);
            }
            catch (_error) {
                return res.status(500).json({ error: 'Internal Server Error' });
            }
        });
    }
    update(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const error = (0, express_validator_1.validationResult)(req);
            if (!error.isEmpty()) {
                return res.status(400).json({ error: error.array() });
            }
            let task;
            try {
                task = yield index_1.AppDataSource.getRepository(tasks_entity_1.Task).findOne({
                    where: { id: req.body.id },
                });
            }
            catch (_error) {
                return res.status(500).json({ error: 'Internal Server Error' });
            }
            // If task is not found
            if (!task) {
                return res.status(404).json({ error: 'Task not found' });
            }
            // Update task
            let updateTask;
            try {
                updateTask = yield index_1.AppDataSource.getRepository(tasks_entity_1.Task).update(req.body.id, (0, class_transformer_1.plainToInstance)(tasks_entity_1.Task, { status: req.body.status }));
                updateTask = (0, class_transformer_1.instanceToPlain)(updateTask);
                return res.json(updateTask).status(200);
            }
            catch (_error) {
                return res.status(500).json({ error: 'Internal Server Error' });
            }
        });
    }
}
exports.taskController = new TasksController();

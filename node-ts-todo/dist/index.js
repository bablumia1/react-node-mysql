"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const typeorm_1 = require("typeorm");
const cors_1 = __importDefault(require("cors"));
const tasks_entity_1 = require("./src/tasks/tasks.entity");
const tasks_router_1 = require("./src/tasks/tasks.router");
const auth_entity_1 = require("./src/auth/auth.entity");
const auth_router_1 = require("./src/auth/auth.router");
const cookieParser = require("cookie-parser");
dotenv_1.default.config();
const PORT = process.env.PORT || 4000;
const app = (0, express_1.default)();
// Body parser middleware
app.use(express_1.default.json());
app.use(cookieParser());
app.use((0, cors_1.default)({
    origin: process.env.CLIENT_URL,
    credentials: true,
}));
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'bablumia_course_app',
    password: 'O&OG1HCoiuf9',
    database: 'bablumia_course_app',
    synchronize: true,
    entities: [tasks_entity_1.Task, auth_entity_1.User],
});
exports.AppDataSource.initialize()
    .then(() => {
    app.listen(PORT, () => console.log('Server Running on Port ' + PORT));
})
    .catch((err) => {
    console.error('Error during data source initialization', err);
});
app.get('/', (req, res) => {
    res.send(`<h1>Server is running...</h1>`);
});
// Tasks routes
app.use('/', tasks_router_1.taskRouter);
app.use('/auth', auth_router_1.authRouter);

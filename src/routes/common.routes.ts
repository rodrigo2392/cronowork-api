import express from 'express'


export abstract class CommonRoutes {
    app: express.Application;
    name: string;

    constructor(app: express.Application, name: string) {
        this.app = app;
        this.name = name;
        this.generateRoutes();
    }

    getName() {
        return this.name;
    }

    abstract generateRoutes(): express.Application

}
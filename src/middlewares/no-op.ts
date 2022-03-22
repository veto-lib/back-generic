import { NextFunction } from 'express';

export const noOp = ({}, {}, next: NextFunction) => next();

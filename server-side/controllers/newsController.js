
import mongoose  from 'mongoose';

import News from '../models/news.js'
import Factory from './factory.js'

export const createNews = Factory.createOne(News);
export const getAllNews = Factory.getAll(News);

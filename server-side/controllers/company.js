import { truncateSync } from 'fs';
import mongoose  from 'mongoose';

import Company from '../models/company.js'
import Factory from './factory.js'

// THIS IS JUS AN EXAMPLE HOW WOUD EACH FUNCTION WORK 

export const likeCompany = async (req, res) => {
    const { id } = req.params;

    if(!req.userId) return res.json({message: 'Unauthenticated '})

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send('No post wtih that ID');

    const company = await Company.findById(id);

    const index = company.likes.findIndex((id) => id === String(req.userId));

    if (index === -1) {
        company.likes.push(req.userId);
    } else {
        company.likes = company.likes.filter((id) => id !== String(req.userId))
    }

    const updateCompany = await Company.findByIdAndUpdate(id, company, { new: true });
    console.log(updateCompany)
    res.json(updateCompany);


}


export const getAllCompanies = Factory.getAll(Company);
export const getOneCompany = Factory.getOne(Company);
export const createCompany = Factory.createOne(Company);
export const updateCompany = Factory.updateOne(Company);
export const deleteCompany = Factory.deleteOne(Company);
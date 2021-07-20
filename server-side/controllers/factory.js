import mongoose  from 'mongoose';

import  AppError from './../utils/appError.js';
// const APIFeatures = require('./../utils/apiFeatures');
//deleteOne test 

const deleteOne = Model =>
  async (req, res, next) => {
    const doc = await Model.findByIdAndRemove(req.params.id);
    console.log('doc')
    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }

    res.status(204).json({
      status: 'success',
      data: null
    });
  };

const updateOne = Model =>
  async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    console.log('doc.address')
    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        data: doc
      }
    });
  };

const createOne = Model =>
  async (req, res, next) => {
    const doc = await Model.create(req.body);

    res.status(201).json(doc);
  };

  //               (Model, popOptions )
const getOne = Model =>
  async (req, res, next) => {
    const query = Model.findById(req.params.id);
    // if (popOptions) query = query.populate(popOptions);
    console.log(req.params.id)
    const doc = await query;
    console.log(doc)

    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        data: doc
      }
    });
  };

const getAll = Model =>
  async (req, res, next) => {
    // To allow for nested GET reviews on tour (hack)
    const query = await Model.find();
    // SEND RESPONSE
    res.status(200).json(query);
  };


  export default {getAll, getOne, createOne, updateOne, deleteOne}
import { truncateSync } from 'fs';
import mongoose  from 'mongoose';
import AppError from '../utils/appError.js'
import User from '../models/user.js'
import Factory from './factory.js'



const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach(el => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

export const getMe = (req, res, next) => {
    console.log(req.user._id)
    req.params.id = req.user._id;
  next();
};

export const updateMe = async (req, res, next) => {
  // 1) Create error if user POSTs password data
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        'This route is not for password updates. Please use /updateMyPassword.',
        400
      )
    );
  }
  console.log(req.user)
  // 2) Filtered out unwanted fields names that are not allowed to be updated
  const filteredBody = filterObj(req.body, 'name', 'email');

  // 3) Update user document
  const updatedUser = await User.findByIdAndUpdate(req.user._id, filteredBody, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser
    }
  });
};

export const deleteMe = async (req, res, next) => {
  await User.findByIdAndRemove(req.user._id, { active: false });

  res.status(204).json({
    status: 'success',
    data: null
  });
};

export const getAllUsers = Factory.getAll(User);
// export const createUser = Factory.createOne(User);
export const getUser = Factory.getOne(User)
export const updateUser = Factory.updateOne(User);
export const deleteUser = Factory.deleteOne(User);
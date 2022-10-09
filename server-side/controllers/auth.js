import crypto  from 'crypto';
import { promisify } from 'util';
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken';
import User from '../models/user.js'
import AppError  from './../utils/appError.js';
import sendEmail  from '../utils/emails.js';
import sgMail from '@sendgrid/mail';




const signToken = id => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN
  });
};


const createSendToken = (result, statusCode, res) => {
  const token = signToken(result._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true
  };
  if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;

  res.cookie('jwt', token, cookieOptions);

  // Remove password from output
  result.password = undefined;

  res.status(statusCode).json({
    status: 'success',
    token,
    result
  }); 
};

export const signup = async (req, res, next) => {
  const { email, password, passwordConfirm, firstname, lastname } = req.body;
  const user = await User.findOne({ email: req.body.email });

  sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  try {
     
    const existingUser = await User.findOne({ email })
    if (existingUser) return res.status(400).json({ message: "User already exist " });
    
    if (password !== passwordConfirm) return res.status(400).json({ message: "Passwords doesn't match" }); 

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await User.create({ email, password: hashedPassword, name: `${firstname} ${lastname}` })
    const token = jwt.sign({ email: result.email, id: result._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    
    // await sendEmail({
    //   email: email,
    //   subject: 'invest4you',
    //   message: 'Pozdrav \n Hvala sto si nam se pridruzio \n Marko Turic'
    // });
 
     const msg = {
      to: email, // Change to your recipient
       from:{
                email: "tcig.invest4you@hotmail.com"
            },  // Change to your verified sender
      subject: 'Sending with SendGrid is Fun',
       text: 'Hvala sto si se pridruzio InvestsForYou platformi Marko Turic ',
      html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    }
    await sgMail
      .send(msg)
      .then(() => {
        console.log('Email sent')
      })
      .catch((error) => {
        console.error(error)
      })

    res.status(200).json({
      result,
      token,
      status: 'success',
      message: 'Token sent to email!'
      
    });

  } catch (error) {
    res.status(500).json(error.message);
    
     return next(
      new AppError(error),
      500
    );
    }
};



export const login = async (req, res, next) => {
   const { email, password } = req.body;
 
  try {
    const existingUser = await User.findOne({ email }).select('password');
    if (!existingUser) return res.status(404).json({ message: "User doesn't exist" });

    console.log(password, existingUser.password)
    const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
    console.log(isPasswordCorrect, 'jel pass dobar ');

    if (!isPasswordCorrect) return    next(new AppError('incorect credelcials', 400))
    const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.status(200).json({ result: existingUser, token });
  } catch (err) {
    res.status(500).json('Something went wrong')
  }
};



export const protect = async (req, res, next) => {
    try {
      // console.log(req.headers.authorization)
      const token = req.headers.authorization.split(" ")[1];
      const isCustomAuth = token.length < 500; 

        let decodedData;

        if (token && isCustomAuth) {
          decodedData = jwt.verify(token, process.env.JWT_SECRET);
          console.log(decodedData)

            req.userId = decodedData?.id
        } else {
            decodedData = jwt.decode(token);
            req.userId = decodedData?.sub;
      }
      
        next();
    } catch (error) {
        return next(new AppError('Please login do this action', 403));
        // console.log(error.message, 'dovde' )
    }
}

export const restrictTo = (...roles) => {
  return (req, res, next) => {
    // roles ['admin', 'lead-guide']. role='user' 
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError('You do not have permission to perform this action', 403)
      );
    }

    next();
  };
};

export const forgotPassword = async (req, res, next) => {
  // 1) Get user based on POSTed email
    const user = await User.findOne({ email: req.body.email });
    console.log(user.email)
  if (!user) {
    return next(new AppError('There is no user with email address.', 404));
  }

  // 2) Generate the random reset token
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  // 3) Send it to user's email
  const resetURL = `${req.protocol}://${req.get(
    'host'
  )}/api/v1/users/resetPassword/${resetToken}`;

  const message = `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to: ${resetURL}.\nIf you didn't forget your password, please ignore this email!`;

  try {
    await sendEmail({
      email: user.email,
      subject: 'Your password reset token (valid for 10 min)',
      message
    });

    res.status(200).json({
      status: 'success',
      message: 'Token sent to email!'
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });

    return next(
      new AppError('There was an error sending the email. Try again later!'),
      500
    );
  }
};

export const resetPassword = async (req, res, next) => {
  // 1) Get user based on the token
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() }
  });

  // 2) If token has not expired, and there is user, set the new password
  if (!user) {
    return next(new AppError('Token is invalid or has expired', 400));
  }
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  // 3) Update changedPasswordAt property for the user
  // 4) Log the user in, send JWT
  createSendToken(user, 200, res);
};

export const updatePassword = async (req, res, next) => {
  // 1) Get user from collection
  const user = await User.findById(req.user.id).select('+password');

  // 2) Check if POSTed current password is correct
  if (!(await user.correctPassword(req.body.passwordCurrent, user.password))) {
    return next(new AppError('Your current password is wrong.', 401));
  }

  // 3) If so, update password
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  await user.save();
  // User.findByIdAndUpdate will NOT work as intended!

  // 4) Log user in, send JWT
  createSendToken(user, 200, res);
};

export default {
    updatePassword,
    resetPassword,
    forgotPassword,
    restrictTo,
    protect,
    login,
    signup,
    
}

// export const signup = async (req, res, next) => {
//   const { email, password, passwordConfirm, firstname, lastname } = req.body;

//   // const newUser = await User.create({
//   //   name: req.body.name,
//   //   email: req.body.email,
//   //   password: req.body.password,
//   //   passwordConfirm: req.body.passwordConfirm
//   // });
//     const result = await User.create({email, password: passwordConfirm, name: `${firstname} ${lastname}`})

//   const url = `${req.protocol}://${req.get('host')}/me`;
//   // console.log(url);
//   await new Email(newUser, url).sendWelcome();

//   createSendToken(newUser, 201, req, res);
// };

// export const login = async (req, res) => {
//   const { error } = validate(req.body);
//   const { email, password } = req.body;
//  if (error) return res.status(400).send(error.details[0].message);

//  let user = await User.findOne({ email });
//  if (!user) return res.status(400).send({status:400, message: "Invalid Email or Password"});

//  const validPassword = await bcrypt.compare(password, user.password);
//  if (!validPassword) return res.status(400).send({status:400, message: "Invalid Email or Password"});
//  const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, 'test', { expiresIn: "1h" });
// //  const token = user.generateAuthToken();
//  res.status(200).send({status:200, data: token, message: "User Loggedin Succesfully"});
// };



// export const login = async (req, res, next) => {
//   const { email, password } = req.body;
//   // console.log(result)

//   // 1) Check if email and password exist
//    const existingUser = await User.findOne({ email });
//     console.log('ovde')
//      if (!existingUser) return res.status(404).json({ message: "User doesn't exist" });
//   if (!email || !password) {
//     return next(new AppError('Please provide email and password!', 400));
//   }
//   // console.log('doslo do servera')

//   // 2) Check if user exists && password is correct
//   // const user =  await User.findOne({ email }).select('+password');
//   // console.log(req.body)
//   const correctPassword = await bcrypt.compare(password, existingUser.password)
//   consol.log(correctPassword)
//   if ( !correctPassword ){
//     return next(new AppError('Incorrect email or password', 401))
//   }
//   console.log(password, existingUser.password)
//   // 3) If everything ok, send token to client new AppError('Incorrect email or password', 401)
//   createSendToken(existingUser, 200, res);
// };

// export const protect = async (req, res, next) => {
//   // 1) Getting token and check of it's there
//   let token;
//   if (
//     req.headers.authorization &&
//     req.headers.authorization.startsWith('Bearer')
//   ) {
//     token = req.headers.authorization.split(' ')[1];
//   }

//   if (!token) {
//     return next(
//       new AppError('You are not logged in! Please log in to get access.', 401)
//     );
//   }



//   // 2) Verification token
//     const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
//     console.log(decoded)
//   // 3) Check if user still exists
//   const currentUser = await User.findById(decoded.id);
//   if (!currentUser) {
//     return next(
//       new AppError(
//         'The user belonging to this token does no longer exist.',
//         401
//       )
//     );
//   }

//  //   4) Check if user changed password after the token was issued
//   if (currentUser.changedPasswordAfter(decoded.iat)) {
//     return next(
//       new AppError('User recently changed password! Please log in again.', 401)
//     );
//   }

//   // GRANT ACCESS TO PROTECTED ROUTE
//   req.user = currentUser;
//   next();
// };
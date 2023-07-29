import User from "../models/User.js";
import { StatusCodes } from "http-status-codes";
import { UnAuthenticatedError } from "../errors/index.js";
import attachCookies from "../utils/attachCookies.js";
import axios from "axios";

class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}

const register = async (req, res) => {
  if (req.body.googleAccessToken) {
    const { googleAccessToken } = req.body;
    // google auth
    axios
      .get("https://www.googleapis.com/oauth2/v3/userinfo", {
        headers: {
          Authorization: `Bearer ${googleAccessToken}`,
        },
      })
      .then(async (response) => {
        const name = response.data.given_name
        const email = response.data.email;

        const userAlreadyExists = await User.findOne({ email });
        if (userAlreadyExists) {
          throw new BadRequestError("Email is already in use");
        }
        const user = await User.create({ name, email });
        const token = user.createJWT();
        attachCookies({ res, token });

        res.status(StatusCodes.CREATED).json({
          user: {
            email: user.email,
            id: user._id,
          },
          token,
        });
      })
      .catch((err) => {
        // res.status(400).json({message: "Invalid info"})
        throw new UnAuthenticatedError("Invalid credentials");
      });
  } else {
    const { name, email, password } = req.body;

    if (!name || !password || !email) {
      throw new BadRequestError("Please provide all values");
    }

    const userAlreadyExists = await User.findOne({ email });
    if (userAlreadyExists) {
      throw new BadRequestError("Email is already in use");
    }
    const user = await User.create({ name, email, password });
    const token = user.createJWT();
    attachCookies({ res, token });

    res.status(StatusCodes.CREATED).json({
      user: {
        email: user.email,
        name: user.name,
      },
      token,
    });
  }
};

const login = async (req, res) => {
  if (req.body.googleAccessToken) {
    const { googleAccessToken } = req.body;
    // google auth
    axios
      .get("https://www.googleapis.com/oauth2/v3/userinfo", {
        headers: {
          Authorization: `Bearer ${googleAccessToken}`,
        },
      })
      .then(async (response) => {
        const email = response.data.email;

        const user = await User.findOne({ email });
        if (!user) {
          throw new UnAuthenticatedError("Invalid credentials");
        }
        const token = user.createJWT();

        user.password = undefined;
        attachCookies({ res, token });

        const oneDay = 1000 * 60 * 60 * 24;
        res.cookie("token", token, {
          httpOnly: true,
          expires: new Date(Date.now() + oneDay),
          secure: process.env.NODE_ENV === "production",
        });
        res.status(StatusCodes.OK).json({ user, token });
      })
      .catch((err) => {
        throw new UnAuthenticatedError("Invalid credentials");
      });
  } else {
    const { email, password } = req.body;
    if (!email || !password) {
      throw new BadRequestError("Please provide all values");
    }
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      throw new UnAuthenticatedError("Invalid credentials");
    }

    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
      throw new UnAuthenticatedError("Invalid credentials");
    }
    const token = user.createJWT();

    user.password = undefined;
    attachCookies({ res, token });

    const oneDay = 1000 * 60 * 60 * 24;
    res.cookie("token", token, {
      httpOnly: true,
      expires: new Date(Date.now() + oneDay),
      secure: process.env.NODE_ENV === "production",
    });
    res.status(StatusCodes.OK).json({ user, token });
  }
};

const logout = async (req, res) => {
  res.cookie("token", "logout", {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.status(StatusCodes.OK).json({ msg: "user logged out!" });
};


export { register, login, logout };

import jwt from "jsonwebtoken";
import { User } from "../Models/user.Model.js";

export const protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (!decoded) return res.status(401).send({ message: "Not authorized!" });
      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      console.log(error);
      return res.status(401).send({ message: "Not authorized!" });
    }
  } else {
    return res.status(401).send({ message: "Not authorized!" });
  }

  if (!token) {
    res.status(401).send({ message: "Not authorized!" });
  }
};

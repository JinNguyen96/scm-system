import jwt from "jsonwebtoken";
import configToken from "../config/index";

export const encodeToken = (data: string | object) => {
  const token = jwt.sign({ data }, "SCMSystem", { expiresIn: "2h" });
  // 
  return token;
};
export const refreshToken = (data: string | object) => {
  const refreshTokenUser = jwt.sign(data, configToken.SECRET_REFRESH, {
    expiresIn: configToken.refreshTokenLife,
  });

  return refreshTokenUser;
};
export const checkToken = (token: string) => {
  const verifyToken = jwt.verify(token, "SCMSystem");

  if (verifyToken) {
    return true;
  } else {
    return false;
  }
};

export const decode = (token: string) => {
  return jwt.decode(token);
};

export const kiemTraToken = (
  req: { headers: { accessToken: string } },
  res: {
    status: (arg0: number) => {
      (): any;
      new(): any;
      send: { (arg0: string): void; new(): any };
    };
  },
  next: () => void
) => {
  let { accessToken } = req.headers;
  // 
  try {
    if (checkToken(accessToken)) {
      next();
    }
  } catch (error) {
    res.status(401).send("token khong hop le");
  }
};
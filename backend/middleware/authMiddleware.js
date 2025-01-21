import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.header('Authorization')
    if (!authHeader) {
      return res
        .status(401)
        .json({ error: 'Authorization header is missing' })
    }

    const token = authHeader.split(' ')[1]
    if (!token) {
      return res
        .status(401)
        .json({ error: 'Token is missing in the Authorization header' })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    if (!decoded) {
      return res.status(401).json({ error: 'Token verification failed' })
    }

    req.user = decoded
    req.user.userId = decoded.id

    next()
  } catch (err) {
    console.error(`Authentication error: ${err.message}`)
    res
      .status(401)
      .json({ error: 'Token is invalid or expired', error: err.message })
  }
}

export default authMiddleware

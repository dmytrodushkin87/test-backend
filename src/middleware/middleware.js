export const userValidation = async (req, res, next) => {

  const {
    body: { address },
  } = req

  if (!address) {
    return res.status(400).json({ error: 'Address is Required' })
  }

  next()
}

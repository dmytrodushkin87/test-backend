export const createAsset = async (req, res) => {
  try {
    const {
      context: {
        models: { User, Asset },
      },
      body,
    } = req
    const { type, level, address } = body

    if (!address) {
      return res.status(404).json({ message: 'User Address is required' })
    }
    const user = await User.findOne({ where: { address } })
    if (!user) {
      return res.status(404).json({ message: 'User not found with this address' })
    }

    const createAsset = await Asset.create({ type, level, addressKey: address })

    return res.status(201).send(createAsset)

  } catch (err) {
    return res.json({ message: 'Something went wrong' })
  }
}

import { UserMessages } from '../constants/user'

export const createUser = async (req, res) => {
  try {
    const {
      context: {
        models: { User },
      },
      body,
    } = req
    const { address, cash1, cash2, cash3 } = body

    const addressExist = await User.findOne({ where: { address } })

    if (addressExist) {
      return res.status(400).json({ message: UserMessages.ADDRESS_EXIST })
    } else {
      const createUser = await User.create({ address, cash1, cash2, cash3 })
      return res.status(201).send(createUser)
    }
  } catch (err) {
    return res.json({ message: UserMessages.INVALID_INPUT })
  }
}

export const getUsers = async (req, res) => {
  try {
    const {
      context: {
        models: { User },
      },
      // body: { skip = 0, limit = 10 },
    } = req
    const usersData = await User.findAll({})

    return res.status(200).json(usersData)
  } catch (error) {
    console.log(error)
    return res.status(500).json(error)
  }
}

export const getUser = async (req, res) => {
  try {
    const {
      context: {
        models: { User },
      },
      params: { address },
    } = req
    const user = await User.findOne({ where: { address } })

    if (user) {
      return res.status(200).json(user)
    } else {
      return res.status(404).json({ message: UserMessages.USER_NOT_FOUND })
    }
  } catch (error) {
    return res.status(404).json({ message: UserMessages.INVALID_INPUT })
  }
}

export const updateUser = async (req, res) => {
  try {
    const {
      context: {
        models: { User },
      },
      params: { address },
    } = req
    const user = await User.findOne({ where: { address } })
    if (user) {
      const { body } = req
      await User.update(body, { where: { address } })

      return res.status(200).json({ message: UserMessages.USER_UPDATE, User: await User.findOne({ where: { address } }) })
    } else {
      return res.status(404).json({ message: UserMessages.USER_NOT_FOUND })
    }
  } catch (error) {
    return res.status(400).json({ message: UserMessages.INVALID_INPUT })
  }
}

export const deleteUser = async (req, res) => {
  try {
    const {
      context: {
        models: { User },
      },
      params: { address },
    } = req
    const user = await User.findOne({ where: { address } })
    if (user) {
      await User.destroy({ where: { address } })

      return res.status(200).json({ message: UserMessages.USER_DELETE })
    } else {
      return res.status(404).json({ message: UserMessages.USER_NOT_FOUND })
    }
  } catch (error) {
    console.log(error)
    return res.status(400).json({ message: UserMessages.INVALID_INPUT })
  }
}

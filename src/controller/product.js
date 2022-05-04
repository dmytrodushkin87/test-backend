export const buyProduct = async (req, res) => {
  try {
    const {
      context: {
        models: { Product, User, Catalog, Asset },
      },
      body,
    } = req
    const { id, address } = body

    const catalog = await Catalog.findOne({ where: { id } })

    if (!catalog) {
      return res.json({ message: 'Catalog Not Found!' })
    }

    const user = await User.findOne({ where: { address } })

    if (!user) {
      return res.json({ message: 'User Not Found!' })
    }

    if (catalog.cost1 >= user.cash1) {

      if (!catalog.req1) {

        const isOwnAsset = await Asset.findOne({ where: { addressKey: address, type: 1 } })

        if (!isOwnAsset) {
          return res.json({ message: 'Req1 Not Own Asset' })
        }
        if (isOwnAsset.level > isOwnAsset.req1) {
          return res.json({ message: 'Level > Req1' })
        }
      }
      return res.json({ message: 'Cash1 < Cost1' })

    } else if (catalog.cost2 >= user.cash2) {

      if (!catalog.req2) {

        const isOwnAsset = await Asset.findOne({ where: { addressKey: address, type: 2 } })

        if (!isOwnAsset) {
          return res.json({ message: 'Req2 Not Own Asset' })
        }
        if (isOwnAsset.level > isOwnAsset.req2) {
          return res.json({ message: 'Level > Req2' })
        }
      }

      return res.json({ message: 'Cash2 < Cost2' })

    } else if (catalog.cost3 >= user.cash3) {

      if (!catalog.req3) {

        const isOwnAsset = await Asset.findOne({ where: { addressKey: address, type: 3 } })

        if (!isOwnAsset) {
          return res.json({ message: 'Req3 Not Own Asset' })
        }
        if (isOwnAsset.level > isOwnAsset.req1) {
          return res.json({ message: 'Level > Req3' })
        }
      }

      return res.json({ message: 'Cash3 < Cost3' })
    } else {
      await Product.create({ addressKey: address })

      await User.update({
        cash1: user.cash1 - catalog.cost1,
        cash2: user.cash2 - catalog.cost2,
        cash3: user.cash3 - catalog.cost3,
      }, { where: { address } })
    }

    const userWithNewCash = await User.findOne({ where: { address } })

    return res.json({ userWithNewCash })
  } catch (err) {
    console.log(err)
    return res.json({ message: 'Something Went Wrong' })
  }
}

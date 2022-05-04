import { CatalogMessages } from '../constants/catalog'

export const createCatalog = async (req, res) => {
  try {
    const {
      context: {
        models: { Catalog },
      },
      body,
    } = req
    const { name, description, url, cost1, cost2, cost3, req1, req2, req3, category } = body

    const createCatalog = await Catalog.create({ name, description, url, cost1, cost2, cost3, req1, req2, req3, category })

    let obj = {
      id: createCatalog.id,
      name: createCatalog.name || '',
      description: createCatalog.description || '',
      imageUrl: createCatalog.url || '',
      price: {
        cost1: createCatalog.cost1,
        cost2: createCatalog.cost2,
        cost3: createCatalog.cost3,
      },
      req: {
        req1: createCatalog.req1,
        req2: createCatalog.req2,
        req3: createCatalog.req3,
      }
    }

    return res.status(201).send(obj)
  } catch (err) {
    return res.json({ message: CatalogMessages.INVALID_INPUT })
  }
}

export const getCatalogs = async (req, res) => {
  try {
    const {
      context: {
        models: { Catalog },
      },
      // body: { skip = 0, limit = 10 },
    } = req
    const catalogsData = await Catalog.findAll({})

    return res.status(200).json(catalogsData)
  } catch (error) {
    console.log(error)
    return res.status(500).json(error)
  }
}

export const getCatalog = async (req, res) => {
  try {
    const {
      context: {
        models: { Catalog },
      },
      params: { id },
    } = req
    const catalog = await Catalog.findOne({ where: { id } })

    if (catalog) {
      return res.status(200).json(catalog)
    } else {
      return res.status(404).json({ message: CatalogMessages.CATALOG_NOT_FOUND })
    }
  } catch (error) {
    return res.status(404).json({ message: CatalogMessages.INVALID_INPUT })
  }
}

export const updateCatalog = async (req, res) => {
  try {
    const {
      context: {
        models: { Catalog },
      },
      params: { id },
    } = req
    const catalog = await Catalog.findOne({ where: { id } })
    if (catalog) {
      const { body } = req
      await Catalog.update(body, { where: { id } })

      return res.status(200).json({ message: CatalogMessages.CATALOG_UPDATE, Catalog: await Catalog.findOne({ where: { id } }) })
    } else {
      return res.status(404).json({ message: CatalogMessages.CATALOG_NOT_FOUND })
    }
  } catch (error) {
    return res.status(400).json({ message: CatalogMessages.INVALID_INPUT })
  }
}

export const deleteCatalog = async (req, res) => {
  try {
    const {
      context: {
        models: { Catalog },
      },
      params: { id },
    } = req
    const catalog = await Catalog.findOne({ where: { id } })
    if (catalog) {
      await Catalog.destroy({ where: { id } })

      return res.status(200).json({ message: CatalogMessages.CATALOG_DELETE })
    } else {
      return res.status(404).json({ message: CatalogMessages.CATALOG_NOT_FOUND })
    }
  } catch (error) {
    console.log(error)
    return res.status(400).json({ message: CatalogMessages.INVALID_INPUT })
  }
}

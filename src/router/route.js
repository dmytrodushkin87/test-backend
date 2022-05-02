const { Router } = require("express");
const connection = require("../database/db");

const router = Router();

router.post("/catalog", async (request, res, next) => {
  try {
    const { name, description, imageUrl, price, req } = request.body;

    const result = await connection.query(
      `INSERT INTO catalog (name, description, url,cost1,cost2,cost3,req1,req2,req3)
            VALUES ('${name}', '${description}', '${imageUrl}', 
                ${price.cost1},${price.cost2},${price.cost3},
                ${req.req1},${req.req2},${req.req3}
                )`
    );

    res.send({ status: 201, message: "created" });
  } catch (error) {
    res.send(error);
  }
});

router.post("/buyProduct", async (request, res, next) => {
  try {
    const { id, address } = request.body;

    let users, catalog;
    connection.query(
      `SELECT * from users WHERE address = ${address}`,
      [],
      function (err, results) {
        users = results[0];
        connection.query(
          `SELECT * FROM catalog WHERE id = ${id}`,
          [],
          function (err, results) {
            catalog = results[0];

            if (
              users.cash1 >= catalog.cost1 &&
              users.cash2 >= catalog.cost2 &&
              users.cash3 >= catalog.cost3
            ) {
              connection.query(
                `SELECT * FROM asset where address = ${address}`,
                [],
                function (err, results) {
                  const assest = results;

                  if (assest.length) {
                    if (assest.every((i) => i.level >= users.req1)) {
                      connection.query(
                        `INSERT INTO asset (address,type,lavel)  VALUES (${id},1,${assest.length})`,
                        [],
                        function (err, results) {
                          res.send({
                            status: 200,
                            success: true,
                            data: {
                              resources: {
                                cash1: users.cash1,
                                cash2: users.cash2,
                                cash3: users.cash3,
                              },
                            },
                          });
                        }
                      );
                    } else {
                      res.send({
                        success: false,
                        error: {
                          errorMessage: "request not found",
                        },
                      });
                    }
                  } else if (assest.length === 0) {
                    connection.query(
                      `INSERT INTO asset (address,type,lavel)  VALUES (${id},1,${assest.length})`,
                      [],
                      function (err, results) {
                        res.send({
                          status: 200,
                          success: true,
                          data: {
                            resources: {
                              cash1: users.cash1,
                              cash2: users.cash2,
                              cash3: users.cash3,
                            },
                          },
                        });
                      }
                    );
                  } else {
                    res.send({
                      success: false,
                      error: {
                        errorMessage: "asset not found",
                      },
                    });
                  }
                }
              );
            } else {
              res.send({
                success: false,
                error: {
                  errorMessage: "not found",
                },
              });
            }
          }
        );
      }
    );
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;

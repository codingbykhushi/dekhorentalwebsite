import { Sequelize } from "sequelize";

const sequelize = new Sequelize("dekhorentals", "root", "2109", {
  host: "localhost",
  dialect: "mysql",
});
sequelize.authenticate()
    .then(result => {
        console.log("Database conected");
    }).catch(err => {
        console.log(err);
    })

export default sequelize;

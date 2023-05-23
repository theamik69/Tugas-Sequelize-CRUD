module.exports = (sequelize, Sequelize) => {

const biodatas = sequelize.define("biodata", {
    id: {
        type: Sequelize.STRING(20),
        primaryKey: true,
        allowNull: false
    },
    nama: {
        type: Sequelize.STRING(50),
        allowNull: false
    },
    tempat_lahir: {
        type: Sequelize.STRING(50),
        allowNull: false
    },
    tanggal_lahir: {
        type: Sequelize.DATE,
        allowNull: false
    },
    alamat: {
        type: Sequelize.TEXT,
        allowNull: false
    }
});

return biodatas;
};
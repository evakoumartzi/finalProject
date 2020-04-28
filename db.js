const spicedPg = require("spiced-pg");
const db = spicedPg(
    process.env.DATABASE_URL ||
        "postgres:postgres:postgres@localhost:5432/equationFeverdb"
);

module.exports.getHighScores = () => {
    const q = `
    SELECT * FROM highScores
    ORDER BY score DESC
    LIMIT 10 ;`;

    const params = [];
    return db.query(q, params);
};

module.exports.newScore = (name, score) => {
    const q = `
    INSERT into highScores (name, score)
    VALUES ($1, $2)
    RETURNING name, score`;
    const params = [name, score];
    return db.query(q, params);
};

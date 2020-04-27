  DROP TABLE IF EXISTS highScores;


  CREATE TABLE highScores (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255),
      score INT 
  );

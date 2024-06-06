const neo4j = require('neo4j-driver');

const uri = 'neo4j+s://b7e026bd.databases.neo4j.io';
const user = 'neo4j';  // default username
const password = 'v0TrFHpdUCiSc6Xz0Sf1ow15-i0YS-t0nd5gC2XKs_A';  // replace with your password

const driver = neo4j.driver(uri, neo4j.auth.basic(user, password));
const session = driver.session();

const createNodesAndRelationships = async () => {
  try {
    await session.writeTransaction(tx =>
      tx.run(`
        CREATE (a:Site {name: 'Stade de France', lat: 48.9244, lon: 2.3601})
        CREATE (b:Site {name: 'Arena Paris Sud 4', lat: 48.830184, lon: 2.289033})
        CREATE (c:Site {name: 'Colline de Elancourt', lat: 48.7744, lon: 1.9501})
        CREATE (d:Site {name: 'Stade Pierre Mauroy', lat: 50.6104, lon: 3.1301})
        CREATE (a)-[:DISTANCE {distance: 10}]->(b)
        CREATE (b)-[:DISTANCE {distance: 15}]->(c)
        CREATE (a)-[:DISTANCE {distance: 20}]->(c)
        CREATE (a)-[:DISTANCE {distance: 50}]->(d)
        CREATE (b)-[:DISTANCE {distance: 45}]->(d)
        CREATE (c)-[:DISTANCE {distance: 55}]->(d)
      `)
    );
    console.log('Nodes and relationships created');
  } catch (error) {
    console.error('Error creating nodes and relationships:', error);
  } finally {
    await session.close();
    await driver.close();
  }
};

createNodesAndRelationships();

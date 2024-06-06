const express = require('express');
const cors = require('cors');
const { default: mongoose } = require('mongoose');
const redis = require('redis');
const redisClient = require('./redisClient');
const app = express();
const Site = require('./models/Site.js');
const Sport = require('./models/sport.js');
const { Client } = require('pg');
const neo4j = require('neo4j-driver');
app.use(express.json());  // Middleware to parse JSON bodies

app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173',
}));



// Connect to MongoDB Atlas




app.get('/sites', async (req, res) => {
    mongoose.connect('mongodb+srv://Hike2:test123@cluster0.geoeuuo.mongodb.net/');
    try {
        const sites = await Site.find();
        res.json(sites);
    } catch (error) {
        console.error("Error processing search request:", error);
        res.status(500).json({ error: "An error occurred while processing the search request" });
    }
});
app.get('/sites/:id', async (req, res) => {
    mongoose.connect('mongodb+srv://Hike2:test123@cluster0.geoeuuo.mongodb.net/');
    const { id } = req.params;

    try {
        let site;
        if (mongoose.Types.ObjectId.isValid(id)) {
            // Try to find the document by _id if it's a valid ObjectId
            site = await Site.findById(id);
        }

        // If not found by _id, or id is not a valid ObjectId, try to find by code_site

        // If not found by _id, or id is not a valid ObjectId, try to find by code_site in Redis
        if (!site) {
            const details = await redisClient.hGetAll(`olympic_site:${id}`);
            if (Object.keys(details).length === 0) {
                return res.status(404).json({ error: 'Site not found' });
            }
            details.sports = safeJsonParse(details.sports);
            details.point_geo = safeJsonParse(details.point_geo);
            site = details;
        }

        if (site) {
            res.json(site);
        } else {
            res.status(404).json({ error: 'Site not found' });
        }
    } catch (err) {
        console.error('Error retrieving site:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get("/search", async (req, res) => {
    try {
        // Connect to MongoDB
        await mongoose.connect('mongodb+srv://Hike2:test123@cluster0.geoeuuo.mongodb.net/');

        // Extract query parameters from request
        const { sports, utilisation, start_date, end_date } = req.query;

        // Construct search query based on query parameters
        const searchQuery = {};

        if (sports) {
            searchQuery.sports = { $elemMatch: { $regex: sports, $options: 'i' } };
        }
        if (utilisation) {
            searchQuery.utilisation = { $elemMatch: { $regex: utilisation, $options: 'i' } };
        }
        if (start_date) {
            searchQuery.start_date = { $gte: new Date(start_date) };
        }
        if (end_date) {
            searchQuery.end_date = { $lte: new Date(end_date) };
        }

        // Execute search query and return results
        const searchResults = await Site.find(searchQuery);
        res.json(searchResults);
    } catch (error) {
        console.error("Error processing search request:", error);
        res.status(500).json({ error: "An error occurred while processing the search request" });
    }
});
app.get('/sports/:sport/events', async (req, res) => {
    try {
        // Utilisation d'une expression régulière pour effectuer une recherche par sous-chaîne
        const sportRegex = new RegExp(req.params.sport, 'i'); // 'i' pour rendre la recherche insensible à la casse
        const sport = await Sport.findOne({ sport: sportRegex });
        if (!sport) {
            return res.status(404).json({ message: 'Sport not found' });
        }
        res.json({
            événements: sport.événements,
            image: sport.image, // Inclure l'image dans la réponse
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
app.get('/sports', async (req, res) => {
    try {
        const sports = await Sport.find({}, 'sport image'); // Récupérer le nom et l'image des sports
        res.json(sports);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});
app.get('/sites-names', async (req, res) => {
    try {
        const sites = await Site.find({}, 'nom_site'); // Fetch only the nom_site field
        res.json(sites);
    } catch (err) {
        console.error('Error fetching sites:', err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
//Redis




// (async () => {
//     const olympicSites = [
//         {
//             code_site: 'SF',
//             nom_site: 'Stade de France',
//             sports: ["Athlétisme", "Cérémonies"],
//             start_date: '2024-07-26',
//             end_date: '2024-08-11',
//             point_geo: { lon: 2.3601, lat: 48.9244 },
//             image: 'https://img.olympics.com/images/image/private/t_s_16_9_g_auto/t_s_w146…'
//         },
//         {
//             code_site: 'SP4',
//             nom_site: 'Arena Paris Sud 4',
//             sports: ["Tennis"],
//             start_date: '2024-08-20',
//             end_date: '2024-08-10',
//             point_geo: { lon: 2.289033, lat: 48.830184 },
//             image: 'https://img.olympics.com/images/image/private/t_s_16_9_g_auto/t_s_w146…'
//         },
//         {
//             code_site: 'CE',
//             nom_site: 'Colline d\'Elancourt',
//             sports: ["VTT"],
//             start_date: '2024-07-27',
//             end_date: '2024-08-10',
//             point_geo: { lon: 1.9501, lat: 48.7744 },
//             image: 'https://img.olympics.com/images/image/private/t_s_16_9_g_auto/t_s_w146…'
//         }
//     ];

//     for (const site of olympicSites) {
//         try {
//             await redisClient.sAdd('olympic_sites', site.code_site);
//             await redisClient.hSet(`olympic_site:${site.code_site}`, {
//                 code_site: site.code_site,
//                 nom_site: site.nom_site,
//                 sports: JSON.stringify(site.sports),
//                 start_date: site.start_date,
//                 end_date: site.end_date,
//                 point_geo: JSON.stringify(site.point_geo),
//                 image: site.image
//             });
//             console.log(`Olympic site ${site.nom_site} added to Redis`);
//         } catch (err) {
//             console.error('Error adding Olympic site to Redis:', err);
//         }
//     }

//     const paralympicSites = [
//         {
//             code_site: 'SPM',
//             nom_site: 'Stade Pierre Mauroy',
//             sports: ["Handball"],
//             start_date: '2024-08-25',
//             end_date: '2024-09-08',
//             point_geo: { lon: 3.1301, lat: 50.6104 },
//             image: 'https://img.olympics.com/images/image/private/t_s_16_9_g_auto/t_s_w146…'
//         },
//         {
//             code_site: 'SP4',
//             nom_site: 'Arena Paris Sud 4',
//             sports: ["Tennis de table"],
//             start_date: '2024-08-25',
//             end_date: '2024-09-08',
//             point_geo: { lon: 2.289033, lat: 48.830184 },
//             image: 'https://img.olympics.com/images/image/private/t_s_16_9_g_auto/t_s_w146…'
//         },
//         {
//             code_site: 'SF',
//             nom_site: 'Stade de France',
//             sports: ["Athlétisme"],
//             start_date: '2024-08-25',
//             end_date: '2024-09-08',
//             point_geo: { lon: 2.3601, lat: 48.9244 },
//             image: 'https://img.olympics.com/images/image/private/t_s_16_9_g_auto/t_s_w146…'
//         }
//     ];

//     for (const site of paralympicSites) {
//         try {
//             await redisClient.sAdd('paralympic_sites', site.code_site);
//             await redisClient.hSet(`paralympic_site:${site.code_site}`, {
//                 code_site: site.code_site,
//                 nom_site: site.nom_site,
//                 sports: JSON.stringify(site.sports),
//                 start_date: site.start_date,
//                 end_date: site.end_date,
//                 point_geo: JSON.stringify(site.point_geo),
//                 image: site.image
//             });
//             console.log(`Paralympic site ${site.nom_site} added to Redis`);
//         } catch (err) {
//             console.error('Error adding Paralympic site to Redis:', err);
//         }
//     }


// })();

//Helper function to safely parse JSON
function safeJsonParse(str) {
    try {
        return JSON.parse(str);
    } catch (e) {
        console.error('Invalid JSON:', str);
        return null;
    }
}

// API endpoint to get Olympic sites
app.get('/olympic-sites', async (req, res) => {
    try {
        // Retrieve all site names from the set 'olympic_sites'
        const siteNames = await redisClient.sMembers('olympic_sites');
        console.log('Site Names:', siteNames); // Add logging here

        // Initialize an empty array to hold the site details
        const sites = [];

        // Loop through each site name
        for (const siteName of siteNames) {
            // Retrieve the hash map containing the site details
            const details = await redisClient.hGetAll(`olympic_site:${siteName}`);
            console.log(`Details for ${siteName}:`, details); // Add logging here

            // Safely parse the JSON fields
            details.sports = safeJsonParse(details.sports);
            details.point_geo = safeJsonParse(details.point_geo);

            // Add the site details to the array
            sites.push(details);
        }

        // Respond with the array of site details in JSON format
        res.json(sites);
    } catch (err) {
        console.error('Error retrieving Olympic sites from Redis:', err);
        res.status(500).send('Internal Server Error');
    }
});

// API endpoint to get Paralympic sites

app.get('/paralympic-sites', async (req, res) => {
    try {
        // Retrieve all site names from the set 'paralympic-sites'
        const siteNames = await redisClient.sMembers('paralympic_sites');
        console.log('Site Names:', siteNames); // Add logging here

        // Initialize an empty array to hold the site details
        const sites = [];

        // Loop through each site name
        for (const siteName of siteNames) {
            // Retrieve the hash map containing the site details
            const details = await redisClient.hGetAll(`paralympic_site:${siteName}`);
            console.log(`Details for ${siteName}:`, details); // Add logging here

            // Safely parse the JSON fields
            details.sports = safeJsonParse(details.sports);
            details.point_geo = safeJsonParse(details.point_geo);

            // Add the site details to the array
            sites.push(details);
        }

        // Respond with the array of site details in JSON format
        res.json(sites);
    } catch (err) {
        console.error('Error retrieving Olympic sites from Redis:', err);
        res.status(500).send('Internal Server Error');
    }
});
async function updateSite(siteType, siteCode, updatedFields) {
    const siteKey = `${siteType}_site:${siteCode}`;

    // Convert object fields to strings if necessary
    if (updatedFields.sports) {
        updatedFields.sports = JSON.stringify(updatedFields.sports);
    }
    if (updatedFields.point_geo) {
        updatedFields.point_geo = JSON.stringify(updatedFields.point_geo);
    }

    try {
        // Update the site in Redis
        await redisClient.hSet(siteKey, updatedFields);
        console.log(`Site ${siteCode} updated in Redis`);
    } catch (err) {
        console.error('Error updating site in Redis:', err);
    }
}// //Connecting to postgreSQL:
// const connectionString = 'postgres://tsdbadmin:bsotrjlapjtg05ro@pp2l22f7eh.ti9jzh8ziy.tsdb.cloud.timescale.com:34221/tsdb?sslmode=require';

// const client = new Client({
//     connectionString: connectionString,
// });

// const createTablesAndInsertData = async () => {
//     try {
//         await client.connect();
//         console.log('Connected to PostgreSQL');

//         const createSitesTableQuery = `
//       CREATE TABLE IF NOT EXISTS sites (
//           id SERIAL PRIMARY KEY,
//           name VARCHAR(255) NOT NULL,
//           lat DOUBLE PRECISION NOT NULL,
//           lon DOUBLE PRECISION NOT NULL
//       );
//     `;

//         const createDistancesTableQuery = `
//       CREATE TABLE IF NOT EXISTS distances (
//           id SERIAL PRIMARY KEY,
//           from_site_id INT REFERENCES sites(id),
//           to_site_id INT REFERENCES sites(id),
//           distance DOUBLE PRECISION NOT NULL
//       );
//     `;


//         await client.query(createSitesTableQuery);
//         await client.query(createDistancesTableQuery);

//         const insertSitesQuery = `
//       INSERT INTO sites (name, lat, lon) VALUES
//       ('Stade de France', 48.9244, 2.3601),
//       ('Arena Paris Sud 4', 48.830184, 2.289033),
//       ('Colline d''Elancourt', 48.7744, 1.9501)
//       ON CONFLICT (name) DO NOTHING;
//     `;

//         const insertDistancesQuery = `
//       INSERT INTO distances (from_site_id, to_site_id, distance) VALUES
//       ((SELECT id FROM sites WHERE name = 'Stade de France'), (SELECT id FROM sites WHERE name = 'Arena Paris Sud 4'), 10),
//       ((SELECT id FROM sites WHERE name = 'Arena Paris Sud 4'), (SELECT id FROM sites WHERE name = 'Colline d''Elancourt'), 15),
//       ((SELECT id FROM sites WHERE name = 'Stade de France'), (SELECT id FROM sites WHERE name = 'Colline d''Elancourt'), 20)
//       ON CONFLICT DO NOTHING;
//     `;

//         await client.query(insertSitesQuery);
//         await client.query(insertDistancesQuery);

//         console.log('Tables created and sample data inserted successfully');
//     } catch (err) {
//         console.error('Error creating tables or inserting data', err);
//     }
//     // } finally {
//     //     await client.end();
//     //     console.log('Client disconnected');
//     // }
// };

// createTablesAndInsertData();

// app.post('/calculate-travel-time', async (req, res) => {
//     const { planning } = req.body;

//     if (!planning || !Array.isArray(planning) || planning.length < 2) {
//         return res.status(400).json({ error: 'Invalid planning data' });
//     }

//     try {


//         let totalTravelTime = 0;

//         for (let i = 0; i < planning.length - 1; i++) {
//             const origin = planning[i].site;
//             const destination = planning[i + 1].site;

//             const query = `
//           SELECT d.distance
//           FROM distances d
//           JOIN sites s1 ON d.from_site_id = s1.id
//           JOIN sites s2 ON d.to_site_id = s2.id
//           WHERE s1.name = $1 AND s2.name = $2
//         `;

//             const result = await client.query(query, [origin, destination]);

//             if (result.rows.length === 0) {
//                 throw new Error(`No distance found between ${origin} and ${destination}`);
//             }

//             const travelTime = result.rows[0].distance; // assuming distance is in minutes
//             totalTravelTime += travelTime;
//         }

//         res.json({ totalTravelTime }); // in minutes or any unit used
//     } catch (error) {
//         console.error('Error calculating travel time:', error);
//         res.status(500).json({ error: 'Internal Server Error', details: error.message });
//     } finally {
//         await client.end(); // Ensure the client is disconnected
//     }
// });

// // Endpoint to fetch all sites
// app.get('/sites_list', async (req, res) => {
//     try {
//         const result = await client.query('SELECT * FROM sites');
//         res.json(result.rows);
//     } catch (err) {
//         console.error('Error fetching sites:', err);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });

// // Endpoint to fetch all distances
// app.get('/distances', async (req, res) => {
//     try {
//         const result = await client.query('SELECT * FROM distances');
//         res.json(result.rows);
//     } catch (err) {
//         console.error('Error fetching distances:', err);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });
//connceting to Neo4j
const uri = 'neo4j+s://7adfebd3.databases.neo4j.io';
const user = 'neo4j';
const password = 'v0TrFHpdUCiSc6Xz0Sf1ow15-i0YS-t0nd5gC2XKs_A';
const driver = neo4j.driver(uri, neo4j.auth.basic(user, password));
app.get('/site_names', async (req, res) => {
    const session = driver.session();
  
    try {
      const result = await session.run(
        `MATCH (s:Site)
         RETURN s.name AS name`
      );
  
      const siteNames = result.records.map(record => record.get('name'));
      res.json(siteNames);
    } catch (error) {
      console.error('Error fetching site names:', error);
      res.status(500).json({ error: 'Internal Server Error', details: error.message });
    } finally {
      await session.close();
    }
  });
  


// Function to calculate the Haversine distance
const haversineDistance = (lat1, lon1, lat2, lon2) => {
  const toRad = angle => (Math.PI / 180) * angle;
  const R = 6371; // Earth radius in km

  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a = Math.sin(dLat / 2) ** 2 +
            Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
            Math.sin(dLon / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

// Endpoint to calculate travel time
app.post('/calculate-travel-time', async (req, res) => {
  const { planning } = req.body;
  if (!planning || !Array.isArray(planning) || planning.length < 2) {
    return res.status(400).json({ error: 'Invalid planning data' });
  }
   const session = driver.session();
   try {
    let totalTravelTime = 0;
    const averageSpeed = 50; // Average speed in km/h
   for (let i = 0; i < planning.length - 1; i++) {
      const origin = planning[i].site;
      const destination = planning[i + 1].site;

      const result = await session.run(
        `MATCH (a:Site {name: $origin}), (b:Site {name: $destination})
         RETURN a.lat AS lat1, a.lon AS lon1, b.lat AS lat2, b.lon AS lon2`,
        { origin, destination }
      );
     if (result.records.length === 0) {
        throw new Error(`No sites found for ${origin} and ${destination}`);
      }
      const { lat1, lon1, lat2, lon2 } = result.records[0].toObject();
      const distance = haversineDistance(lat1, lon1, lat2, lon2);
      const travelTime = (distance / averageSpeed) * 60; // Time in minutes
      totalTravelTime += travelTime;
    }
    const totalTravelTimeInMinutes = Math.ceil(totalTravelTime);
    res.json({ totalTravelTime: totalTravelTimeInMinutes });
  } catch (error) {
    console.error('Error calculating travel time:', error);
    res.status(500).json({ error: 'Internal Server Error', details: error.message });
  } finally {
    await session.close();
  }
});

app.listen(4000);
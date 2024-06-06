const redis = require('redis');
 (async () => {
     const olympicSites = [
         {
             code_site: 'SF',
             nom_site: 'Stade de France',
             sports: ["Athlétisme", "Cérémonies"],
             start_date: '2024-07-26',
             end_date: '2024-08-11',
             point_geo: { lon: 2.3601, lat: 48.9244 },
             image: 'https://img.olympics.com/images/image/private/t_s_16_9_g_auto/t_s_w146…'
        },
        {
            code_site: 'SP4',
            nom_site: 'Arena Paris Sud 4',
            sports: ["Tennis"],
            start_date: '2024-08-20',
            end_date: '2024-08-10',
            point_geo: { lon: 2.289033, lat: 48.830184 },
            image: 'https://img.olympics.com/images/image/private/t_s_16_9_g_auto/t_s_w146…'
        },
        {
            code_site: 'CE',
            nom_site: 'Colline d\'Elancourt',
            sports: ["VTT"],
            start_date: '2024-07-27',
            end_date: '2024-08-10',
            point_geo: { lon: 1.9501, lat: 48.7744 },
            image: 'https://img.olympics.com/images/image/private/t_s_16_9_g_auto/t_s_w146…'
         }
     ];

     for (const site of olympicSites) {
         try {
             await redisClient.sAdd('olympic_sites', site.code_site);
             await redisClient.hSet(`olympic_site:${site.code_site}`, {
                 code_site: site.code_site,
                 nom_site: site.nom_site,
                 sports: JSON.stringify(site.sports),
                 start_date: site.start_date,
                 end_date: site.end_date,
                 point_geo: JSON.stringify(site.point_geo),
                 image: site.image
             });
             console.log(`Olympic site ${site.nom_site} added to Redis`);
         } catch (err) {
             console.error('Error adding Olympic site to Redis:', err);
         }
     }

     const paralympicSites = [
         {
             code_site: 'SPM',
             nom_site: 'Stade Pierre Mauroy',
             sports: ["Handball"],
             start_date: '2024-08-25',
             end_date: '2024-09-08',
             point_geo: { lon: 3.1301, lat: 50.6104 },
             image: 'https://img.olympics.com/images/image/private/t_s_16_9_g_auto/t_s_w146…'
         },
         {
             code_site: 'SP4',
             nom_site: 'Arena Paris Sud 4',
             sports: ["Tennis de table"],
             start_date: '2024-08-25',
             end_date: '2024-09-08',
             point_geo: { lon: 2.289033, lat: 48.830184 },
             image: 'https://img.olympics.com/images/image/private/t_s_16_9_g_auto/t_s_w146…'
         },
         {
             code_site: 'SF',
             nom_site: 'Stade de France',
             sports: ["Athlétisme"],
             start_date: '2024-08-25',
             end_date: '2024-09-08',
             point_geo: { lon: 2.3601, lat: 48.9244 },
             image: 'https://img.olympics.com/images/image/private/t_s_16_9_g_auto/t_s_w146…'
         }
     ];

     for (const site of paralympicSites) {
         try {
             await redisClient.sAdd('paralympic_sites', site.code_site);
             await redisClient.hSet(`paralympic_site:${site.code_site}`, {
                 code_site: site.code_site,
                 nom_site: site.nom_site,
                 sports: JSON.stringify(site.sports),
                 start_date: site.start_date,
                 end_date: site.end_date,
                 point_geo: JSON.stringify(site.point_geo),
                 image: site.image
             });
             console.log(`Paralympic site ${site.nom_site} added to Redis`);
         } catch (err) {
             console.error('Error adding Paralympic site to Redis:', err);
         }
     }

 })();
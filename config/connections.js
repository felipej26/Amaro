/**
 * Connections
 * (sails.config.connections)
 *
 * `Connections` are like "saved settings" for your adapters.  What's the difference between
 * a connection and an adapter, you might ask?  An adapter (e.g. `sails-mysql`) is generic--
 * it needs some additional information to work (e.g. your database host, password, user, etc.)
 * A `connection` is that additional information.
 *
 * Each model must have a `connection` property (a string) which is references the name of one
 * of these connections.  If it doesn't, the default `connection` configured in `config/models.js`
 * will be applied.  Of course, a connection can (and usually is) shared by multiple models.
 * .
 * Note: If you're using version control, you should put your passwords/api keys
 * in `config/local.js`, environment variables, or use another strategy.
 * (this is to prevent you inadvertently sensitive credentials up to your repository.)
 *
 * For more information on configuration, check out:
 * http://sailsjs.org/#!/documentation/reference/sails.config/sails.config.connections.html
 */

 /* {
    adapter: 'sails-elastic',
    hosts: ['http://127.0.0.1:9200'],
    keepAlive: false,
    sniffOnStart: true,
    maxRetries: 10,
    deadTimeout: 40000,
    sniffOnConnectionFault: true,
    apiVersion: '2.0'
  }, */

module.exports.connections = {

  /***************************************************************************
  *                                                                          *
  * Local disk storage for DEVELOPMENT ONLY                                  *
  *                                                                          *
  * Installed by default.                                                    *
  *                                                                          *
  ***************************************************************************/
  localDiskDb: {
    adapter: 'sails-disk'
  },

  /***************************************************************************
  *                                                                          *
  * MySQL is the world's most popular relational database.                   *
  * http://en.wikipedia.org/wiki/MySQL                                       *
  *                                                                          *
  * Run: npm install sails-mysql                                             *
  *                                                                          *
  ***************************************************************************/
  // someMysqlServer: {
  //   adapter: 'sails-mysql',
  //   host: 'YOUR_MYSQL_SERVER_HOSTNAME_OR_IP_ADDRESS',
  //   user: 'YOUR_MYSQL_USER', //optional
  //   password: 'YOUR_MYSQL_PASSWORD', //optional
  //   database: 'YOUR_MYSQL_DB' //optional
  // },

  /***************************************************************************
  *                                                                          *
  * MongoDB is the leading NoSQL database.                                   *
  * http://en.wikipedia.org/wiki/MongoDB                                     *
  *                                                                          *
  * Run: npm install sails-mongo                                             *
  *                                                                          *
  ***************************************************************************/
  // someMongodbServer: {
  //   adapter: 'sails-mongo',
  //   host: 'localhost',
  //   port: 27017,
  //   user: 'username', //optional
  //   password: 'password', //optional
  //   database: 'your_mongo_db_name_here' //optional
  // },

  /***************************************************************************
  *                                                                          *
  * PostgreSQL is another officially supported relational database.          *
  * http://en.wikipedia.org/wiki/PostgreSQL                                  *
  *                                                                          *
  * Run: npm install sails-postgresql                                        *
  *                                                                          *
  *                                                                          *
  ***************************************************************************/
  // somePostgresqlServer: {
  //   adapter: 'sails-postgresql',
  //   host: 'YOUR_POSTGRES_SERVER_HOSTNAME_OR_IP_ADDRESS',
  //   user: 'YOUR_POSTGRES_USER', // optional
  //   password: 'YOUR_POSTGRES_PASSWORD', // optional
  //   database: 'YOUR_POSTGRES_DB' //optional
  // }


  /***************************************************************************
  *                                                                          *
  * More adapters: https://github.com/balderdashy/sails                      *
  *                                                                          *
  ***************************************************************************/

  mySqlAdapterDev: {
		adapter: 'sails-mysql',
		host: process.env.OPENSHIFT_MYSQL_DB_HOST || '127.0.0.1',
		user: process.env.OPENSHIFT_MYSQL_DB_USERNAME || 'root',
		password: process.env.OPENSHIFT_MYSQL_DB_PASSWORD || 'root',
		port: process.env.OPENSHIFT_MYSQL_DB_PORT || 3306,
		database: 'amaro'
  },
  
  mySqlAdapterProd: {
		adapter: 'sails-mysql',
		host: process.env.OPENSHIFT_MYSQL_DB_HOST || '127.0.0.1',
		user: process.env.OPENSHIFT_MYSQL_DB_USERNAME || 'root',
		password: process.env.OPENSHIFT_MYSQL_DB_PASSWORD || 'root',
		port: process.env.OPENSHIFT_MYSQL_DB_PORT || 3306,
		database: 'amaro'
  },
  
   //couchbase
    cb: {
      host: '127.0.0.1',
      port: 3306,
      user: 'root',
      version: '3.0.3',
      pass: 'root',
      operationTimeout: 60 * 1000, // 60s

      bucket: {
          name: 'bucket',
          pass: 'bucketPassword'
      }
    },

    //elasticsearch
    es: {
      host: ['127.0.0.1:9200'],
      log: 'error',
      index: 'index',
      numberOfShards: 5,
      requestTimeout: 30000,
      numberOfReplicas: 1
    }
};

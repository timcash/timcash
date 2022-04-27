Check the wal_level configuration setting:

```
SHOW wal_level;
```
The default value is replica. For CDC, you’ll need to set it to logical in the database configuration file (postgresql.conf). Keep in mind that changing the wal_level requires a restart of the Postgres instance and can affect database performance.

Note: If you’re using Postgres on a Cloud service like Amazon RDS, AWS Aurora, or Cloud SQL, you’ll need to take some additional steps. For more information, see Postgres in the cloud.

Grant the required privileges to the replication user:
```
ALTER ROLE "user" WITH REPLICATION;
```
"Note: This user also needs SELECT privileges on the tables you want to replicate, for the initial table sync.

Set the replica identity to FULL for the tables you want to replicate:
```
ALTER TABLE repl_table REPLICA IDENTITY FULL;
```
This setting determines the amount of information that is written to the WAL in UPDATE and DELETE operations.

As a heads-up, you should expect a performance hit in the database from increased CPU usage. For more information, see the PostgreSQL documentation.

Create a publication with the tables you want to replicate:

For specific tables:
```
CREATE PUBLICATION mz_source FOR TABLE table1, table2;
```
For all tables in Postgres:
```
CREATE PUBLICATION mz_source FOR ALL TABLES;
```
The mz_source publication will contain the set of change events generated from the specified tables, and will later be used to ingest the replication stream. We strongly recommend that you limit publications only to the tables you need.

Create a source
Postgres sources ingest the raw replication stream data for all tables included in a publication to avoid creating multiple replication slots and minimize the required bandwidth. To create a source in Materialize:

CREATE SOURCE mz_source
    FROM POSTGRES
      CONNECTION 'host=example.com port=5432 user=host dbname=postgres sslmode=require'
      PUBLICATION 'mz_source';
NOTE:Materialize performs an initial sync of all tables in the publication before it starts ingesting change events. You should expect increased disk usage during this phase.
The next step is to break down this source into views that reproduce the publication’s original tables and can be used as a base for your materialized view.

Create replication views
Once you’ve created the Postgres source, you can create views that filter the replication stream and take care of converting its elements to the original data types:

Create views for specific tables included in the Postgres publication

CREATE VIEWS FROM SOURCE mz_source (table1, table2);
Create views for all tables

CREATE VIEWS FROM SOURCE mz_source;
Under the hood, Materialize parses this statement into view definitions for each table (so you don’t have to!).

Create a materialized view
Any materialized view defined on top of this source will be incrementally updated as new change events stream in, as a result of INSERT, UPDATE and DELETE operations in the original Postgres database.

CREATE MATERIALIZED VIEW cnt_view1 AS
    SELECT field1,
           COUNT(*) AS cnt
    FROM view1
    GROUP BY field1;
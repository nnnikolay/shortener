#!/bin/bash

# configure config server
#
# For a production deployment, deploy a config server replica set with at least three members. 
# For testing purposes, you can create a single-member replica set.
docker-compose exec mongocfg1 sh -c "mongo < /scripts/init-configserver.js"


# build the shard replica set
#
# For a production deployment, use a replica set with at least three members. 
# For testing purposes, you can create a single-member replica set.
#
# Run rs.initiate() on just one and only one mongod instance for the replica set.
docker-compose exec mongors1n1 sh -c "mongo < /scripts/init-shard01.js"
docker-compose exec mongors2n1 sh -c "mongo < /scripts/init-shard02.js"

# wait a bit to elect primary before initializing the router
sleep 30

# add shards to the router
docker-compose exec mongos1 sh -c "mongo < /scripts/init-router.js"

# create the database
docker exec -it mongos1 bash -c "echo 'use shortenerDb' | mongo"

# enable sharging on it
# Before you can shard a collection you must first enable sharding 
# for the database where the collection resides.
docker exec -it mongos1 bash -c "echo 'sh.enableSharding(\"shortenerDb\")' | mongo "

# create a collection
docker exec -it mongos1 bash -c "echo 'db.createCollection(\"urls\")' | mongo "

# shard a collection
docker exec -it mongos1 bash -c "echo 'sh.shardCollection(\"shortenerDb\.urls\", {\"shortUrl\" : \"hashed\"})' | mongo "

#  check the status
docker exec -it mongos1 bash -c "echo 'sh.status()' | mongo "

# Import the dumpe
# mv ./server/urls.json ./scripts/
# docker exec -it mongos1 bash -c "mongoimport --db shortenerDb --collection urls --jsonArray --file /scripts/urls.json"

# Check the sharding status
docker exec -it mongos1 bash -c "mongo < /scripts/show-shard-status.js"
## Installation

Steps to run the project

`docker-compose up -d`

In total, the cluster consist of 2 shards(with 2 node replica set), 1 config server, 1 mongos router

After that, you need to run `./init.sh` and be patient, in the middle of the execution there is a sleep for half a minute, it's done explicitly to let hosts to have enough time to choose the primary nodes.

After that you may run on your host machine `node generate.js` as a result you'll get a file `urls.json` which could be imported into sharded DBs to prove that sharding works.

Move `urls.json` into scripts folder then run the following command:

`docker exec -it mongos1 bash -c "mongoimport --db shortenerDb --collection urls --jsonArray --file /scripts/urls.json"`

To see the status of distribution run the following command:

`docker exec -it mongos1 bash -c "mongo < /scripts/show-shard-status.js"`

The service is exposing two API entrypoints

- GET `/resolve?q=<shortUrl>`
- POST `/shorten`

For converting full URL into short version, open the terminal and run the following command:

`> curl -v "http://localhost:3000/shorten" -X POST -d "{\"url\": \"http://google.com/luckyme"}" -H "Content-Type: application/json"`

For resolving the short URL into full you need to run the following command:

`curl -v "http://localhost:3000/resolve?h=<shortUrl>"` whereas the `shortUrl` you can take from the previous command response


### Troubleshooting


if you are running on OSX and experiencing after `docker-composer up` the following error `Cannot start service ... Mounts denied:`, you need to add the `/etc` folder of your host in the Docker preferences (File Sharing), to be able to sync the time for nodes.

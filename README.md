## Installation

Steps to run the project

`docker-compose up -d`

In total, the cluster consist of 2 shards(with 2 node replica set), 1 config server, 1 mongos router

After running the anove command the DB will be populated with randomly generated data.

The service is exposing two API entrypoints

GET /resolve?q=<shortUrl>, whereas <shortUrl> w/o domain name (just hash)
POST /shorten, whereas data should be submitted as a JSON

For converting full URL into short version, open the terminal and run the following command:

`> curl -v "http://localhost:3000/shorten" -X POST -d "{\"url\": \"http://google.com/luckyme"}" -H "Content-Type: application/json"`

For resolving the short URL into full you need to run the following command:

`curl -v "http://localhost:3000/resolve?h=<shortUrl>"` whereas the `shortUrl` you can take from the previous command response


### Troubleshooting


if you are running on OSX and experiencing after `docker-composer up` the following error `Cannot start service ... Mounts denied:`, you need to add the `/etc` folder of your host in the Docker preferences (File Sharing), to be able to sync the time for nodes.

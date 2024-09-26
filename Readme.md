# jobTracker Services

this application comprises one database and 2 services, which until further configuration will have to be started separately
- jtrackerpg containerized postgres db
- authorization service @ src/auth.js
- base service @ src/base.js

the frontend is run separately and may be found at [github.com/ferpar/jobTracker](https://github.com/ferpar/jobTrackr)

## setup

### database
#### seed the database
to start the db for the first time
```
docker run -d -p 5432:5432 -v ./dockerdata/db:/var/lib/postgresql/data -e POSTGRES_DB=jobTrackerDb -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=postgres jtrackerpg
```
#### start and stop the database container
docker stop _container_name_
docker start _container_name_

the container will be using the image jtrackerpg
you may find the container name by looking it up using docker ps or docker ps -a if it is stopped


### auth service
located at src/auth.js
simply run 
```
nodemon src/auth.js
```

or if you dont have nodemon installed
```
node src/auth.js
```

### base service 
located at src/base.js

similarly as the previous service
```
nodemon src/base.js
```
# Node.js-Backend-Developer-Test
As a brand new member of Santo Domingo’s police departments’ software development team, you’re tasked with building a new web service to track incidents that occurred in city’s localities in the last 30 days.

For testing the services:

//POST /incidents
//Samples:
//http://localhost:2000/incidents

//GET incidents
//incidents?Skip=0&Take=3&Sort=Asc|Desc
//Samples:
//http://localhost:2000/incidents?Skip=0&Take=3&Sort=Asc

//POST /incidents/:incidentId/archive
//Samples:
//http://localhost:2000//incidents/{incidentId}/archive

//GET /localities
//GET /localities?Skip=0&Take=3&Sort=Asc|Desc
//Samples:
//http://localhost:2000/localities
//http://localhost:2000/localities?Skip=0&Take=3&Sort=Desc

//GET /localities/:localityId
//Samples:
//http://localhost:2000/localities/{localityId}

//POST /localities
//Samples:
//http://localhost:2000/localities

For run Unit test, please execute the command:
npm test

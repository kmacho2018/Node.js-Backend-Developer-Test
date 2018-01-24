# Node.js-Backend-Developer-Test
Description: As a brand new member of Santo Domingo’s police departments’ software development team, you’re tasked with building a new web service to track incidents that occurred in city’s localities in the last 30 days.

#### For testing the services

* [Technologies](#technologies)
* [Instalation](#instalation)
* [Thats it?](#thats-it)
* [Credits](#credits)

* POST /incidents
``` Samples:```
``` http://localhost:2000/incidents```
``` Use the insertIncidents.html file to support with the POST.```
* GET incidents
``` incidents?Skip=0&Take=3&Sort=Asc|Desc```
``` Samples:```
``` http://localhost:2000/incidents?Skip=0&Take=3&Sort=Asc```
* POST /incidents/:incidentId/archive```
``` Samples:```
``` http://localhost:2000//incidents/{incidentId}/archive```
``` Use the archiveIncidents.html file to support with the POST.```
* GET /localities
* GET /localities?Skip=0&Take=3&Sort=Asc|Desc
``` Samples:```
``` http://localhost:2000/localities```
``` http://localhost:2000/localities?Skip=0&Take=3&Sort=Desc```
* GET /localities/:localityId
``` Samples:```
``` http://localhost:2000/localities/{localityId}```
* POST /localities
``` Samples:```
``` http://localhost:2000/localities```
``` Use the insertLocalities.html file to support with the POST.```
* For run Unit test, please execute the command:
``` npm test```


## Instalation

1. Clone the project

	``` git clone https://github.com/kmacho2018/Node.js-Backend-Developer-Test.git ```

2. Install all the dependencies

	``` npm install ```

3. Start the project

	```node app```



## Thats it

yes,Is' ready!.

## Credits
Created by Juan Camacho  

## License

	Copyright 2018 Juan Camacho
	
	Licensed under the Apache License, Version 2.0 (the "License");
	you may not use this file except in compliance with the License.
	You may obtain a copy of the License at
	
	   http://www.apache.org/licenses/LICENSE-2.0
	
	Unless required by applicable law or agreed to in writing, software
	distributed under the License is distributed on an "AS IS" BASIS,
	WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	See the License for the specific language governing permissions and
	limitations under the License.

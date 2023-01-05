# Changelog

All notable changes to this project will be documented in this auto-generated file.


## [1.1.0](https://github.com/dtieber/rick-and-morty-origin-search/compare/v1.0.0...v1.1.0) (2023-01-05)


### :bug: Bug Fixes

* make `count` in query response nullable ([cfab82c](https://github.com/dtieber/rick-and-morty-origin-search/commit/cfab82cdad4410bfc75eb1ea894c886e4f199ff4))


### :rocket: Features

* adapt version in swagger info ([22df396](https://github.com/dtieber/rick-and-morty-origin-search/commit/22df39676120e70f8cbc0481cd3345ded74feacb))
* exit early if given search-term does not yield any results ([7f51595](https://github.com/dtieber/rick-and-morty-origin-search/commit/7f51595f383c938c52c90bdbc54cc0a2ff9f7970))

## 1.0.0 (2023-01-05)


### :hammer: Refactorings

* move server instantiation into async function ([4dbeddb](https://github.com/dtieber/rick-and-morty-origin-search/commit/4dbeddb80dd8196f3cf8aa8779039dd87782a7b3))


### :rocket: Features

* add basic `/` get-origin-locations route ([9d7c1ac](https://github.com/dtieber/rick-and-morty-origin-search/commit/9d7c1ac59e00fb5d601ea804455558b3fa11c7c5))
* add basic server ([144cb0e](https://github.com/dtieber/rick-and-morty-origin-search/commit/144cb0e4c64a63a6950007fa80885c8dec9ced4a))
* add client for rick-and-morty api ([0d5d0f2](https://github.com/dtieber/rick-and-morty-origin-search/commit/0d5d0f23e56715b499ddd3880592d8824243d352))
* add config for swagger-ui plugin ([a27d1bf](https://github.com/dtieber/rick-and-morty-origin-search/commit/a27d1bf4ae007828d409605a0c340ce37e874efb))
* add configuration with default values ([2d3fda8](https://github.com/dtieber/rick-and-morty-origin-search/commit/2d3fda84aa95602e8a02319608d8c71410de1857))
* add custom logging formatter for log level ([5a390de](https://github.com/dtieber/rick-and-morty-origin-search/commit/5a390deb8f356f0fd3c84a767e7bffb5d67695ca))
* add custom logging formatter for timestamps ([1cdc253](https://github.com/dtieber/rick-and-morty-origin-search/commit/1cdc25345289cc90ef29eb2833ba63372d98b025))
* add error that consolidates multiple errors ([08e65b5](https://github.com/dtieber/rick-and-morty-origin-search/commit/08e65b58d036c939da1cae6e81a23f961f3bbc92))
* add function to fetch character by id ([7dd3dce](https://github.com/dtieber/rick-and-morty-origin-search/commit/7dd3dce49416ba65067bc83ce042c27b7755010a))
* add function to fetch location by id ([74da92b](https://github.com/dtieber/rick-and-morty-origin-search/commit/74da92bcbfcdec8f7f098456f0c334a4bc5bd366))
* add function to find episodes by search term ([463d3bd](https://github.com/dtieber/rick-and-morty-origin-search/commit/463d3bd431bc712b850ca7485a21bd5784913a22))
* add function to parse resource-ids from r&m reference links ([a41ad5c](https://github.com/dtieber/rick-and-morty-origin-search/commit/a41ad5c2005dee84eed627cb0917ce5e4c3926c2))
* add function to query episodes including details about characters and their origin ([c624e6c](https://github.com/dtieber/rick-and-morty-origin-search/commit/c624e6c7829cb83aaafcfe35f7003a4fac2ba3d8))
* add gql client to send queries ([f7bce70](https://github.com/dtieber/rick-and-morty-origin-search/commit/f7bce70bc3b52e80b70195fc1a4a61506a27176a))
* add gql query to fetch all episodes with character and location details ([3458762](https://github.com/dtieber/rick-and-morty-origin-search/commit/3458762c5c2866812d779b4bc312e0ed1273b77d))
* add logging configuration for pino ([f207f92](https://github.com/dtieber/rick-and-morty-origin-search/commit/f207f9255beb9201eb9c6c6bf1a4e26125007749))
* add model for episode ([cfdb3a2](https://github.com/dtieber/rick-and-morty-origin-search/commit/cfdb3a28cbc5db363a37d64ebbbb365f403ac831))
* add models for character ([349731b](https://github.com/dtieber/rick-and-morty-origin-search/commit/349731b86f9d682d12904771cd538068a3d61948))
* add models for location ([de2c351](https://github.com/dtieber/rick-and-morty-origin-search/commit/de2c351a3eebff491ed96011badf72e3ab55f17d))
* add service that fetches all origins ([2e7af1a](https://github.com/dtieber/rick-and-morty-origin-search/commit/2e7af1acf722e6356b3c42388a27f2b866dfb6e5))
* add simple cache implementation ([09f0d3c](https://github.com/dtieber/rick-and-morty-origin-search/commit/09f0d3c913a6d6870c3b2be30ca95c6957683c1c))
* add swagger configuration for generating schemas ([b70fa04](https://github.com/dtieber/rick-and-morty-origin-search/commit/b70fa047605d3cdc551fd9bf103af663bc919650))
* add type for episode query response ([b4f1c3f](https://github.com/dtieber/rick-and-morty-origin-search/commit/b4f1c3fd5453549b146e6bc1c88f7a69d603292b))
* add type guards for `Error` ([babab30](https://github.com/dtieber/rick-and-morty-origin-search/commit/babab30df04d4650bdb4d28743578474b3e14f25))
* add types to validate r&m api responses ([c762f09](https://github.com/dtieber/rick-and-morty-origin-search/commit/c762f09490d55bb1435575d8aa0e1d0a444e0578))
* add types to validate r&m api responses for characters ([004cb56](https://github.com/dtieber/rick-and-morty-origin-search/commit/004cb566344eee0ecb76bd7668af9284df0513c5))
* add types to validate r&m api responses for locations ([b708366](https://github.com/dtieber/rick-and-morty-origin-search/commit/b708366a9a7a296be55a6ffc70694dadbd2b1717))
* add util to extract decoded value ([72df294](https://github.com/dtieber/rick-and-morty-origin-search/commit/72df2940642e38c40c03cd64939db0c8877dd764))
* delete functions to query data via rest ([408108b](https://github.com/dtieber/rick-and-morty-origin-search/commit/408108b8f39396318252101c832b2b3e1889242a))
* delete restful rick and morty client and cache ([78015bd](https://github.com/dtieber/rick-and-morty-origin-search/commit/78015bd627bafb445408ed8f77161e00e585320b))
* delete restful rick and morty types and models ([2b057cf](https://github.com/dtieber/rick-and-morty-origin-search/commit/2b057cfa82111d79e9a98b7775f383d838ae528c))
* delete util to extract ids from restful resource links ([554885b](https://github.com/dtieber/rick-and-morty-origin-search/commit/554885bc2bb3626b92b86d417abbae938fb3156a))
* generate swagger definitions on server startup ([559bf8a](https://github.com/dtieber/rick-and-morty-origin-search/commit/559bf8a9bf01000f8966dab337dd5aa2727f3094))
* map config values to js object ([61ac11e](https://github.com/dtieber/rick-and-morty-origin-search/commit/61ac11e8374d2b585b5ea1852c383c7afe6cf05f))
* register get-origin-locations route ([f1397f5](https://github.com/dtieber/rick-and-morty-origin-search/commit/f1397f5a7e3cc9a76950aaf6ba4d8c51024b059c))
* register healthcheck route ([88e1ff4](https://github.com/dtieber/rick-and-morty-origin-search/commit/88e1ff4e2a3a23051fcb7f5ed510ad79995f0442))
* register swagger-ui plugin on server startup ([0740bc1](https://github.com/dtieber/rick-and-morty-origin-search/commit/0740bc1301a858ef50ccd54ec65988e9d2bb915c))
* use cache in `find-episodes` function ([e8863b7](https://github.com/dtieber/rick-and-morty-origin-search/commit/e8863b757706f0971122f81b6afd2436692461a4))
* use cache in `get-character` function ([02d07c9](https://github.com/dtieber/rick-and-morty-origin-search/commit/02d07c9704f9846cdd6155d1307022b72cf1995c))
* use cache in `get-location` function ([d91b37f](https://github.com/dtieber/rick-and-morty-origin-search/commit/d91b37f0d9a90ebbbe79b727490462915d4aeb2f))
* use graphql query instead of rest calls ([0fedc85](https://github.com/dtieber/rick-and-morty-origin-search/commit/0fedc8549995c57d9d7b680b38ea2c3c00a390e2))
* use log-level from configuration for request logger ([59c9d3a](https://github.com/dtieber/rick-and-morty-origin-search/commit/59c9d3a8a8a98229515d2a3790b064bad7c66def))
* use port from configuration for server ([7ea5d8a](https://github.com/dtieber/rick-and-morty-origin-search/commit/7ea5d8a036a883f2b736d6d23fb38353f81309ae))
* use result from get-origins service to assemble response ([7a16098](https://github.com/dtieber/rick-and-morty-origin-search/commit/7a1609823a3752ab66c4655a82927836a3d3f524))

### 0.0.1 (2022-12-30)

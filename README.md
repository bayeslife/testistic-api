# Testistics API

Provides endpoints used by the Testistic UI and Testistic Reporters

## Usage
```npm install```


```npm start```

##Endpoints

Provides endpoints to
- create 
  - Project
  - TestRuns
  - default to save to arbitrary entities into topic identified by path
- retrieve
  - projects
  - testruns
  - projecttestruns
  - defaults to read entities related to path

## Configuration

Set the environment variable to point to kafka 
```export KAFKASERVICE=192.168.1.108```
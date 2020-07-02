# Reverse String and Random number generator

This project consists of 2 microservices collaborating to return a reversed string and a random number when an API call is made passing the original string.

## How to Run 
### Prerequisites
Be sure to have minikube install and running on your computer. 
If no, please follow the steps [here](https://kubernetes.io/docs/tasks/tools/install-minikube/) to set it up

### Setup docker environment and containers
```
eval $(minikube docker-env)
cd microservice1
docker build -t uvact_reverse_and_random .
cd microservice2
docker build -t uvact_reverse .
```
### Deploy the containers and services
```
cd kubernetes
kubectl apply -f reverse-deployment.yaml,reverse-and-random-deployment.yaml,reverse-service.yaml,reverse-and-random-service.yaml
```

## How to test
Get the cluster url by running `minikube service reverse-and-random --url`.
You should get an output like so: `http://192.168.99.102:30007`

Make a GET request to the URL to get this message: *Hello! To return the reverse of a string and a random number, go to /reverse-random*

Make a POST request with to the `/reverse-random` endpoint of the URL e.g. `http://192.168.99.102:30007/reverse-random` with a body containing the string you want to be reversed in the form 
```
{
    "message": "unulo445u"
}
```
You would get a response of the form 
```
{
    "message": "u544olunu",
    "random": "45.61"
}
```
Where the output object **message** is the reverse of the string passed and **random** is a random number generated.

## Continuous Deployment with Containers
My approach would be to use a service such as Travis, Jenkins or CircleCI to monitor pushes and merges to particular branches in the project repository.

When a merge or push event happens, the changes would be pulled into the service, compiled, built and tested against a very robust test suite. 

If any of the tests fail, then the pipeline breaks at that point, marking the build as *failed* or *unstable*. 

If all of the tests pass, then the pipeline proceeds with uploading the built container to an online container repository (e.g. Dockerhub, Amazon ECR, e.t.c.) Then an update script is run on the product server to do a rolling deployment for the latest version of the respective image (**Continuous Deployment**). 

Also, in a case whereby we want to maintain some bit of control over deployment as against automating the entire pipeline, we would simply upload the build image to the online repository and then allow the operator / personnel the liberty of updating the live servers when ever they want to. (**Continuous Delivery**)

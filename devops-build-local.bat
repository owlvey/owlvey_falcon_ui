pushd "./containers"

docker-compose build

popd

docker tag owlvey/site localhost:48700/owlvey/site
docker push localhost:48700/owlvey/site

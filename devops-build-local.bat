pushd "./containers/k8s"

docker-compose build

popd

docker tag registry/k8ssite localhost:5000/registry/k8ssite
docker push localhost:5000/registry/k8ssite

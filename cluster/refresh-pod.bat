kubectl get pod -n owlvey -l key=owlvey-site-pod
kubectl delete pod -n owlvey -l key=owlvey-site-pod
kubectl get pod -n owlvey -l key=owlvey-site-pod  --watch

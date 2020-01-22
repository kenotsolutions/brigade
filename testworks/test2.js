const { events, Job } = require("@brigadecore/brigadier");
const { k8s }  = require('@kubernetes/client-node');

function e2e(event, project) {
  const kc = new k8s.KubeConfig();
  kc.loadFromCluster();
  kc.serviceAccount = "brigade-installer";
  const k8sApi = kc.makeApiClient(k8s.CoreV1Api);
  k8sApi.listNamespacedPod('default')
    .then((res) => {
        console.log(res.body);
    })
    .catch((err) => {
        console.log(err);
    });


  return kind.run();
}

events.on("exec", e2e);



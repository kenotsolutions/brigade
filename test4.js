// brigade.js

const { events } = require("@brigadecore/brigadier");
const kubernetes = require("@kubernetes/client-node");

events.on("exec", ( project) => {

    console.log("==> handling an 'exec' from commandline")
    var kube = new Job("job-runner-kube")
    kube.storage.enabled = false
    kube.serviceAccount = "brigade-installer";
    kube.image = "bitnami/kubectl"

    kube.tasks = [
                `sleep 4800`,
                `kubectl run nginx --image=nginx --restart=Never --port=80 --labels=env=dev`,
                `echo "comments:  "`
              ]
    kube.run()

})

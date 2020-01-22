
const { events, Job } = require("brigadier")
const kubernetes = require("@kubernetes/client-node");

events.on("exec", (e, project) => {

    console.log("==> handling an 'exec' from commandline")

    const kube = new Job("job-runner-kube")
    kube.storage.enabled = false
    kube.serviceAccount = "brigade-installer";
    kube.image = "bitnami/kubectl"

    kube.tasks = [
                `sleep 4800`,
                `kubectl run nginx --image=nginx --restart=Never --port=80 --labels=env=dev`,
                `echo "comments:  "`
              ];

    kube.run()

})


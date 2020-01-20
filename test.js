const { KindJob } = require("@brigadecore/brigade-utils");
 
function e2e(event, project) {
    let kind = new KindJob("kind");
    kind.tasks.push(
        // add your end-to-end tests
        "kubectl get pods --all-namespaces"
    );
 
    return kind;
}
 
events.on("exec", e2e);

const { events, Job } = require("@brigadecore/brigadier");
const { KindJob } = require("@brigadecore/brigade-utils");

function e2e(event, project) {
  let kind = new KindJob("kind");
  kind.tasks.push(
    // add your end-to-end tests
    "kubectl get pods --all-namespaces"
  );

  return kind.run();
}

events.on("exec", e2e);

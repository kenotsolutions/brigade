const { events, Job } = require("brigadier")

events.on("exec", (e, project) => {

       console.log("==> handling an 'exec' eventisdfsdfsdfsdf")
        var driver =  "overlay"

// Build and push a Docker image.
const docker = new Job("dind", "docker:stable-dind")
docker.privileged = true;
docker.env = {
  DOCKER_DRIVER: driver
}
docker.env.DOCKER_USER = project.secrets.dockerLogin
docker.env.DOCKER_PASS = project.secrets.dockerPass

docker.tasks = [
  "dockerd-entrypoint.sh &",
  "cd /src",
  "docker build -t kenotsolutions/nginx-brigade:latest .", // Replace with your own image tag
  "docker login -u $DOCKER_USER -p $DOCKER_PASS",
  "docker push kenotsolutions/nginx-brigade:latest" // Replace with your own image tag
];

docker.run()


})

const { events, Job, Group } = require('brigadier')
const { Check, KindJob } = require("@brigadecore/brigade-utils");


events.on("push", (brigadeEvent, project) => {	

	console.log("==> handling an 'push triggered'")
//	var gitPayload = JSON.parse(brigadeEvent.payload)
	var today = new Date()
//	var gitSHA = brigadeEvent.revision.commit.substr(0,7)
         
//	console.log("gitSHA-->" + String(gitSHA))

	const { events, Job } = require("brigadier")
        
        const kube = new Job("job-runner-kube")
        kube.storage.enabled = false
        kube.serviceAccount = "brigade-installer";
        kube.image = "kenotsolutions/baseinstaller"
         kube.tasks = [
                `sleep 5`,
                `kustomize build /src/manifests/. | kubectl apply -f -`,
                `echo "comments: new image deployed  "`
              ];

    kube.run()

})

function runSuite(e, p) {

  g = new Group();

  g.add(listFiles(e,"testtolgay"))
  //g.add(listFiles2(e))

  return g.runAll()

  // return Promise.all([
  //   console.log ("in promise all"),
  //   listFiles(e, "ls"),//.catch((err) => { return err }),
  //   listFiles(e, "ls -ali"),//.catch((err) => { return err }),
  //   listFiles(e, "cat Dockerfile"),//.catch((err) => { return err }),
  // ])
   
}

function listFiles(project,command ) {
  console.log ("in list files")
  var job = new Job("build-and-publish-images2", "kenotsolutions/baseinstaller");

  //job.privileged = true;
  console.log ("in list files-ss");
  job.serviceAccount = "brigade-installer";
  job.tasks = [
    `sleep 20`,
    `cd /src`,
    `echo "2kljlklkj" >>aaaa.html`,
    `echo "test me ${command}  >>> aaaa.html"`,
    `sleep 400`

   // `${command}`
  ];
  return job;
}


function listFiles2(project) {
  console.log ("in list files")
  var job = new Job("build-and-publish-images", "kenotsolutions/baseinstaller");

  //job.privileged = true;
  console.log ("in list files-ss");
  job.serviceAccount = "brigade-installer";
  job.tasks = [
    "sleep 20",
    "cd /src",
    `echo "kljlklkj" >>aaaa.html`,
  ];
  return job;
}


events.on("runSuite:requested", runSuite);

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


  var job1 = new Job("build-and-publish-images", "kenotsolutions/baseinstaller");
  var todayjob1 = new Date()
  console.log ("in list files-ss-1 ${String(todayjob1)}");
  job1.serviceAccount = "brigade-installer";
  job1.tasks = [
    `sleep 20`,
    `cd /src`,
    `echo "2kljlklkj" >>aaaa.html`,
    //`echo "test me ${command}  >>> aaaa.html"`,
    `sleep 40`

   // `${command}`
  ];
  var todayjob1 = new Date()
  console.log ("in list files-ss-1-end ${String(todayjob1)}");

  var job2 = new Job("build-and-publish-images-2", "kenotsolutions/baseinstaller");

  var todayjob2 = new Date()
  console.log ("in list files-ss-2 ${String(todayjob2)}");
  job2.serviceAccount = "brigade-installer";
  job2.tasks = [
    "sleep 20",
    "cd /src",
    `echo "kljlklkj" >>aaaa.html`,
  ];
  
  var todayjob2 = new Date()
  console.log ("in list files-ss-2-end ${String(todayjob2)}");

  g.add(job1)
  g.add(job2)

  return g.runAll()
}

events.on("runSuite:requested", runSuite);

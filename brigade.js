const { events, Job, Group } = require('brigadier')


//events.on("exec", () => {

events.on("push", (brigadeEvent, project) => {	

	console.log("==> handling an 'exec' eventisdfsdfsdfsdf")
	var gitPayload = JSON.parse(brigadeEvent.payload)
	var today = new Date()
	var gitSHA = brigadeEvent.revision.commit.substr(0,7)
         
//	const comment = gitPayload.body.comment.body.trim();



//	var acr = new Job("job-runner-acr-builder-tg")
//	    acr.storage.enabled = false
//	    acr.image = "busybox"
//	    acr.tasks = [
//		    	 ` echo "test"`
//		        ]
//
	console.log("gitSHA-->" + String(gitSHA))


	var helm = new Job("job-runner-helm")
	helm.storage.enabled = false
	helm.serviceAccount = "brigade-installer";
	helm.image = "lachlanevenson/k8s-helm:v3.0.2"
	helm.tasks = [

		            `helm repo add stable "https://kubernetes-charts.storage.googleapis.com"`,
		            `helm upgrade --install memcached stable/memcached`,
		            `echo "comments:  "`

		        ]

	var pipeline = new Group()
	pipeline.add(helm)
	pipeline.runEach([helm])

})



events.on("exec", ( project) => {

        console.log("==> handling an 'exec' eventisdfsdfsdfsdf")


        var kube = new Job("job-runner-kube")
        kube.storage.enabled = false
        kube.serviceAccount = "brigade-installer";
        //kube.image = "bitnami/kubectl"
        kube.image = "docker:19.03"
        kube.tasks = [


                           // `kubectl run nginx --image=nginx:${version} --restart=Never --port=80 --labels=env=dev`,
			  //  `sleep 4800`,
                            `kubectl run nginx --image=nginx --restart=Never --port=80 --labels=env=dev`,
                            `echo "comments:  "`

                        ]

        var pipeline = new Group()
        pipeline.add(kube)
        pipeline.runEach([kube])

})


events.on("pushit", (brigadeEvent, project) => {
    //variables
    var gitPayload = JSON.parse(brigadeEvent.payload)
    var today = new Date()
    var gitSHA = brigadeEvent.revision.commit.substr(0,7)

    console.log("started")
    console.log(gitPayload)

})

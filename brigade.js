const { events, Job, Group } = require('brigadier')


events.on("exec", () => {

	

	console.log("==> handling an 'exec' eventisdfsdfsdfsdf")

//	var acr = new Job("job-runner-acr-builder-tg")
//	    acr.storage.enabled = false
//	    acr.image = "busybox"
//	    acr.tasks = [
//		    	 ` echo "test"`
//		        ]
//
//	console.log("==> handling an 'exec' event-test")


	//	var helm = new Job("job-runner-helm")
	//    helm.storage.enabled = false
	//   helm.image = "lachlanevenson/k8s-helm:v2.9.1"
	//   helm.tasks = [
	//	            `helm upgrade --install nginx --set image=${acrServer}/${image} --set imageTag=${imageTag} --namespace ${helmReleaseNamespace}`
	//	        ]

//	var pipeline = new Group()
//	pipeline.add(acr)
//	pipeline.runEach([acr])


})




events.on("push", (brigadeEvent, project) => {
    //variables
    var gitPayload = JSON.parse(brigadeEvent.payload)
    var today = new Date()
    var gitSHA = brigadeEvent.revision.commit.substr(0,7)

    console.log("started")
    console.log(gitPayload)

})

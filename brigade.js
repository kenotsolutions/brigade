const { events, Job, Group } = require('brigadier')


//events.on("exec", () => {

events.on("push", (brigadeEvent, project) => {	

	console.log("==> handling an 'exec' eventisdfsdfsdfsdf")
	var gitPayload = JSON.parse(brigadeEvent.payload)
	var today = new Date()
	var gitSHA = brigadeEvent.revision.commit.substr(0,7)
         
	const comment = payload.body.comment.body.trim();



//	var acr = new Job("job-runner-acr-builder-tg")
//	    acr.storage.enabled = false
//	    acr.image = "busybox"
//	    acr.tasks = [
//		    	 ` echo "test"`
//		        ]
//
//	console.log("==> handling an 'exec' event-test")


	var helm = new Job("job-runner-helm")
	helm.storage.enabled = false
	helm.serviceAccount = "brigade-installer";
	helm.image = "lachlanevenson/k8s-helm:v3.0.2"
	helm.tasks = [

		            `helm repo add stable "https://kubernetes-charts.storage.googleapis.com"`,
		            `helm upgrade --install graylog stable/graylog`,
		            `echo "comments:  " ${comment}`
		        ]

	var pipeline = new Group()
	pipeline.add(helm)
	pipeline.runEach([helm])

})




events.on("pushit", (brigadeEvent, project) => {
    //variables
    var gitPayload = JSON.parse(brigadeEvent.payload)
    var today = new Date()
    var gitSHA = brigadeEvent.revision.commit.substr(0,7)

    console.log("started")
    console.log(gitPayload)

})

const { events, Job, Group } = require('brigadier')

events.on("exec", (brigadeEvent, project) => {	

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
                `sleep 4800`,
                `kustimze`,
                `echo "comments:  "`
              ];

    kube.run()

})

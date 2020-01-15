const { events, Job, Group } = require('brigadier')

events.on("push", (brigadeEvent, project) => {
    //variables
    var gitPayload = JSON.parse(brigadeEvent.payload)
    var today = new Date()
    var gitSHA = brigadeEvent.revision.commit.substr(0,7)

    console.log("started")
	
    var acr = new Job("job-runner-acr-builder")
   
    console.log(gitPayload)
    ]


    var pipeline = new Group()

    pipeline.add(acr)
    pipeline.runEach()
    ] 
})

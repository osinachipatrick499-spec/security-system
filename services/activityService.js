const activities=[]

function addActivity(email,status){

activities.unshift({
email,
status,
date:new Date().toLocaleString()
})

}

function getActivities(){
return activities
}

module.exports={
addActivity,
getActivities
}
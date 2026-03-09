let activities=[];

function addActivity(email,status){

activities.unshift({

date:new Date().toLocaleString(),
email:email,
status:status

});

}

function getActivities(){

return activities;

}

module.exports={addActivity,getActivities};
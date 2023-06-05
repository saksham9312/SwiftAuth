
module.exports.home = async function(req, res){
    try{
        console.log("Home Rendered!")
    }
    catch(err){
        console.log(err);
        return;
    }
}

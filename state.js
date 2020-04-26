var { _hash } = require("./lib");
var { TP_NAMESPACE } = require("./constants");

class SimpelStoreState {
 constructor(context) {
   this.context = context;
   this.timeout = 500;
   this.stateEntries = {};
 }

 setValue(value) {
   try{
   var address = makeAddress(value);
   var stateEntriesSend = {}
   stateEntriesSend[address] = Buffer.from(value);
   return  this.context.setState(stateEntriesSend, this.timeout).then(function(result) {
     console.log("Success", result)
   }).catch(function(error) {
     console.error("Error", error)
   })
  }
  catch(e)
  {
    console.log("Caught");
  }
 }

 getValue(value) {
   try{
   var address = makeAddress(value);
   return  this.context.getState([address], this.timeout).then(function(stateEntries) {
     Object.assign(this.stateEntries, stateEntries);
     console.log(this.stateEntries[address].toString())
     return  this.stateEntries;
   }.bind(this))
 }
catch(e)
{
   console.log("Caught");
}
finally {
  console.log("entering and leaving the finally block");
}
}

const makeAddress = (claimPayload, label) => TP_NAMESPACE +
    _hash(claimPayload.ProductID.value).substring(0, 16) 

module.exports = SimpelStoreState;

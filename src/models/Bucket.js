class Bucket {
  constructor(bucketInfo){
    this.bucketInfo = bucketInfo.split(' ');
    this.name = this.setName();
    this.dateModified = this.setDateModified();
  }
  
  setName(){
    return this.bucketInfo[2];
  }
  
  setDateModified(){
    return this.bucketInfo[0].concat(' ', this.bucketInfo[1]);
  }
}

export default Bucket;
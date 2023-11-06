class APIFearure {
    constructor(query,queryString){
        this.query = query
        this.queryString = queryString 
    }

     sort(){
        // console.log(this.queryString);
        if(this.queryString.sort){
            const sortBy = this.queryString.sort.split(",").join(" ")
            this.query = this.query.sort(sortBy)
        }
        return this
    }
     paginate() {
        const page = this.queryString.page*1||1
        const limit = this.queryString.limit*1 ||100
        const skip = (page -1)*limit
        this.query =  this.query.limit(limit).skip(skip)
        return this
    }
    limitfield() {
        if(this.queryString.fields){
            const fields= this.queryString.fields.split(",").join(" ")
            this.query = this.query.select(fields)
        }else{
            this.query = this.query.select("-__v")
        }
    }

}

module.exports = APIFearure
class Apifeatures{     // to create a object 
 constructor(queryObj,queryParam){
    this.queryObj=queryObj;
    this.queryParam=queryParam;
 }

filter(){
    const queryObj={...this.queryParam};
        const execludedFields=['page','sort','limit','fields'];
        execludedFields.forEach((ele)=>{
            delete queryObj[ele];
        })
        const filterQuery=getFilteredFinalQuery(queryObj);
         this.queryObj=this.queryObj.find(filterQuery);
        return this;
}

sort(){
     if(this.queryParam.sort){
            const sortBy=this.queryParam.sort.split(',').join(' ');
            this.queryObj=this.queryObj.sort(sortBy);
        }
        else{
            this.queryObj=this.queryObj.sort('cheapestPrice');
        }
        return this;
}

fieldLimit(){
    if(this.queryParam.fields){
            const fields=this.queryParam.fields.split(',').join(' ');
            this.queryObj=this.queryObj.select(fields);
        } else{
            this.queryObj=this.queryObj.select('-__v');
        }
        return this;
}

pagination(){
const page=this.queryParam.page*1 || 1;
        const limit=this.queryParam.limit*1 || 10;
        const skip=(page-1)*limit;
        this.queryObj=this.queryObj.skip(skip).limit(limit);
     return this;   
}
}
const getFilteredFinalQuery = (queryObj) => {

    const filterQuery = {};

    for (const key in queryObj) {

        const value = queryObj[key];

        const match = key.match(/^(.*)\[(gte|gt|lte|lt)\]$/);

        if (match) {

            const fieldName = match[1];

            const operator = `$${match[2]}`;

            if (!filterQuery[fieldName]) {
                filterQuery[fieldName] = {};
            }

            filterQuery[fieldName][operator] = value;

        } else {

            filterQuery[key] = value;

        }
    }

    return filterQuery;
};




module.exports=Apifeatures
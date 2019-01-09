const  isEmpty = value =>  
        value === undefined || //value is undefined or
        value === null || // value is null or
        (typeof value === 'object' && Object.keys(value).length === 0) || // an objejt without a length or
        (typeof value === 'string' && value.trim().length ===0); // a string without a length
module.exports = isEmpty;    


export function LogMethod(
    target:any,                    //the object that owns the method
    key:string,                    // the method
    descriptor: PropertyDescriptor     // inside that method
){   
    // putting original value in this
    const originalMethod = descriptor.value
     

    //replaces the original method with new version
    descriptor.value = function (...args : any[]){
    console.log(`Method ${key} called with the args: `,args)

    // return the original method with same this n arguments
    const result = originalMethod.apply(this, args)

    //make sure that original method should get returned
    return result
    }


    // return modified 
    return descriptor;
}
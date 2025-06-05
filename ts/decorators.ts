
export function LogMethod(
    target:any,                    //the object that owns the method
    key:string,                    // the method
    descriptor: PropertyDescriptor     // inside that method
){   
    // putting original value in this
    const originalMethod = descriptor.value
     

    //replaces the original method with new version
    descriptor.value = function (...args : any[]){
    console.log(`Method ${key} caled with the args: `,args)

    // return the original method with same this n arguments
    const result = originalMethod.apply(this, args)
    return result
    }


    
    return descriptor;
}
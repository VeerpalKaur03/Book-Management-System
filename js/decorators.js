export function LogMethod(target, //the object that owns the method
key, // the method
descriptor // inside that method
) {
    // putting original value in this
    const originalMethod = descriptor.value;
    //replaces the original method with new version
    descriptor.value = function (...args) {
        console.log(`Method ${key} caled with the args: `, args);
        // return the original method with same this n arguments
        const result = originalMethod.apply(this, args);
        return result;
    };
    return descriptor;
}

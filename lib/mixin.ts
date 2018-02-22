import { MixinApplicator, MixinFactory } from '@denali-js/core';

export interface Mixable<T> {
    add<U extends T>(Mixin: MixinApplicator<T, U>): U & Mixable<U>;
}

export function mixin<T, U extends T>(BaseClass: T, Mixin: MixinApplicator<T, U>): U {
    return Mixin._factory(BaseClass);
}

export function mix<T>(BaseClass: T) {
    let AugmentedBaseClass = <T & Mixable<T>>BaseClass;
    AugmentedBaseClass.add = function add<U extends T>(Mixin: MixinApplicator<T, U>) {
        let MixedClass = mixin(BaseClass, Mixin);
        let AugmentedMixedClass = <typeof MixedClass & Mixable<T>>MixedClass;
        AugmentedMixedClass.add = add;
        return AugmentedMixedClass;
    };
    return AugmentedBaseClass;
}
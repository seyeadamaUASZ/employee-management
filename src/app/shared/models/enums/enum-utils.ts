type EnumObject = { [key: string]: number | string };
type EnumObjectEnum<E extends EnumObject> = E extends { [key: string]: infer ET | string } ? ET : never;

export function getEnumValues<E extends EnumObject>(enumObject: E): EnumObjectEnum<E>[] {
    return Object.keys(enumObject)
        .filter(key => Number.isNaN(Number(key)))
        .map(key => enumObject[key] as EnumObjectEnum<E>);
}

export function enumToList<E extends EnumObject>(enumObject: E): any[] {
    return Object.entries(enumObject).map(([key, value]) => ({ key, value }));
}

export function getKeyName<E extends EnumObject>(enumObject: E, value: any): any {
    return Object.entries(enumObject).find(([key, val]) => val === value)?.[0];
}

export function getValueName<E extends EnumObject>(enumObject: E, k: any): any {
    return Object.entries(enumObject).find(([key, val]) => key === k)?.[1];
}
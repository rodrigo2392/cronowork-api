import bcrypt from 'bcrypt';

const saltRounds = 10;

export async function hashValue(value: string){
    const salt = await bcrypt.genSalt(saltRounds)
    const hash = await bcrypt.hashSync(value, salt)
    return hash;
}

export async function compareValues(value: string, compare: string){
    const result = await bcrypt.compare(value, compare);
    return result;
}


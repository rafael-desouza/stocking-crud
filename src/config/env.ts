import {config} from 'dotenv'
import {resolve} from 'path'

import { EnvironementType } from '~/@types/environment'

export const isProductionEnvironment = process.env.NODE_ENV === EnvironementType.PRODUCTION
export const isDevelopmentEnvironment = process.env.NODE_ENV === EnvironementType.DEV
export const isTestEnvironment = process.env.NODE_ENV === EnvironementType.TEST

const fileName = (() =>{
    if(isProductionEnvironment) return '.env.production'
    if(isDevelopmentEnvironment) return '.env.development'
    if(isTestEnvironment) return '.env.test'
    return '.env'
})()

const envPath = resolve(__dirname, '..', '..', fileName)

config({path: envPath})

export const {PORT = process.env.PORT ? process.env.PORT : '3001', NODE_ENV = EnvironementType.DEV} = process.env
import { 
  createEpicMiddleware, 
  combineEpics
} from 'redux-observable'
import { 
  authEpic,  
  createUpdateEpic,
  fetchEpic, 
  logOutEpic,
} from './api'

import storageMiddleware from './storage'
import '../config/rxjs'


export default [
  createEpicMiddleware(
    combineEpics(fetchEpic, logOutEpic, authEpic, createUpdateEpic)
  ),
  storageMiddleware
]
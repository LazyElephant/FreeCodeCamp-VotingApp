import { 
  createEpicMiddleware, 
  combineEpics
} from 'redux-observable'
import { 
  fetchEpic, 
  authEpic,  
  createUpdateEpic
} from './api'

import storageMiddleware from './storage'
import '../config/rxjs'


export default [
  createEpicMiddleware(
    combineEpics(fetchEpic, authEpic, createUpdateEpic)
  ),
  storageMiddleware
]
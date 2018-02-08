import { createEpicMiddleware, combineEpics } from 'redux-observable'
import { fetchEpic, authEpic } from './api'
import '../config/rxjs'


export default createEpicMiddleware(
  combineEpics(fetchEpic, authEpic)
)
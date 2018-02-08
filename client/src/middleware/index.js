import { createEpicMiddleware } from 'redux-observable'
import { fetchMiddleware } from './api'
import '../config/rxjs'

export default createEpicMiddleware(fetchMiddleware)
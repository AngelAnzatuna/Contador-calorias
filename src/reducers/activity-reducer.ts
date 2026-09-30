import type { Activity } from "../types"

// Discriminated Union
export type ActivityActions =
    // action type
    { type: 'save-activity', payload: { newActivity: Activity } } |
    { type: 'set-activeId', payload: { id: Activity['id'] } } |
    { type: 'delete-activity', payload: { id: Activity['id'] } } |
    { type: 'restart-app'}

// Type
export type ActivityState = {
    activities: Activity[],
    activeId: Activity['id']
}

const localStorageActivities = () : Activity[] => {
    const activities = localStorage.getItem('activities')
    return activities ? JSON.parse(activities) : []
}

// Initial State
export const initialState: ActivityState = {
    activities: localStorageActivities(),
    activeId: ''
}
// Reducer Funtion
export const activityReducer = (
    state: ActivityState = initialState,
    action: ActivityActions
) => {

    // if : Action Handler
    if(action.type === 'save-activity') {
        // Este código maneja la lógica para actualizar el state
        let updateActivities: Activity[] =[]
        if(state.activeId) { // acción de editar una actividad
            updateActivities = state.activities.map( activity => activity.id === state.activeId ? action.payload.newActivity : activity)
        } else { // acción de crear nuevo actividad
            updateActivities= [...state.activities, action.payload.newActivity]
        }
        
        return {
            ...state,
            activities: updateActivities,
            activeId: ''
        }
    }

    if(action.type === 'set-activeId') {
        return {
            ...state,
            activeId: action.payload.id
        }
    }

    if(action.type === 'delete-activity') {
        return {
            ...state,
            activities: state.activities.filter(activity => activity.id !== action.payload.id)
        }
    }

    if(action.type === 'restart-app') {
        return {
            activities: [],
            activeId: ''
        }
    }

    return state
}
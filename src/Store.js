export function createStore(rootReduser, initialState){
    let state = rootReduser(initialState, {type: "INIT"})
    const subscribers = []

    return {
        dispatch(action){
            state = rootReduser(state, action)
            subscribers.forEach(sub => sub())
        },
        subscribe(callback){
            subscribers.push(callback)
        },
        getState(){
            return state
        }
    }
}
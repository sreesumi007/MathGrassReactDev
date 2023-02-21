import { createStore } from "redux";
import {combineReducers} from 'redux';

const initialState ='';
const initialBtn:boolean =false;
type Action = {
    type:string
    payload: string
}

const reducer = (state:any = initialState,action:Action) =>{

    if(action.type === 'INPUT_NAME'){
        return state = action.payload;
    }
    return state;
}

const saveGraphBtn = (state:any = initialBtn,action:Action) =>{

    if(action.type === 'SAVEBTN_TOGGLE'){
        return state = action.payload;
    }
    return state;
}

const toggleDirectOrUndirect = (state:any = initialBtn,action:Action) =>{

    if(action.type === 'TOGGLE_DIRECTION'){
        return state = action.payload;
    }
    return state;
}

const saveQuestionModal = (state:any = initialBtn,action:Action) =>{

    if(action.type === 'SAVE_QUES_MODAL'){
        return state = action.payload;
    }
    return state;
}

const toggleAddQuestion = (state:any = initialBtn,action:Action) =>{

    if(action.type === 'TOGGLE_ADD_QUES'){
        return state = action.payload;
    }
    return state;
}

const toggleAddHints = (state:any = initialBtn,action:Action) =>{

    if(action.type === 'TOGGLE_ADD_HINTS'){
        return state = action.payload;
    }
    return state;
}

const reducers = combineReducers({
    name:reducer,
    saveBtn: saveGraphBtn,
    saveQuesModal:saveQuestionModal,
    toggleAddQues:toggleAddQuestion,
    toggleAddHints:toggleAddHints,
    toggleDirection:toggleDirectOrUndirect
    
});

const store = createStore(reducers);
export default store;

export type State = ReturnType<typeof reducers>

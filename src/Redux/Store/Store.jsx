import { configureStore } from '@reduxjs/toolkit';
import loginSlice from '../Slice/loginSlice';
import userTaskSlice from '../Slice/userTaskslice';
import createUserTaskSlice from '../Slice/userTaskslice';
import registerSlice from '../Slice/RegisterSlice';


const store = configureStore({
	reducer: {
		login : loginSlice.reducer,
		register : registerSlice.reducer,
        userTask : userTaskSlice.reducer,
		createTask : createUserTaskSlice.reducer,
	},
});

export default store;
// export type AppDispatch = typeof store.dispatch;

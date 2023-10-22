export const initialState = {
  _id: "",
  email: "",
  name: "",
  regNo: "",
  islogin: false,
  avatar:""
};
const storeReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        _id: action.payload._id,
        email: action.payload.email,
        name: action.payload.name,
        regNo: action.payload.regNo,
        islogin: true,
        avatar:action.payload.avatar
      };
    case "LOGOUT":
      return {
        ...initialState,
      };
    default:
      throw Error("cannot match case in Reducer");
  }
};

export default storeReducer;

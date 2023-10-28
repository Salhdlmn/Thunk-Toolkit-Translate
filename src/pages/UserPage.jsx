import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../redux/actions/userActions";

const UserPage = () => {
  const dispatch = useDispatch();
  const state = useSelector((store) => store);

  console.log(state);

  useEffect(() => {
    dispatch(getUsers());
  }, []);
  return (
    <div>
      {state.isLoading ? (
        <p>Yükleniyor...</p>
      ) : (
        !state.isError && <p>{state.users.map((user) => user.name)}</p>
      )}
    </div>
  );
};

export default UserPage;

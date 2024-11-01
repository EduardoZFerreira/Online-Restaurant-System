import { FormEvent, useEffect, useRef, useState } from "react";
import { useLoginMutation } from "../../api/apiAuthSlice";
import { useDispatch } from "react-redux";
import { setCredentials } from "../../features/authSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const [login] = useLoginMutation();
  const dispatch = useDispatch();

  const navigator = useNavigate();

  useEffect(() => {
    setErrorMsg("");
  }, [user, password]);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    try {
      const userData = await login({ username: user, password }).unwrap();
      dispatch(setCredentials({ ...userData, user }));
      setUser("");
      setPassword("");
      navigator("/");
    } catch (error) {
      setErrorMsg("Error");
    }
  };

  return (
    <>
      <div className="container mt-4">
        <div className="row justify-content-center">
          <div className="card shadow col-lg-8 col-md-10 col-11 border-secondary">
            <h4 className="card-header display-6">Entrar</h4>
            <form className="p-4" onSubmit={handleSubmit}>
              <div className="mb-3 form-floating">
                <input
                  type="text"
                  name="username"
                  className="form-control"
                  onChange={(e) => setUser(e.target.value)}
                  placeholder="E-mail..."
                  required
                />
                <label htmlFor="name">E-mail</label>
              </div>
              <div className="mb-3 form-floating">
                <input
                  type="password"
                  name="password"
                  className="form-control"
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Senha"
                  required
                />
                <label htmlFor="name">Senha</label>
              </div>
              <button className="btn btn-primary">Entrar</button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;

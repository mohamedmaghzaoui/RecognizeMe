

import "./login.css"
export const Login = () => {



  return (
    <div className="overlay">
      <div className="content col-6">
        <div className="row">
          <div className="col-6">
            <img
              className="img-fluid w-100 h-100"
              src="https://img.freepik.com/vecteurs-premium/illustration-vectorielle-personnage-debout-devant-interface-utilisateur-ecran-mobile-qui-affiche-page-connexion_1108340-493.jpg?w=740"
              alt=""
            />
          </div>
          <form className="col">
          <button className="btn btn-danger col-3  offset-9">Close</button>
            <div className="row">
           
              <h1 className="text-center text-primary my-3 col">Login</h1>
          
            </div>

            <div className="mb-3">
              <label htmlFor="exampleFormControlInput1" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="exampleFormControlInput1"
                placeholder="Email"
               
              />
            
            </div>
            <div className="mb-3">
              <label htmlFor="exampleFormControlInput2" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="exampleFormControlInput2"
                placeholder="Password"
               
              />
             
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};
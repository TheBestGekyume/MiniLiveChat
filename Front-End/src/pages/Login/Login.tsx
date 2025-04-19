import "./login.scss";

function Login() {
    return (
        <section id="login">
            <form action="">
                <h1>LOGIN</h1>

                <fieldset>
                    <label htmlFor="name">NOME DE USUARIO</label>
                    <input type="text" name="name" id="name" />
                </fieldset>
                <fieldset>
                    <label htmlFor="email">EMAIL</label>
                    <input type="email" name="email" id="email" />
                </fieldset>
                <fieldset>
                    <label htmlFor="password">SENHA</label>
                    <input type="password" name="password" id="password" />
                </fieldset>

                <button>Login</button>
            </form>
        </section>
    );
}

export default Login;

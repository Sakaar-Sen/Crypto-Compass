import styles from "../styles/login.module.css";

export default function Login() {
  return (
    <div className={styles.wrapper}>
      <form action="">
        <h1>Login</h1>
        <div className="input-box">
          <input type="text" placeholder="Username" required />
          <input type="password" placeholder="password" required />
        </div>
        <div className="remember-forgot">
          <label>
            <input type="checkbox" /> Remember Me ?
          </label>
          <a href="#">Forgot Password</a>
        </div>
        <button type="submit">Login</button>
        <div className="register-link">
          Don't have an account? <a href="#">Register</a>
        </div>
      </form>
    </div>
  );
}

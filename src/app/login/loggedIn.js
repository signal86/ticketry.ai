'use client';

import custom_styles from "../page.module.css";

export default function LoggedIn(props) {
  return (
    <div className={custom_styles["main-background"]} style={{ height: '100vh', margin: 0, padding: 0 }}>
      <div style={styles.container}>
      <div style={styles.form}>
        <h2 style={styles.title}>Welcome, {props.user}</h2>
        <p style={{ textAlign: 'center' }}>You're already logged in.</p>
      </div>
      </div>
    </div>
  );
}


const styles = {
  container: {
    display: 'flex',
    height: '100vh',
    justifyContent: 'center',
    alignItems: 'center'
  },
  form: {
    padding: '2rem',
    borderRadius: '8px',
    backgroundColor: '#c1c7d7',
    boxShadow: '0 16px 32px rgba(0,0,0,0.1)',
    zIndex: 1,
    borderColor: '#000000',
    borderStyle: 'solid',
    borderWidth: '3px',
    background: '#c1c7d7',
    display: 'flex',
    flexDirection: 'column',
    width: '300px',
  },
  title: {
    marginBottom: '1rem',
    textAlign: 'center',
  },
  input: {
    marginBottom: '1rem',
    padding: '0.75rem',
    fontSize: '1rem',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  button: {
    padding: '0.75rem',
    fontSize: '1rem',
    borderRadius: '4px',
    border: 'none',
    backgroundColor: '#1f8fff',
    color: '#fff',
    cursor: 'pointer',
  },
};

import Image from "next/image";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div style={{
      backgroundColor: '#1F8FFF',
      background: 'linear-gradient(135deg,rgba(31, 143, 255, 1) 0%, rgba(170, 201, 213, 1) 100%)',
      display: 'flex',
      height: '100vh',
      margin: 0,
      padding: 0,
    }}>
      <div className={styles["slide-in-left"]} style={{
        flex: 1,
        background: '#c1c7d7',
        boxShadow: '0 16px 32px rgba(0, 0, 0, 0.3)',
        zIndex: 1,
        backgroundColor: '#c1c7d7',
        display: 'flex',
        margin: 0,
        color: 'white',
        fontSize: '24px',
        flexDirection: "column",
        alignItems: "flex-start",
        justifyItems: "flex-start",
        borderColor: "#000000",
        borderWidth: "3px",
        borderStyle: "solid"
      }}>

        <div style={{
          margin: 0,
          height: '80px',
          width: '100%',
          borderColor: "#000000",
          borderWidth: "3px",
          borderStyle: "solid",
          borderLeft: '0px',
          borderRight: '0px',
          display: 'flex',
          flexDirection: "row"
        }}>
          <button style={{
            borderWidth: '1px',
            borderColor: '#000000',
            backgroundColor: '#208cf8',
            height: "60px",
            width: '100%',
            margin: '5px',
            textAlign: "center",
            borderRadius: '50px'
            }}>
            User
          </button>
        </div>
        

        <div style={{
          margin: 0,
          height: '80px',
          width: '100%',
          borderColor: "#000000",
          borderWidth: "3px",
          borderStyle: "solid",
          borderLeft: '0px',
          borderRight: '0px',
          display: 'flex',
          flexDirection: "row"
        }}>
          <button style={{
            height: '70px',
            width: '70px',
            fontSize: '100%',
            margin: '3px',
            borderRadius: '50px',
            borderColor: '#000000',
            borderStyle: 'solid'
          }}>
            +
          </button>
          <h2>
            Add Ticket
          </h2>
        </div>

        <div style={{
          margin: 0,
          height: '100%',
          width: '100%',
          borderColor: "#000000",
          borderWidth: "3px",
          borderStyle: "solid",
          borderLeft: '0px',
          borderRight: '0px',
        }}>
          <h1>
            Team Members
          </h1>
          <ul>
            <li>Member</li>
            <li>Member</li>
            <li>Member</li>
          </ul>

          <div style={{
            margin: 0,
            height: '80px',
            width: '100%',
            display: 'flex',
            flexDirection: "row"
          }}>
            <button style={{
              height: '70px',
              width: '70px',
              fontSize: '100%',
              margin: '3px'
            }}>
              +
            </button>
            <h2>
              Invite
            </h2>
          </div>

        </div>
        
      </div>
      <div style={{
        flex: 3,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontSize: '24px'
      }}>
        Div 2
      </div>

      <div style={{
        flex: 1,
        backgroundColor: '#000000',
        display: 'flex',
        margin: 0,
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontSize: '24px',  
        borderColor: "#000000",
        borderWidth: "3px",
        borderStyle: "solid"
      }}>
        Div 3
      </div>
    </div>
  );
}


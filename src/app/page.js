import Image from "next/image";
import styles from "./page.module.css";
import { auth0 } from "@/lib/auth0";
import { redirect } from 'next/navigation'

export default async function Home() {
  const session = await auth0.getSession();
  if (!session) {
    redirect("/login")
  }
  return (
    <div className={styles["main-background"]} style={{   
      display: 'flex',
      height: '100vh',
      margin: 0,
      padding: 0
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
            borderWidth: '3px',
            borderColor: '#000000',
            borderStyle: 'solid',
            background: '#208cf8',
            boxShadow: '0, 16px 32px rgba(0, 0, 0, 0.3)',
            zIndex: 1,
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
            fontSize: '200%',
            margin: '3px',
            borderRadius: '50px',
            borderColor: '#000000',
            borderStyle: 'solid',
            borderWidth: '5px'
          }}>
            +
          </button>
          <h2 style={{
            margin: '15px'
          }}>
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
          <h3>
            Team Members
          </h3>
          <ul>
            <li>Member</li>
            <li>Member</li>
            <li>Member</li>
          </ul>
          </div>

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
              fontSize: '200%',
              margin: '3px',
              borderRadius: '50px',
              borderColor: '#000000',
              borderStyle: 'solid',
              borderWidth: '5px'
            }}>
              +
            </button>
            <h2 style={{
              margin: '15px'
            }}>
              Invite
            </h2>

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
        
      </div>

      <div style={{
        flex: 1,
        // backgroundColor: '#000000',
        // display: 'flex',
        // margin: 0,
        // alignItems: 'center',
        // justifyContent: 'center',
        // color: 'white',
        // fontSize: '24px',  
        // borderColor: "#000000",
        // borderWidth: "3px",
        // borderStyle: "solid"
      }}>
        
      </div>
    </div>
  );
}

